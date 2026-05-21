import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export const rootDir = process.cwd();
export const sourceDir = path.join(rootDir, "source-images");
export const galleryDir = path.join(rootDir, "public", "gallery");
export const dataFile = path.join(rootDir, "src", "data", "gallery.ts");

export const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const locationSets = {
  seed: ["Mount Fuji viewed from Suruga Bay, Shizuoka, Japan"],
  archive: [
    "Lake Kawaguchi, Yamanashi, Japan",
    "Fujiyoshida, Yamanashi, Japan",
    "Lake Yamanaka, Yamanashi, Japan",
    "Lake Motosu, Yamanashi, Japan",
    "Hakone, Kanagawa, Japan"
  ],
  systems: [
    "Lake Kawaguchi, Yamanashi, Japan",
    "Fujiyoshida, Yamanashi, Japan",
    "Shizuoka City, Shizuoka, Japan",
    "Hakone, Kanagawa, Japan",
    "Oshino Hakkai, Yamanashi, Japan"
  ],
  environment: [
    "Gion, Kyoto, Japan",
    "Fushimi Inari Taisha, Kyoto, Japan",
    "Ise Grand Shrine, Mie, Japan",
    "Kawagoe, Saitama, Japan",
    "Nikko, Tochigi, Japan"
  ],
  "fuji-variants": [
    "Lake Kawaguchi, Yamanashi, Japan",
    "Lake Yamanaka, Yamanashi, Japan",
    "Lake Saiko, Yamanashi, Japan",
    "Lake Motosu, Yamanashi, Japan",
    "Fujinomiya, Shizuoka, Japan"
  ],
  "atlas-night": [
    "Lake Kawaguchi, Yamanashi, Japan",
    "Fujiyoshida, Yamanashi, Japan",
    "Gotemba, Shizuoka, Japan",
    "Hakone, Kanagawa, Japan"
  ],
  "command-wall": [
    "Tokyo Tower, Minato, Tokyo, Japan",
    "Asakusa, Tokyo, Japan",
    "Shibuya, Tokyo, Japan",
    "Fushimi Inari Taisha, Kyoto, Japan",
    "Ueno, Tokyo, Japan",
    "Nihonbashi, Tokyo, Japan",
    "Obuchi Sasaba tea fields, Shizuoka, Japan"
  ],
  "final-select": [
    "Lake Kawaguchi, Yamanashi, Japan",
    "Fujiyoshida, Yamanashi, Japan",
    "Mount Fuji, Shizuoka and Yamanashi, Japan"
  ],
  reference: [
    "Mount Fuji, Shizuoka and Yamanashi, Japan",
    "Kyoto, Japan",
    "Tokyo, Japan",
    "Fuji Five Lakes, Yamanashi, Japan"
  ]
};

export function locationFromFilename(fileName, collection, index) {
  const lower = fileName.toLowerCase();
  if (lower.includes("pexels-pixabay")) return "Mount Fuji, Shizuoka and Yamanashi, Japan";
  if (lower.includes("pexels-huuhuynh")) return "Tokyo, Japan";
  if (lower.includes("pexels-tiennguyen")) return "Kyoto, Japan";
  if (lower.includes("tirachard")) return "Fushimi Inari Taisha, Kyoto, Japan";
  if (lower.includes("preview")) return "Fuji Five Lakes, Yamanashi, Japan";

  const locations = locationSets[collection] ?? locationSets.archive;
  return locations[index % locations.length];
}

export function titleFromLocation(location, index) {
  const shortName = location.split(", Japan")[0];
  return `${shortName} / Frame ${String(index + 1).padStart(3, "0")}`;
}

export function collectionFromFilename(fileName) {
  const lower = fileName.toLowerCase();
  if (lower.includes("pexels")) return "reference";
  if (lower.includes("mar 24")) return "seed";
  if (lower.includes("may 21")) return "final-select";
  if (lower.includes("06_41") || lower.includes("06_40")) return "command-wall";
  if (lower.includes("06_13")) return "atlas-night";
  if (lower.includes("04_52") || lower.includes("04_39")) return "fuji-variants";
  if (lower.includes("04_37") || lower.includes("04_38")) return "environment";
  if (lower.includes("04_35") || lower.includes("04_36")) return "systems";
  return "archive";
}

export async function listSourceImages() {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

export async function fileHash(filePath) {
  const buffer = await fs.readFile(filePath);
  return createHash("sha256").update(buffer).digest("hex").toUpperCase();
}

export function variantName(index, sourceName, hash) {
  const extless = `fuji-japan-frame-${String(index + 1).padStart(3, "0")}`;
  return `${String(index + 1).padStart(3, "0")}-${extless}-${hash.slice(0, 8).toLowerCase()}.webp`;
}
