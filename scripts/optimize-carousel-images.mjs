#!/usr/bin/env node
/**
 * Resize carousel JPEGs for web: max width 900px @ quality 80.
 * Run after dropping originals into public/images/optimized/
 */
import { readdir, rename, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public/images/optimized");
const MAX_WIDTH = 900;
const QUALITY = 80;

const files = (await readdir(DIR)).filter((f) => f.endsWith(".jpg"));

for (const file of files) {
  const input = path.join(DIR, file);
  const temp = path.join(DIR, `.${file}.tmp`);

  const { width, height } = await sharp(input).metadata();
  const before = await stat(input);

  await sharp(input)
    .rotate()
    .resize(MAX_WIDTH, null, { withoutEnlargement: true, fit: "inside" })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(temp);

  await unlink(input);
  await rename(temp, input);

  const after = await sharp(input).metadata();
  const afterStat = await stat(input);
  console.log(
    `${file}: ${width}x${height} (${Math.round(before.size / 1024)}KB) → ${after.width}x${after.height} (${Math.round(afterStat.size / 1024)}KB)`,
  );
}

console.log(`Done — ${files.length} images at q${QUALITY}, max width ${MAX_WIDTH}px.`);
