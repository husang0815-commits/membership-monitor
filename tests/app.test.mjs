import assert from "node:assert/strict";
import test from "node:test";
import {
  credibilityWeight,
  filterByProduct,
  filterByTag,
  getSortedUpdates,
  renderEvidence,
  selectUpdateById
} from "../app.js";

const sampleUpdates = [
  {
    id: "large-warm",
    productId: "large",
    userScaleScore: 98,
    heatScore: 70,
    credibility: "high",
    tags: ["权益包重组"]
  },
  {
    id: "hot-small",
    productId: "small",
    userScaleScore: 65,
    heatScore: 95,
    credibility: "medium",
    tags: ["连续任务"]
  },
  {
    id: "medium-social",
    productId: "medium",
    userScaleScore: 82,
    heatScore: 88,
    credibility: "pending",
    tags: ["社媒争议", "连续任务"]
  }
];

test("comprehensive sort prioritizes recent heat, then scale, then credibility", () => {
  const sorted = getSortedUpdates(sampleUpdates, "recommended").map((item) => item.id);

  assert.deepEqual(sorted, ["hot-small", "medium-social", "large-warm"]);
});

test("heat sort orders by recent heat score", () => {
  const sorted = getSortedUpdates(sampleUpdates, "heat").map((item) => item.id);

  assert.deepEqual(sorted, ["hot-small", "medium-social", "large-warm"]);
});

test("scale sort orders by product user scale score", () => {
  const sorted = getSortedUpdates(sampleUpdates, "scale").map((item) => item.id);

  assert.deepEqual(sorted, ["large-warm", "medium-social", "hot-small"]);
});

test("product filter returns only matching product updates", () => {
  const filtered = filterByProduct(sampleUpdates, "medium").map((item) => item.id);

  assert.deepEqual(filtered, ["medium-social"]);
});

test("tag filter returns updates containing the selected growth tag", () => {
  const filtered = filterByTag(sampleUpdates, "连续任务").map((item) => item.id);

  assert.deepEqual(filtered, ["hot-small", "medium-social"]);
});

test("selectUpdateById returns the requested detail item", () => {
  const selected = selectUpdateById(sampleUpdates, "large-warm");

  assert.equal(selected.productId, "large");
});

test("credibility weights are stable for all credibility states", () => {
  assert.equal(credibilityWeight("high"), 3);
  assert.equal(credibilityWeight("medium"), 2);
  assert.equal(credibilityWeight("pending"), 1);
  assert.equal(credibilityWeight("unknown"), 0);
});

test("renderEvidence renders an image when an update has imageUrl", () => {
  const html = renderEvidence({
    productName: "示例会员",
    evidenceLabel: "会员页截图",
    visualTone: "blue",
    imageUrl: "assets/screenshots/demo.png"
  });

  assert.match(html, /<img/);
  assert.match(html, /src="assets\/screenshots\/demo\.png"/);
  assert.match(html, /alt="会员页截图"/);
});
