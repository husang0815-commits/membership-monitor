export const initialData = {
  generatedAt: "2026-06-04",
  products: [
    { id: "didi", name: "滴滴会员", industry: "出行", userScaleScore: 92 },
    { id: "88vip", name: "淘宝 88VIP", industry: "电商/本地生活", userScaleScore: 99 },
    { id: "jd-plus", name: "京东 PLUS", industry: "电商", userScaleScore: 96 },
    { id: "starbucks", name: "星巴克星享俱乐部", industry: "咖啡/餐饮", userScaleScore: 94 },
    { id: "costco", name: "Costco 开市客", industry: "仓储零售", userScaleScore: 78 },
    { id: "hema", name: "盒马 X 会员", industry: "新零售", userScaleScore: 86 },
    { id: "tencent-video", name: "腾讯视频 VIP", industry: "内容娱乐", userScaleScore: 97 },
    { id: "mcdonalds", name: "麦当劳会员", industry: "餐饮", userScaleScore: 93 }
  ],
  updates: [
    {
      id: "didi-member-upgrade",
      productId: "didi",
      productName: "滴滴会员",
      industry: "出行",
      title: "滴滴会员体系升级：成长值替代里程值，定级周期延长到 12 个月",
      summary: "从单一里程扩展到结构化成长值，权益覆盖网约车、代驾、顺风车、海外出行，并加入生日礼与联名权益。",
      detail: "滴滴把会员成长从里程值调整为成长值，并把定级周期从 3 个月延长到 12 个月。权益覆盖网约车、代驾、顺风车和海外出行等场景，还加入生日礼、代驾权益和海底捞联名权益。这是从高频使用奖励转向综合贡献经营的会员升级。",
      takeaway: "用更长成长周期降低等级焦虑，用跨场景权益提升会员身份感和续留。",
      heatScore: 96,
      userScaleScore: 92,
      credibility: "high",
      sourceType: "官网/活动页 + 新闻",
      sourceStatus: "已核验",
      evidenceLabel: "会员中心/升级说明截图",
      imageUrl: "assets/screenshots/didi-member-upgrade.png",
      screenshotHints: ["滴滴会员新升级", "等级更稳", "权益更多"],
      visualTone: "blue",
      tags: ["增长留存", "等级成长", "跨场景权益"],
      sources: [{ name: "新华网", url: "https://www.news.cn/tech/20260602/d55a406eb6014ebba02fb48315f6c95c/c.html" }],
      watchPoints: ["成长值规则是否足够透明", "低频用户是否会感到门槛变高"]
    },
    {
      id: "88vip-life-benefits",
      productId: "88vip",
      productName: "淘宝 88VIP",
      industry: "电商/本地生活",
      title: "88VIP 扩展生活权益，购物会员转向生活方式会员",
      summary: "盒马、饿了么/闪购、飞猪、高德、观影等权益被纳入平台型会员包。",
      detail: "88VIP 权益从购物场景继续扩展到盒马、饿了么/闪购、飞猪、高德、观影等更广义生活消费场景。平台型会员不再只证明买东西划算，而是在构建覆盖吃、逛、行、玩的生活方式权益包。",
      takeaway: "跨场景权益能提升会员打开频次，并把会员变成生态内消费入口。",
      heatScore: 94,
      userScaleScore: 99,
      credibility: "high",
      sourceType: "会员页 + 新闻",
      sourceStatus: "已核验",
      evidenceLabel: "88VIP 权益图/生活服务入口",
      imageUrl: "assets/screenshots/88vip-life-benefits.png",
      screenshotHints: ["88VIP", "盒马", "饿了么", "飞猪", "高德"],
      visualTone: "amber",
      tags: ["权益包重组", "联合会员", "生活方式会员"],
      sources: [
        { name: "新浪财经", url: "https://finance.sina.com.cn/roll/2025-08-06/doc-infiztfs8333715.shtml" },
        { name: "IT之家", url: "https://m.ithome.com/html/910047.htm" }
      ],
      watchPoints: ["权益太多时用户理解成本是否变高", "不同业务权益是否有清晰主次"]
    },
    {
      id: "jd-plus-service-benefits",
      productId: "jd-plus",
      productName: "京东 PLUS",
      industry: "电商",
      title: "京东 PLUS 强化服务型权益，续费理由从省钱转向省心",
      summary: "免邮、售后、家政洗车等生活服务强化会员的确定性价值。",
      detail: "京东 PLUS 持续强化免邮、售后、家政、洗车、寄快递等服务型权益，让会员价值从折扣延展到确定性服务。服务权益比单纯价格优惠更容易形成续费理由，尤其适合重履约、重售后的平台。",
      takeaway: "把省钱升级成省心，将售后确定性包装为高价值权益。",
      heatScore: 89,
      userScaleScore: 96,
      credibility: "high",
      sourceType: "官方说明 + 新闻",
      sourceStatus: "已核验",
      evidenceLabel: "PLUS 权益页/售后服务入口",
      imageUrl: "assets/screenshots/jd-plus-service-benefits.png",
      screenshotHints: ["PLUS会员", "京东PLUS", "会员权益"],
      visualTone: "rose",
      tags: ["服务权益", "续费价值", "权益包重组"],
      sources: [
        { name: "京东官方说明", url: "https://wqs.jd.com/my/vipplus_introduce.shtml" },
        { name: "新浪科技", url: "https://finance.sina.com.cn/tech/roll/2025-01-08/doc-ineefzct1062671.shtml" }
      ],
      watchPoints: ["服务权益的实际履约质量", "用户是否能记住和使用复杂权益"]
    },
    {
      id: "starbucks-travel-membership",
      productId: "starbucks",
      productName: "星巴克星享俱乐部",
      industry: "咖啡/餐饮",
      title: "星巴克联合会员加速，咖啡会员延展到酒旅场景",
      summary: "星享俱乐部与亚朵、飞猪等合作，把咖啡会员身份映射到住宿和出行权益。",
      detail: "星巴克中国持续与酒旅平台做联合会员，星享会员身份可以映射到亚朵、飞猪等场景。咖啡会员正在从交易激励走向生活方式身份，让高频消费品牌获得更强的场景外延。",
      takeaway: "用品牌调性匹配联名伙伴，把等级身份变成跨品牌待遇。",
      heatScore: 87,
      userScaleScore: 94,
      credibility: "high",
      sourceType: "官方新闻 + 媒体",
      sourceStatus: "已核验",
      evidenceLabel: "星享/亚朵/飞猪联名权益图",
      imageUrl: "assets/screenshots/starbucks-travel-membership.png",
      screenshotHints: ["星享俱乐部", "亚朵", "联合会员"],
      visualTone: "green",
      tags: ["联合会员", "跨场景权益", "身份认同"],
      sources: [
        { name: "星巴克中国", url: "https://www.starbucks.com.cn/about/news/starbucks-yaduo-united-member/" },
        { name: "新浪财经", url: "https://finance.sina.com.cn/roll/2026-04-14/doc-inhunttt8894784.shtml" }
      ],
      watchPoints: ["联名权益是否带来真实复购", "权益兑换链路是否顺畅"]
    },
    {
      id: "costco-black-diamond",
      productId: "costco",
      productName: "Costco 开市客",
      industry: "仓储零售",
      title: "Costco 中国推出黑钻会籍，用返利绑定高价值家庭消费用户",
      summary: "年费 688 元，核心权益是 3% 消费返利，年度返利上限最高 7200 元。",
      detail: "Costco 中国推出更高年费的黑钻会籍，以 3% 消费返利作为核心权益，面向高频高客单家庭消费用户。这是仓储会员制的高价值用户分层样本，用清晰返利机制提高高消费用户的绑定程度。",
      takeaway: "用可计算返利提升高价会员说服力，把高消费用户从普通会员中分层经营。",
      heatScore: 86,
      userScaleScore: 78,
      credibility: "high",
      sourceType: "新闻",
      sourceStatus: "已核验",
      evidenceLabel: "黑钻会籍卡面/返利规则",
      imageUrl: "assets/screenshots/costco-black-diamond.png",
      screenshotHints: ["黑钻会籍", "3%消费返利", "开市客"],
      visualTone: "violet",
      tags: ["高价值分层", "返利机制", "续费价值"],
      sources: [{ name: "宝安湾", url: "https://www.baoanone.com/content216522.html" }],
      watchPoints: ["返利上限和门槛是否影响感知", "普通会员是否会产生权益落差"]
    },
    {
      id: "hema-member-day-social",
      productId: "hema",
      productName: "盒马 X 会员",
      industry: "新零售",
      title: "盒马会员日社媒讨论升温，到店活动成为复购理由",
      summary: "公众号和小红书出现会员日、门店活动讨论，需要用官网或门店材料继续核验。",
      detail: "盒马会员日相关内容在社媒上出现讨论，信号指向线下到店活动、会员专享优惠和门店传播素材。由于当前主要来自社媒，需要作为热度和口碑信号进入待审核队列。",
      takeaway: "线下会员日可以把权益变成固定到店理由，并形成社交传播素材。",
      heatScore: 84,
      userScaleScore: 86,
      credibility: "pending",
      sourceType: "社媒热度",
      sourceStatus: "待核验",
      evidenceLabel: "社媒截图/门店活动图",
      imageUrl: "assets/screenshots/hema-member-day-social.png",
      screenshotHints: ["盒马X会员", "会员权益", "X会员"],
      visualTone: "mint",
      tags: ["社媒信号", "会员日", "到店复购"],
      sources: [{ name: "盒马X会员权益细则", url: "https://terms.alicdn.com/legal-agreement/terms/suit_bu1_alibaba_hema/suit_bu1_alibaba_hema202101301335_95554.html" }],
      watchPoints: ["需要官网或门店物料核验", "社媒讨论是否代表真实活动规模"]
    },
    {
      id: "tencent-video-device-controversy",
      productId: "tencent-video",
      productName: "腾讯视频 VIP",
      industry: "内容娱乐",
      title: "腾讯视频设备权益争议，会员分层升级需警惕负反馈",
      summary: "多端限制和升级引导引发投诉，是权益限制和分层付费的反面样本。",
      detail: "用户投诉 VIP 账号设备和播放限制，恢复路径中出现升级 SVIP 或家庭卡等引导。该动态说明内容平台在家庭、多端、分层付费上继续探索，但权益限制如果处理不当会伤害用户信任。",
      takeaway: "会员升级不能只靠限制原有权益，分层规则需要清晰透明。",
      heatScore: 91,
      userScaleScore: 97,
      credibility: "medium",
      sourceType: "新闻 + 社媒争议",
      sourceStatus: "需持续观察",
      evidenceLabel: "投诉页面/权益限制说明",
      imageUrl: "assets/screenshots/tencent-video-device-controversy.png",
      screenshotHints: ["腾讯视频", "VIP", "设备"],
      visualTone: "red",
      tags: ["社媒争议", "权益限制", "分层付费"],
      sources: [{ name: "新浪财经", url: "https://finance.sina.com.cn/stock/relnews/hk/2026-05-20/doc-inhypaet6972438.shtml" }],
      watchPoints: ["负反馈是否持续扩大", "平台是否调整设备权益说明"]
    },
    {
      id: "mcdonalds-seasonal-membership",
      productId: "mcdonalds",
      productName: "麦当劳会员",
      industry: "餐饮",
      title: "麦当劳用全年节奏做会员活动，节气玩法强化高频复购",
      summary: "麦麦会员活动形成固定节奏，适合观察低客单、高频餐饮如何制造复购理由。",
      detail: "麦当劳中国持续用麦麦会员和节气活动维持全年运营节奏。对于高频餐饮，会员体系不只提供优惠，还承担固定触达、活动提醒和复购节奏管理的角色。",
      takeaway: "低客单高频品类适合用固定节奏活动，让会员产生周期性回访。",
      heatScore: 80,
      userScaleScore: 93,
      credibility: "medium",
      sourceType: "官网 + 新闻",
      sourceStatus: "已核验",
      evidenceLabel: "麦麦会员权益/节气活动图",
      imageUrl: "assets/screenshots/mcdonalds-seasonal-membership.png",
      screenshotHints: ["麦麦会员", "会员权益", "麦当劳"],
      visualTone: "yellow",
      tags: ["连续任务", "活动节奏", "高频复购"],
      sources: [
        { name: "麦当劳官网", url: "https://www.mcdonalds.com.cn/index/Services/membership-28/member-benefit" },
        { name: "深圳新闻网", url: "https://www.sznews.com/news/content/2025-12/29/content_31879899.htm" }
      ],
      watchPoints: ["活动频率是否导致用户疲劳", "节气玩法是否能稳定带来复购"]
    }
  ]
};

