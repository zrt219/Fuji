"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { fujiCategoryLabelMap } from "@/data/fuji-chapters";
import { formatFujiMetaValue, fujiFieldLabelMap, type FujiMetaField } from "@/data/fuji-labels";
import type { FujiCategory, FujiImage } from "@/data/fuji-images";
import { fujiImages } from "@/data/fuji-images";

const categories: FujiCategory[] = [
  "fuji-five-lakes",
  "fuji-golden-reflection",
  "fuji-blue-night",
  "fuji-digital-twin",
  "fuji-rural-agritech",
  "fuji-pastoral-fields",
  "fuji-floral-fields",
  "fuji-sea-of-clouds",
  "japan-torii-shrine",
  "japan-temple-mountain",
  "tokyo-neon-crossing",
  "tokyo-lantern-alley",
  "tokyo-backstreet",
  "japan-heritage-art",
  "uncategorized"
];

const shortcutCategory: Record<string, FujiCategory> = {
  "1": "fuji-five-lakes",
  "2": "fuji-golden-reflection",
  "3": "fuji-blue-night",
  "4": "fuji-digital-twin",
  "5": "fuji-rural-agritech",
  "6": "fuji-pastoral-fields",
  "7": "fuji-floral-fields",
  "8": "fuji-sea-of-clouds",
  "9": "japan-torii-shrine",
  "0": "tokyo-neon-crossing"
};

const fieldOptions = {
  locationFamily: ["mount-fuji", "fuji-five-lakes", "tokyo", "kyoto-shrine", "mountain-temple", "rural-japan", "heritage-art", "unknown"],
  visualSystem: ["natural-landscape", "sacred-architecture", "urban-neon", "cyber-physical", "agriculture", "pastoral", "heritage"],
  mood: ["calm", "cinematic", "sacred", "electric", "mysterious", "premium", "pastoral", "technical"],
  palette: ["blue", "gold", "orange", "green", "red", "purple", "neutral", "mixed"],
  timeOfDay: ["day", "sunrise", "sunset", "blue-hour", "night", "unknown"],
  composition: ["wide-landscape", "mountain-center", "lake-reflection", "street-depth", "architectural-corridor", "field-perspective", "cloudscape", "people-overlook", "heritage-frame"],
  useCase: ["hero", "section-background", "gallery-card", "portfolio-case-study", "ai-system-visual", "transition-frame"]
} as const;

type MutableImage = FujiImage;

export default function FujiCuratePage() {
  const [images, setImages] = useState<MutableImage[]>(fujiImages);
  const [selectedId, setSelectedId] = useState(fujiImages[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const selected = images.find((image) => image.id === selectedId) ?? images[0];

  const counts = useMemo(
    () =>
      images.reduce((acc, image) => {
        acc[image.category] = (acc[image.category] ?? 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    [images]
  );

  const updateImage = (id: string, patch: Partial<MutableImage>) => {
    setImages((current) => current.map((image) => (image.id === id ? { ...image, ...patch } : image)));
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!selected || event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) return;
      const category = shortcutCategory[event.key];
      if (category) {
        event.preventDefault();
        updateImage(selected.id, { category });
      }
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const currentIndex = images.findIndex((image) => image.id === selected.id);
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const next = images[Math.min(Math.max(currentIndex + direction, 0), images.length - 1)];
        setSelectedId(next.id);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [images, selected]);

  const exportSeed = async () => {
    const seed = Object.fromEntries(
      images.map((image) => [
        image.filename,
        {
          category: image.category,
          locationFamily: image.locationFamily,
          visualSystem: image.visualSystem,
          mood: image.mood,
          palette: image.palette,
          timeOfDay: image.timeOfDay,
          composition: image.composition,
          useCase: image.useCase,
          featured: image.featured,
          heroCandidate: image.heroCandidate,
          alt: image.alt
        }
      ])
    );
    await navigator.clipboard.writeText(JSON.stringify(seed, null, 2));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (!selected) return null;

  return (
    <main className="fa-curate">
      <header>
        <div>
          <p className="fa-kicker">Static curation workflow</p>
          <h1>Fuji Atlas Curate</h1>
          <p>Classify visually, export JSON, paste into scripts/fuji-category-seed.json, then run npm run fuji:manifest.</p>
        </div>
        <button onClick={exportSeed}>{copied ? "Copied seed JSON" : "Copy fuji-category-seed.json"}</button>
      </header>

      <section className="fa-curate-stats" aria-label="Curation counts">
        <span>{images.length} frames</span>
        <span>{counts.uncategorized ?? 0} uncategorized</span>
        <span>1-9 and 0 shortcuts enabled</span>
      </section>

      <section className="fa-curate-workbench">
        <div className="fa-curate-grid">
          {images.map((image) => (
            <button key={image.id} className={selected.id === image.id ? "active" : ""} onClick={() => setSelectedId(image.id)}>
              <Image src={image.src} alt={image.alt} fill sizes="180px" placeholder="blur" blurDataURL={image.blurDataURL} />
              <span>{image.id}</span>
              <em>{fujiCategoryLabelMap[image.category] ?? image.category}</em>
            </button>
          ))}
        </div>

        <aside className="fa-curate-panel">
          <div className="fa-curate-preview">
            <Image src={selected.src} alt={selected.alt} fill sizes="420px" placeholder="blur" blurDataURL={selected.blurDataURL} />
          </div>
          <h2>{selected.id}</h2>
          <p>{fujiCategoryLabelMap[selected.category] ?? selected.category}</p>
          <code>{selected.filename}</code>
          <label>
            Category
            <select value={selected.category} onChange={(event) => updateImage(selected.id, { category: event.target.value as FujiCategory })}>
              {categories.map((category) => (
                <option key={category} value={category}>{fujiCategoryLabelMap[category] ?? category}</option>
              ))}
            </select>
          </label>
          {(Object.entries(fieldOptions) as Array<[FujiMetaField, readonly string[]]>).map(([field, options]) => (
            <label key={field}>
              {fujiFieldLabelMap[field]}
              <select value={String(selected[field as keyof MutableImage])} onChange={(event) => updateImage(selected.id, { [field]: event.target.value } as Partial<MutableImage>)}>
                {options.map((option) => (
                  <option key={option} value={option}>{formatFujiMetaValue(field, option as never)}</option>
                ))}
              </select>
            </label>
          ))}
          <label className="fa-check">
            <input type="checkbox" checked={selected.featured} onChange={(event) => updateImage(selected.id, { featured: event.target.checked })} />
            Featured
          </label>
          <label className="fa-check">
            <input type="checkbox" checked={selected.heroCandidate} onChange={(event) => updateImage(selected.id, { heroCandidate: event.target.checked })} />
            Hero candidate
          </label>
          <p>Shortcuts: `1` Five Lakes, `2` Golden Reflections, `3` Blue Night, `4` Digital Twin, `5` AgriTech, `6` Pastoral, `7` Floral, `8` Sea of Clouds, `9` Torii Paths, `0` Tokyo Crossing.</p>
        </aside>
      </section>
    </main>
  );
}
