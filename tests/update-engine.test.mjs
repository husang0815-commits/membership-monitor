import assert from "node:assert/strict";
import test from "node:test";
import {
  approveCandidate,
  buildCandidateFromSource,
  mergeCandidate,
  runSourceCheck
} from "../update-engine.js";

const baseData = {
  generatedAt: "2026-06-04",
  products: [{ id: "demo", name: "示例会员", industry: "测试", userScaleScore: 70 }],
  updates: [],
  reviewQueue: []
};

test("buildCandidateFromSource creates a review candidate from changed source content", () => {
  const candidate = buildCandidateFromSource({
    source: {
      id: "demo-source",
      productId: "demo",
      productName: "示例会员",
      industry: "测试",
      sourceType: "官网/活动页",
      url: "https://example.com/member",
      tags: ["权益包重组"],
      userScaleScore: 70
    },
    content: "会员权益新增生日礼和连续任务奖励",
    contentHash: "abc123",
    checkedAt: "2026-06-04T01:00:00.000Z"
  });

  assert.equal(candidate.status, "pending_review");
  assert.equal(candidate.productId, "demo");
  assert.equal(candidate.credibility, "medium");
  assert.equal(candidate.sources[0].url, "https://example.com/member");
  assert.ok(candidate.summary.includes("会员权益新增生日礼"));
});

test("mergeCandidate adds new review candidates without duplicating same source hash", () => {
  const candidate = buildCandidateFromSource({
    source: {
      id: "demo-source",
      productId: "demo",
      productName: "示例会员",
      industry: "测试",
      sourceType: "官网/活动页",
      url: "https://example.com/member",
      tags: ["权益包重组"],
      userScaleScore: 70
    },
    content: "会员权益新增生日礼",
    contentHash: "same-hash",
    checkedAt: "2026-06-04T01:00:00.000Z"
  });

  const first = mergeCandidate(baseData, candidate);
  const second = mergeCandidate(first, candidate);

  assert.equal(first.reviewQueue.length, 1);
  assert.equal(second.reviewQueue.length, 1);
});

test("approveCandidate moves a pending candidate into official updates", () => {
  const candidate = buildCandidateFromSource({
    source: {
      id: "demo-source",
      productId: "demo",
      productName: "示例会员",
      industry: "测试",
      sourceType: "官网/活动页",
      url: "https://example.com/member",
      tags: ["权益包重组"],
      userScaleScore: 70
    },
    content: "会员权益新增生日礼",
    contentHash: "approve-hash",
    checkedAt: "2026-06-04T01:00:00.000Z"
  });
  const withCandidate = mergeCandidate(baseData, candidate);

  const approved = approveCandidate(withCandidate, candidate.id);

  assert.equal(approved.reviewQueue.length, 0);
  assert.equal(approved.updates.length, 1);
  assert.equal(approved.updates[0].id, candidate.id);
  assert.equal(approved.updates[0].status, "approved");
});

test("runSourceCheck ignores unchanged content hashes", async () => {
  const source = {
    id: "demo-source",
    productId: "demo",
    productName: "示例会员",
    industry: "测试",
    sourceType: "官网/活动页",
    url: "https://example.com/member",
    tags: ["权益包重组"],
    userScaleScore: 70,
    lastHash: "known-hash"
  };

  const result = await runSourceCheck(source, async () => "known content", () => "known-hash");

  assert.equal(result.changed, false);
  assert.equal(result.candidate, null);
});