const credibilityScores = {
  high: 3,
  medium: 2,
  pending: 1
};

const state = {
  sortMode: "recommended",
  productFilter: "all",
  tagFilter: "all",
  selectedId: initialData.updates[0].id
};

let activeData = initialData;

export function credibilityWeight(credibility) {
  return credibilityScores[credibility] ?? 0;
}

export function recommendedScore(update) {
  return update.heatScore * 0.72 + update.userScaleScore * 0.2 + credibilityWeight(update.credibility) * 3;
}

export function getSortedUpdates(updates, mode = "recommended") {
  const sorted = [...updates];
  const getters = {
    recommended: recommendedScore,
    heat: (update) => update.heatScore,
    scale: (update) => update.userScaleScore
  };
  const getScore = getters[mode] ?? getters.recommended;

  return sorted.sort((a, b) => {
    const scoreDelta = getScore(b) - getScore(a);
    if (scoreDelta !== 0) return scoreDelta;
    const heatDelta = b.heatScore - a.heatScore;
    if (heatDelta !== 0) return heatDelta;
    return b.userScaleScore - a.userScaleScore;
  });
}

export function filterByProduct(updates, productId) {
  if (!productId || productId === "all") return updates;
  return updates.filter((update) => update.productId === productId);
}

export function filterByTag(updates, tag) {
  if (!tag || tag === "all") return updates;
  return updates.filter((update) => update.tags.includes(tag));
}

