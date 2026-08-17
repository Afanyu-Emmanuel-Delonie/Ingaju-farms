import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

const QUALITY = 82;
const MAX_WIDTH = 1920;
const EXTS = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (EXTS.has(extname(e.name).toLowerCase())) files.push(full);
  }
  return files;
}

const files = await walk("public/images");
let savedTotal = 0;

for (const file of files) {
  const webpPath = file.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const before = (await stat(file)).size;

  try {
    await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(webpPath);

    const after = (await stat(webpPath)).size;
    const saved = before - after;
    savedTotal += saved;
    console.log(
      `${basename(file).padEnd(35)} ${Math.round(before/1024)}KB -> ${Math.round(after/1024)}KB  (saved ${Math.round(saved/1024)}KB)`
    );
  } catch (e) {
    console.error(`FAILED: ${file} — ${e.message}`);
  }
}

console.log(`\nTotal saved: ${Math.round(savedTotal/1024/1024*100)/100} MB`);
