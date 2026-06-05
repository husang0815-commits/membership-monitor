import crypto from "node:crypto";

const credibilityBySource = {
  "官网/活动页": "medium",
  "官方说明": "high",
  "新闻": "medium",
  "社媒热度": "pending"
};

export function hashContent(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

export function normalizeContent(content) {
  return String(content)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1200);
}

export function buildCandidateFromSource({ source, content, contentHash, checkedAt }) {
  const normalized = normalizeContent(content);
  const shortText = normalized.slice(0, 86) || "监控源内容发生变化，需人工核验后入库。";
  const credibility =
    Object.entries(credibilityBySource).find(([key]) => source.sourceType.includes(key))?.[1] ?? "medium";

  return {
    id: `${source.id}-${contentHash.slice(0, 10)}`,
    status: "pending_review",
    productId: source.productId,
    productName: source.productName,
    industry: source.industry,
    title: `${source.productName} 监控源出现新变化`,
    summary: shortText,
    detail: `系统在 ${source.sourceType} 监控源检测到内容变化：${shortText}`,
    takeaway: "该动态需要人工确认变化性质，再决定是否作为正式重点动态发布。",
    heatScore: source.defaultHeatScore ?? 72,
    userScaleScore: source.userScaleScore ?? 70,
    credibility,
    sourceType: source.sourceType,
    sourceStatus: credibility === "pending" ? "待核验" : "待审核",
    evidenceLabel: source.evidenceLabel ?? "来源页面截图/摘要",
    visualTone: source.visualTone ?? "blue",
    tags: source.tags ?? ["待审核"],
    sources: [{ name: source.name ?? source.productName, url: source.url }],
    watchPoints: ["确认是否为会员规则、权益、价格或活动变化", "补充截图证据和可借鉴点"],
    sourceId: source.id,
    contentHash,
    checkedAt
  };
}

export function mergeCandidate(data, candidate) {
  const reviewQueue = data.reviewQueue ?? [];
  const exists =
    reviewQueue.some((item) => item.id === candidate.id || item.contentHash === candidate.contentHash) ||
    data.updates.some((item) => item.id === candidate.id || item.contentHash === candidate.contentHash);

  if (exists) return { ...data, reviewQueue };
  return {
    ...data,
    generatedAt: candidate.checkedAt.slice(0, 10),
    reviewQueue: [candidate, ...reviewQueue]
  };
}

export function approveCandidate(data, candidateId) {
  const reviewQueue = data.reviewQueue ?? [];
  const candidate = reviewQueue.find((item) => item.id === candidateId);
  if (!candidate) return data;

  const approved = {
    ...candidate,
    status: "approved",
    sourceStatus: candidate.credibility === "pending" ? "人工核验后发布" : "已核验"
  };

  return {
    ...data,
    updates: [approved, ...data.updates],
    reviewQueue: reviewQueue.filter((item) => item.id !== candidateId)
  };
}

export async function fetchSourceContent(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "membership-monitor/1.0"
    }
  });
  if (!response.ok) {
    throw new Error(`Fetch failed ${response.status} for ${url}`);
  }
  return response.text();
}

export async function runSourceCheck(source, fetcher = fetchSourceContent, hasher = hashContent) {
  const rawContent = await fetcher(source.url);
  const normalized = normalizeContent(rawContent);
  const contentHash = hasher(normalized);
  if (contentHash === source.lastHash) {
    return { changed: false, source: { ...source }, candidate: null };
  }

  const checkedAt = new Date().toISOString();
  const candidate = buildCandidateFromSource({ source, content: normalized, contentHash, checkedAt });
  return {
    changed: true,
    source: { ...source, lastHash: contentHash, lastCheckedAt: checkedAt },
    candidate
  };
}

export async function runDailyUpdate(data, sources, fetcher = fetchSourceContent) {
  let nextData = { ...data, reviewQueue: data.reviewQueue ?? [] };
  const nextSources = [];
  const errors = [];

  for (const source of sources) {
    try {
      const result = await runSourceCheck(source, fetcher);
      nextSources.push(result.source);
      if (result.candidate) nextData = mergeCandidate(nextData, result.candidate);
    } catch (error) {
      nextSources.push(source);
      errors.push({ sourceId: source.id, message: error.message });
    }
  }

  return {
    data: nextData,
    sources: nextSources,
    errors,
    checkedAt: new Date().toISOString()
  };
}
