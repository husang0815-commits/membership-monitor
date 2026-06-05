import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
    url: update.sources?.find((source) => isUsableUrl(source.url))?.url,
    imageUrl: update.imageUrl
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

for (const target of targets) {
  const outputPath = path.join(root, target.imageUrl);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  try {
    await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(1800);
    await page.screenshot({ path: outputPath, fullPage: false });
    results.push({ id: target.id, ok: true, url: target.url, output: target.imageUrl });
  } catch (error) {
    results.push({ id: target.id, ok: false, url: target.url, error: error.message });
  }
}

await browser.close();

console.log(JSON.stringify(results, null, 2));

const failed = results.filter((result) => !result.ok);
if (failed.length > 0) {
  console.error(`${failed.length} screenshot(s) failed.`);
  process.exit(1);
}
