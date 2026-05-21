import { promises as fs } from "node:fs";
import path from "node:path";
import { dataFile, galleryDir, listSourceImages } from "./gallery-utils.mjs";

const sourceFiles = await listSourceImages();
const manifestText = await fs.readFile(dataFile, "utf8");
const totalMatch = manifestText.match(/"total":\s*(\d+)/);
const canonicalMatch = manifestText.match(/"canonicalCount":\s*(\d+)/);
const duplicateMatch = manifestText.match(/"duplicateCopies":\s*(\d+)/);

if (!totalMatch || !canonicalMatch || !duplicateMatch) {
  throw new Error("Gallery manifest stats are missing.");
}

const total = Number(totalMatch[1]);
const canonicalCount = Number(canonicalMatch[1]);
const duplicateCopies = Number(duplicateMatch[1]);
const thumbCount = (await fs.readdir(path.join(galleryDir, "thumbs"))).filter((file) => file.endsWith(".webp")).length;
const displayCount = (await fs.readdir(path.join(galleryDir, "display"))).filter((file) => file.endsWith(".webp")).length;
const blurCount = (await fs.readdir(path.join(galleryDir, "blur"))).filter((file) => file.endsWith(".webp")).length;

if (sourceFiles.length !== total) throw new Error(`Expected ${sourceFiles.length} manifest items, found ${total}.`);
if (canonicalCount !== total - duplicateCopies) throw new Error("Canonical count does not match duplicate math.");
if (thumbCount !== canonicalCount || displayCount !== canonicalCount || blurCount !== canonicalCount) {
  throw new Error(
    `Variant counts mismatch: thumbs=${thumbCount}, display=${displayCount}, blur=${blurCount}, canonical=${canonicalCount}.`
  );
}

console.log(`Gallery validated: ${total} sources, ${canonicalCount} canonical, ${duplicateCopies} duplicate copies.`);
