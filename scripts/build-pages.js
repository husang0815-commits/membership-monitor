import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

async function copy(source, target) {
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(source, target);
}

async function copyDirectory(source, target) {
  await fs.mkdir(target, { recursive: true });
  const entries = await fs.readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
    } else {
      await copy(sourcePath, targetPath);
    }
  }
}

await fs.rm(dist, { recursive: true, force: true });
await fs.mkdir(path.join(dist, "data"), { recursive: true });

await copy(path.join(root, "index.html"), path.join(dist, "index.html"));
await copy(path.join(root, "styles.css"), path.join(dist, "styles.css"));
await copy(path.join(root, "app.js"), path.join(dist, "app.js"));
await copy(path.join(root, ".nojekyll"), path.join(dist, ".nojekyll"));
await copyDirectory(path.join(root, "assets"), path.join(dist, "assets"));

try {
  await copy(path.join(root, "data", "live-data.json"), path.join(dist, "data", "live-data.json"));
} catch {
  await copy(path.join(root, "data", "initial-data.json"), path.join(dist, "data", "live-data.json"));
}

console.log(`Built GitHub Pages site at ${dist}`);
