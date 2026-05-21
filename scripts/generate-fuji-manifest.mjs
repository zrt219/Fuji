import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const fujiDir = path.join(rootDir, "public", "fuji");
const seedFile = path.join(rootDir, "scripts", "fuji-category-seed.json");
const outputFile = path.join(rootDir, "src", "data", "fuji-images.ts");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const defaultMeta = {
  category: "uncategorized",
  locationFamily: "unknown",
  visualSystem: "natural-landscape",
  mood: "calm",
  palette: "mixed",
  timeOfDay: "unknown",
  composition: "wide-landscape",
  useCase: "gallery-card",
  featured: false,
  heroCandidate: false
};

function naturalSort(a, b) {
  return a.localeCompare(b, "en", { numeric: true, sensitivity: "base" });
}

function labelFromCategory(category) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function blurDataURL(filePath) {
  const buffer = await sharp(filePath)
    .resize({ width: 24, withoutEnlargement: true })
    .webp({ quality: 40, effort: 4 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function readSeed() {
  try {
    return JSON.parse(await fs.readFile(seedFile, "utf8"));
  } catch {
    return {};
  }
}

const seed = await readSeed();
const entries = await fs.readdir(fujiDir, { withFileTypes: true });
const files = entries
  .filter((entry) => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .sort(naturalSort);

const images = [];

for (const [index, filename] of files.entries()) {
  const id = `FJ-${String(index + 1).padStart(3, "0")}`;
  const filePath = path.join(fujiDir, filename);
  const dimensions = await sharp(filePath).metadata();
  const override = seed[filename] ?? seed[id] ?? {};
  const meta = { ...defaultMeta, ...override };
  const categoryLabel = labelFromCategory(meta.category);
  const alt = override.alt ?? `${categoryLabel} frame in the Fuji Atlas Japanese visual archive`;

  images.push({
    id,
    src: `/fuji/${filename}`,
    filename,
    alt,
    width: dimensions.width ?? 0,
    height: dimensions.height ?? 0,
    blurDataURL: await blurDataURL(filePath),
    ...meta
  });
}

const ts = `export type FujiCategory =
  | "fuji-five-lakes"
  | "fuji-golden-reflection"
  | "fuji-blue-night"
  | "fuji-digital-twin"
  | "fuji-rural-agritech"
  | "fuji-pastoral-fields"
  | "fuji-floral-fields"
  | "fuji-sea-of-clouds"
  | "japan-torii-shrine"
  | "japan-temple-mountain"
  | "tokyo-neon-crossing"
  | "tokyo-lantern-alley"
  | "tokyo-backstreet"
  | "japan-heritage-art"
  | "uncategorized";

export type FujiImage = {
  id: string;
  src: string;
  filename: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
  category: FujiCategory;
  locationFamily:
    | "mount-fuji"
    | "fuji-five-lakes"
    | "tokyo"
    | "kyoto-shrine"
    | "mountain-temple"
    | "rural-japan"
    | "heritage-art"
    | "unknown";
  visualSystem:
    | "natural-landscape"
    | "sacred-architecture"
    | "urban-neon"
    | "cyber-physical"
    | "agriculture"
    | "pastoral"
    | "heritage";
  mood:
    | "calm"
    | "cinematic"
    | "sacred"
    | "electric"
    | "mysterious"
    | "premium"
    | "pastoral"
    | "technical";
  palette:
    | "blue"
    | "gold"
    | "orange"
    | "green"
    | "red"
    | "purple"
    | "neutral"
    | "mixed";
  timeOfDay:
    | "day"
    | "sunrise"
    | "sunset"
    | "blue-hour"
    | "night"
    | "unknown";
  composition:
    | "wide-landscape"
    | "mountain-center"
    | "lake-reflection"
    | "street-depth"
    | "architectural-corridor"
    | "field-perspective"
    | "cloudscape"
    | "people-overlook"
    | "heritage-frame";
  useCase:
    | "hero"
    | "section-background"
    | "gallery-card"
    | "portfolio-case-study"
    | "ai-system-visual"
    | "transition-frame";
  featured: boolean;
  heroCandidate: boolean;
};

export const fujiImages: FujiImage[] = ${JSON.stringify(images, null, 2)};
`;

await fs.mkdir(path.dirname(outputFile), { recursive: true });
await fs.writeFile(outputFile, ts);

const counts = images.reduce((acc, image) => {
  acc[image.category] = (acc[image.category] ?? 0) + 1;
  return acc;
}, {});

console.log(`Generated ${images.length} Fuji Atlas images.`);
console.log(JSON.stringify(counts, null, 2));
