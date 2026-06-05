import assert from "node:assert/strict";
import test from "node:test";
import { classifyScreenshotResult } from "../screenshot-utils.js";

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
