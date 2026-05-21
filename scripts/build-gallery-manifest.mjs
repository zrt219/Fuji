import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import {
  collectionFromFilename,
  dataFile,
  fileHash,
  galleryDir,
  listSourceImages,
  locationFromFilename,
  sourceDir,
  titleFromLocation,
  variantName
} from "./gallery-utils.mjs";

const files = await listSourceImages();
const hashCounts = new Map();
const hashFirstIndex = new Map();
const hashCanonicalVariant = new Map();
const items = [];

for (const [index, fileName] of files.entries()) {
  const sourcePath = path.join(sourceDir, fileName);
  const hash = await fileHash(sourcePath);
  const meta = await sharp(sourcePath).metadata();
  const outputName = variantName(index, fileName, hash);
  const duplicateIndex = hashFirstIndex.get(hash);
  const duplicateGroupId = duplicateIndex === undefined ? null : `dup-${hash.slice(0, 10).toLowerCase()}`;
  const firstIndex = duplicateIndex ?? index;
  const canonicalId = `fuji-${String(firstIndex + 1).padStart(3, "0")}`;

  if (!hashCanonicalVariant.has(hash)) {
    hashCanonicalVariant.set(hash, outputName);
  }

  const publicVariant = hashCanonicalVariant.get(hash);

  if (!hashFirstIndex.has(hash)) hashFirstIndex.set(hash, index);
  hashCounts.set(hash, (hashCounts.get(hash) ?? 0) + 1);

  const collection = collectionFromFilename(fileName);
  const location = locationFromFilename(fileName, collection, index);
  const isFeatured =
    collection === "final-select" ||
    collection === "command-wall" ||
    fileName === "preview.jpg" ||
    index % 17 === 0;

  items.push({
    id: `fuji-${String(index + 1).padStart(3, "0")}`,
    title: titleFromLocation(location, index),
    location,
    thumbSrc: `/gallery/thumbs/${publicVariant}`,
    displaySrc: `/gallery/display/${publicVariant}`,
    blurSrc: `/gallery/blur/${publicVariant}`,
    width: meta.width ?? 0,
    height: meta.height ?? 0,
    hash,
    duplicateGroupId,
    canonicalId,
    collection,
    featuredRank: isFeatured ? Math.max(1, 100 - index) : null
  });
}

const duplicateCopies = [...hashCounts.values()].reduce((total, count) => total + Math.max(0, count - 1), 0);
const canonicalCount = files.length - duplicateCopies;

const ts = `export type GalleryItem = {
  id: string;
  title: string;
  location: string;
  thumbSrc: string;
  displaySrc: string;
  blurSrc: string;
  width: number;
  height: number;
  hash: string;
  duplicateGroupId: string | null;
  canonicalId: string;
  collection: string;
  featuredRank: number | null;
};

export const galleryStats = ${JSON.stringify({ total: files.length, duplicateCopies, canonicalCount }, null, 2)} as const;

export const galleryItems = ${JSON.stringify(items, null, 2)} satisfies GalleryItem[];
`;

await fs.mkdir(path.dirname(dataFile), { recursive: true });
await fs.writeFile(dataFile, ts);

console.log(
  `Manifest wrote ${items.length} items, ${canonicalCount} canonical images, ${duplicateCopies} duplicate copies.`
);
console.log(`Manifest: ${path.relative(process.cwd(), dataFile)}`);
console.log(`Gallery assets expected under ${path.relative(process.cwd(), galleryDir)}.`);
