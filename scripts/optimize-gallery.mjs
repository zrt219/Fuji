import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { fileHash, galleryDir, listSourceImages, sourceDir, variantName } from "./gallery-utils.mjs";

const thumbDir = path.join(galleryDir, "thumbs");
const displayDir = path.join(galleryDir, "display");
const blurDir = path.join(galleryDir, "blur");

await Promise.all([thumbDir, displayDir, blurDir].map((dir) => fs.mkdir(dir, { recursive: true })));

const files = await listSourceImages();
const seenHashes = new Set();
let optimizedCount = 0;
let skippedDuplicates = 0;

for (const [index, fileName] of files.entries()) {
  const sourcePath = path.join(sourceDir, fileName);
  const hash = await fileHash(sourcePath);
  if (seenHashes.has(hash)) {
    skippedDuplicates += 1;
    continue;
  }
  seenHashes.add(hash);

  const outputName = variantName(index, fileName, hash);
  const thumbPath = path.join(thumbDir, outputName);
  const displayPath = path.join(displayDir, outputName);
  const blurPath = path.join(blurDir, outputName);

  await sharp(sourcePath)
    .rotate()
    .resize({ width: 520, withoutEnlargement: true })
    .webp({ quality: 76, effort: 5 })
    .toFile(thumbPath);

  await sharp(sourcePath)
    .rotate()
    .resize({ width: 1680, withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(displayPath);

  await sharp(sourcePath)
    .rotate()
    .resize({ width: 32, withoutEnlargement: true })
    .webp({ quality: 48, effort: 4 })
    .toFile(blurPath);

  optimizedCount += 1;
}

console.log(
  `Optimized ${optimizedCount} canonical gallery images into ${path.relative(process.cwd(), galleryDir)}; skipped ${skippedDuplicates} duplicate sources.`
);