export function selectUpdateById(updates, id) {
  return updates.find((update) => update.id === id) ?? updates[0];
}

function getVisibleUpdates() {
  const byProduct = filterByProduct(activeData.updates, state.productFilter);
  const byTag = filterByTag(byProduct, state.tagFilter);
  return getSortedUpdates(byTag, state.sortMode);
}

function allTags() {
  return [...new Set(activeData.updates.flatMap((update) => update.tags))];
}

function sourceSummary() {
  return activeData.updates.reduce(
    (summary, update) => {
      if (update.sourceType.includes("社媒")) summary.social += 1;
      else if (update.sourceType.includes("新闻")) summary.news += 1;
      else summary.official += 1;
      if (update.credibility === "pending") summary.pending += 1;
      return summary;
    },
    { official: 0, news: 0, social: 0, pending: 0 }
  );
}

export function renderEvidence(update, size = "large") {
  if (update.imageUrl) {
    return `
      <figure class="evidence evidence-image evidence-${size}">
        <img src="${update.imageUrl}" alt="${update.evidenceLabel}" loading="lazy">
        <figcaption>${update.evidenceLabel}</figcaption>
      </figure>
    `;
  }

  return `
    <div class="evidence evidence-${update.visualTone} evidence-${size}" aria-label="${update.evidenceLabel}">
      <span>${update.evidenceLabel}</span>
      <strong>${update.productName}</strong>
    </div>
  `;
}

