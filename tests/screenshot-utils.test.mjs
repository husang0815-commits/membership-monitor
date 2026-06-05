import assert from "node:assert/strict";
import test from "node:test";
import { classifyScreenshotResult, scoreScreenshotCandidate } from "../screenshot-utils.js";

test("classifyScreenshotResult keeps deployment successful when an existing real screenshot can be reused", () => {
  const result = classifyScreenshotResult({ ok: false, error: "timeout" }, true);

  assert.equal(result.ok, true);
  assert.equal(result.reusedExisting, true);
});

test("classifyScreenshotResult keeps a failed result failed when no screenshot exists", () => {
  const result = classifyScreenshotResult({ ok: false, error: "timeout" }, false);

  assert.equal(result.ok, false);
  assert.equal(result.reusedExisting, false);
});

test("scoreScreenshotCandidate prefers large content areas containing target hints", () => {
  const weak = scoreScreenshotCandidate({
    text: "网站导航 首页 客户端",
    width: 1200,
    height: 80,
    top: 0
  }, ["滴滴会员"]);
  const strong = scoreScreenshotCandidate({
    text: "滴滴会员新升级 等级更稳 场景更全 权益更多 正文内容",
    width: 980,
    height: 620,
    top: 180
  }, ["滴滴会员"]);

  assert.ok(strong > weak);
});
