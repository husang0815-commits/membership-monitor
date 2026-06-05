import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { classifyScreenshotResult, scoreScreenshotCandidate } from "../screenshot-utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataArgIndex = process.argv.indexOf("--data");
const dataPath =
  dataArgIndex >= 0 && process.argv[dataArgIndex + 1]
    ? path.resolve(root, process.argv[dataArgIndex + 1])
    : path.join(root, "data", "live-data.json");

function isUsableUrl(url) {
  return typeof url === "string" && /^https?:\/\//.test(url);
}

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    throw new Error("Playwright is required to capture real screenshots. Install it with: npm install --no-save playwright");
  }
}

const data = JSON.parse(await fs.readFile(dataPath, "utf8"));
const updates = [...(data.updates ?? []), ...(data.reviewQueue ?? [])];
const targets = updates
  .map((update) => ({
    id: update.id,
    productName: update.productName,
    title: update.title,
    summary: update.summary,
    url: update.sources?.find((source) => isUsableUrl(source.url))?.url,
    imageUrl: update.imageUrl,
    screenshotHints: update.screenshotHints ?? []
  }))
  .filter((target) => isUsableUrl(target.url) && target.imageUrl);

if (targets.length === 0) {
  console.log("No screenshot targets found.");
  process.exit(0);
}

const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 1
});

const results = [];

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function preparePageForScreenshot(page) {
  await page.addStyleTag({
    content: `
      * { scroll-behavior: auto !important; }
      [class*="ad"], [id*="ad"], [class*="advert"], [id*="advert"],
      iframe, .fixed, .popup, .modal, .toolbar, .share, .right, .sidebar {
        visibility: hidden !important;
      }
    `
  }).catch(() => {});
  await page.evaluate(() => {
    document.documentElement.style.setProperty("background", "#fff", "important");
    document.body.style.setProperty("background", "#fff", "important");
    document.body.style.setProperty("padding-left", "40px", "important");
    document.body.style.setProperty("padding-right", "40px", "important");
    for (const element of document.querySelectorAll("*")) {
      const style = window.getComputedStyle(element);
      if (style.position === "fixed" || style.position === "sticky") {
        element.style.setProperty("visibility", "hidden", "important");
      }
    }
  }).catch(() => {});
}

async function captureRelevantScreenshot(page, target, outputPath) {
  const hints = [
    target.title,
    target.productName,
    target.summary,
    ...target.screenshotHints
  ]
    .filter(Boolean)
    .flatMap((hint) => String(hint).split(/[，。！!：:\s]/).filter((part) => part.length >= 3))
    .slice(0, 12);

  const candidates = await page.evaluate((selectorList) => {
    const nodes = [];
    for (const selector of selectorList) {
      document.querySelectorAll(selector).forEach((element) => nodes.push(element));
    }
    document.querySelectorAll("h1,h2,h3").forEach((heading) => {
      let current = heading;
      for (let i = 0; i < 4 && current; i += 1) {
        nodes.push(current);
        current = current.parentElement;
      }
    });
    nodes.push(document.body);

    return [...new Set(nodes)].map((element, index) => {
      const captureId = `capture-${index}`;
      element.setAttribute("data-screenshot-candidate", captureId);
      const rect = element.getBoundingClientRect();
      return {
        index,
        captureId,
        text: (element.innerText || element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 2400),
        width: rect.width,
        height: rect.height,
        top: rect.top + window.scrollY,
        selectorToken: element.tagName.toLowerCase()
      };
    }).filter((item) => item.width >= 280 && item.height >= 120);
  }, [
    "article",
    "main",
    "#content",
    "#article",
    "#artibody",
    ".article",
    ".article-content",
    ".article_content",
    ".articleBody",
    ".content",
    ".content-main",
    ".main-content",
    ".TRS_Editor",
    ".news-content",
    ".detail",
    ".text"
  ]);

  const best = candidates
    .map((candidate) => ({ ...candidate, score: scoreScreenshotCandidate(candidate, hints) }))
    .sort((a, b) => b.score - a.score)[0];

  if (best) {
    await page.evaluate((top) => window.scrollTo(0, Math.max(top - 80, 0)), best.top);
    await page.waitForTimeout(600);
    const targetElement = page.locator(`[data-screenshot-candidate="${best.captureId}"]`).first();
    const box = await targetElement.boundingBox();
    if (box && box.width >= 280 && box.height >= 120 && box.height <= 2200) {
      await targetElement.screenshot({ path: outputPath });
      return { strategy: "target-element", score: Math.round(best.score), hints };
    }
    const clip = {
      x: 0,
      y: Math.max((box?.y ?? best.top) - 24, 0),
      width: Math.min(Math.max((box?.width ?? 900) + 48, 760), 960),
      height: Math.min(Math.max((box?.height ?? best.height) + 48, 420), 1400)
    };
    await page.screenshot({ path: outputPath, clip });
    return { strategy: "relevant-region", score: Math.round(best.score), hints };
  }

  await page.screenshot({ path: outputPath, fullPage: false });
  return { strategy: "viewport-fallback", score: 0, hints };
}

for (const target of targets) {
  const outputPath = path.join(root, target.imageUrl);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  try {
    await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(1800);
    await preparePageForScreenshot(page);
    const capture = await captureRelevantScreenshot(page, target, outputPath);
    results.push({ id: target.id, ok: true, url: target.url, output: target.imageUrl, ...capture });
  } catch (error) {
    const failedResult = { id: target.id, ok: false, url: target.url, output: target.imageUrl, error: error.message };
    results.push(classifyScreenshotResult(failedResult, await fileExists(outputPath)));
  }
}

await browser.close();

console.log(JSON.stringify(results, null, 2));

const failed = results.filter((result) => !result.ok);
if (failed.length > 0) {
  console.error(`${failed.length} screenshot(s) failed.`);
  process.exit(1);
}