function renderTags(tags, isInteractive = false) {
  return tags
    .map((tag) => {
      const attrs = isInteractive ? `button type="button" data-tag="${tag}"` : "span";
      const close = isInteractive ? "button" : "span";
      return `<${attrs} class="chip">${tag}</${close}>`;
    })
    .join("");
}

function renderUpdateCard(update, variant = "compact") {
  const isHero = variant === "hero";
  return `
    <article class="update-card ${isHero ? "update-card-hero" : ""}" data-update-id="${update.id}" tabindex="0">
      ${renderEvidence(update, isHero ? "large" : "small")}
      <div class="card-content">
        <div class="card-kicker">${update.industry} · ${update.sourceStatus}</div>
        <h3>${update.title}</h3>
        <p>${update.summary}</p>
        <div class="card-takeaway"><strong>可借鉴：</strong>${update.takeaway}</div>
        <div class="chip-row">${renderTags(update.tags.slice(0, 3))}</div>
      </div>
    </article>
  `;
}

function renderControls() {
  const sortLabels = {
    recommended: "综合推荐",
    heat: "近期热度",
    scale: "用户规模"
  };
  document.querySelector("#sort-controls").innerHTML = Object.entries(sortLabels)
    .map(
      ([mode, label]) => `
        <button type="button" class="segmented-button ${state.sortMode === mode ? "active" : ""}" data-sort="${mode}">
          ${label}
        </button>
      `
    )
    .join("");

  document.querySelector("#product-filters").innerHTML = [
    `<button type="button" class="chip ${state.productFilter === "all" ? "active" : ""}" data-product="all">全部产品</button>`,
    ...activeData.products.map(
      (product) => `
        <button type="button" class="chip ${state.productFilter === product.id ? "active" : ""}" data-product="${product.id}">
          ${product.name}
        </button>
      `
    )
  ].join("");

  document.querySelector("#tag-filters").innerHTML = [
    `<button type="button" class="chip ${state.tagFilter === "all" ? "active" : ""}" data-tag-filter="all">全部打法</button>`,
    ...allTags().map(
      (tag) => `
        <button type="button" class="chip ${state.tagFilter === tag ? "active" : ""}" data-tag-filter="${tag}">
          ${tag}
        </button>
      `
    )
  ].join("");
}

