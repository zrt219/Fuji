import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const fujiDir = path.join(rootDir, "public", "fuji");
const outputPath = path.join(rootDir, "public", "fuji-contact-sheet.png");

const files = (await fs.readdir(fujiDir))
  .filter((file) => file.endsWith(".webp"))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true, sensitivity: "base" }));

const cols = 5;
const thumbW = 260;
const thumbH = 170;
const pad = 20;
const labelH = 54;
const rows = Math.ceil(files.length / cols);
const width = cols * thumbW + (cols + 1) * pad;
const height = rows * (thumbH + labelH) + (rows + 1) * pad;

const svg = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`,
  '<rect width="100%" height="100%" fill="none"/>'
];
const composites = [];

for (const [index, file] of files.entries()) {
  const row = Math.floor(index / cols);
  const col = index % cols;
  const left = pad + col * (thumbW + pad);
  const top = pad + row * (thumbH + labelH + pad);
  const input = path.join(fujiDir, file);
  const thumb = await sharp(input).resize(thumbW, thumbH, { fit: "cover" }).png().toBuffer();
  composites.push({ input: thumb, left, top });

  const id = `FJ-${String(index + 1).padStart(3, "0")}`;
  svg.push(
    `<text x="${left}" y="${top + thumbH + 22}" font-size="20" font-family="Arial" fill="#18140d" font-weight="700">${id}</text>`
  );
  svg.push(
    `<text x="${left}" y="${top + thumbH + 42}" font-size="12" font-family="Arial" fill="#6f6040">${file}</text>`
  );
}

svg.push("</svg>");

await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: "#f8f5ed"
  }
})
  .composite(composites)
  .composite([{ input: Buffer.from(svg.join("")), left: 0, top: 0 }])
  .png()
  .toFile(outputPath);

console.log(outputPath);
