import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initialData } from "../app.js";
import { runDailyUpdate } from "../update-engine.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const liveDataPath = path.join(root, "data", "live-data.json");
const sourcePath = path.join(root, "data", "source-watchlist.json");

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

const data = await readJson(liveDataPath, { ...initialData, reviewQueue: [] });
const sources = await readJson(sourcePath, []);
const result = await runDailyUpdate(data, sources);

await writeJson(liveDataPath, result.data);
await writeJson(sourcePath, result.sources);

console.log(
  JSON.stringify(
    {
      checkedAt: result.checkedAt,
      updates: result.data.updates.length,
      reviewQueue: result.data.reviewQueue.length,
      errors: result.errors
    },
    null,
    2
  )
);