function renderDashboard() {
  const visibleUpdates = getVisibleUpdates();
  const main = visibleUpdates[0] ?? activeData.updates[0];
  const secondary = visibleUpdates.slice(1, 5);
  state.selectedId = visibleUpdates.some((update) => update.id === state.selectedId) ? state.selectedId : main.id;

  document.querySelector("#main-update").innerHTML = renderUpdateCard(main, "hero");
  document.querySelector("#secondary-updates").innerHTML = secondary.map((update) => renderUpdateCard(update)).join("");
  renderDetail();
  renderSummary();
}

function renderDetail() {
  const update = selectUpdateById([...activeData.updates, ...(activeData.reviewQueue ?? [])], state.selectedId);
  document.querySelector("#detail-panel").innerHTML = `
    <div class="detail-grid">
      ${renderEvidence(update, "detail")}
      <div class="detail-copy">
        <div class="section-kicker">${update.productName} · ${update.industry}</div>
        <h2>${update.title}</h2>
        <p>${update.detail}</p>
        <div class="insight-box"><strong>核心借鉴：</strong>${update.takeaway}</div>
        <div class="chip-row">${renderTags(update.tags, true)}</div>
      </div>
    </div>
    <div class="detail-meta">
      <section>
        <h3>来源证据</h3>
        <p>${update.sourceType} · ${update.sourceStatus} · 可信度 ${credibilityWeight(update.credibility)}/3</p>
        <div class="source-list">
          ${update.sources
            .map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.name}</a>`)
            .join("")}
        </div>
      </section>
      <section>
        <h3>需持续观察</h3>
        <ul>${update.watchPoints.map((point) => `<li>${point}</li>`).join("")}</ul>
      </section>
    </div>
  `;
}

function renderSummary() {
  const visibleUpdates = getVisibleUpdates();
  const summary = sourceSummary();
  document.querySelector("#below-fold").innerHTML = `
    <section class="panel">
      <div class="panel-heading">
        <div>
          <span class="section-kicker">辅助信息</span>
          <h2>今日摘要</h2>
        </div>
      </div>
      <div class="metric-grid">
        <div><strong>${activeData.updates.length}</strong><span>正式动态</span></div>
        <div><strong>${visibleUpdates.length}</strong><span>当前筛选</span></div>
        <div><strong>${(activeData.reviewQueue ?? []).length}</strong><span>待审核</span></div>
      </div>
    </section>
    <section class="panel">
      <div class="panel-heading">
        <div>
          <span class="section-kicker">待审核</span>
          <h2>今日处理建议</h2>
        </div>
      </div>
      <p>优先审核盒马会员日、腾讯视频权益争议、麦当劳节气活动传播等社媒或半核验信号。</p>
    </section>
    <section class="panel panel-wide">
      <div class="panel-heading">
        <div>
          <span class="section-kicker">可信度</span>
          <h2>来源分布</h2>
        </div>
      </div>
      <div class="source-grid">
        <div><strong>官网/活动页</strong><span>${summary.official} 条，用于确认规则、权益、价格变化。</span></div>
        <div><strong>新闻媒体</strong><span>${summary.news} 条，用于补充发布背景和业务合作。</span></div>
        <div><strong>社媒热度</strong><span>${summary.social} 条，其中 ${summary.pending} 条待核验。</span></div>
      </div>
    </section>
  `;
}

function setSelectedUpdate(id, shouldScroll = true) {
  state.selectedId = id;
  renderDetail();
  document.querySelectorAll(".update-card").forEach((card) => {
    card.classList.toggle("selected", card.dataset.updateId === id);
  });
  if (shouldScroll) {
    document.querySelector("#detail").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const sortButton = event.target.closest("[data-sort]");
    if (sortButton) {
      state.sortMode = sortButton.dataset.sort;
      render();
      return;
    }

    const productButton = event.target.closest("[data-product]");
    if (productButton) {
      state.productFilter = productButton.dataset.product;
      render();
      return;
    }

    const tagFilter = event.target.closest("[data-tag-filter]");
    if (tagFilter) {
      state.tagFilter = tagFilter.dataset.tagFilter;
      render();
      return;
    }

    const detailTag = event.target.closest("[data-tag]");
    if (detailTag) {
      state.tagFilter = detailTag.dataset.tag;
      render();
      return;
    }

    const updateCard = event.target.closest("[data-update-id]");
    if (updateCard) {
      setSelectedUpdate(updateCard.dataset.updateId);
    }
  });

  document.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-update-id]")) {
      event.preventDefault();
      setSelectedUpdate(event.target.dataset.updateId);
    }
  });
}

function render() {
  renderControls();
  renderDashboard();
  setSelectedUpdate(state.selectedId, false);
}

async function loadServerData() {
  if (window.location.protocol === "file:") return initialData;
  try {
    const response = await fetch("/api/data", { cache: "no-store" });
    if (response.ok) return response.json();
  } catch {}

  const staticResponse = await fetch("data/live-data.json", { cache: "no-store" });
  if (!staticResponse.ok) throw new Error(`Load data failed: ${staticResponse.status}`);
  return staticResponse.json();
}

if (typeof document !== "undefined") {
  bindEvents();
  loadServerData()
    .then((serverData) => {
      activeData = serverData;
      state.selectedId = activeData.updates[0]?.id ?? initialData.updates[0].id;
      render();
    })
    .catch((error) => {
      console.warn(error);
      render();
    });
}
