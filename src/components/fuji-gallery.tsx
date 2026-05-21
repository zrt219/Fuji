"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { GalleryItem } from "@/data/gallery";

type GalleryStats = {
  total: number;
  duplicateCopies: number;
  canonicalCount: number;
};

type Props = {
  items: GalleryItem[];
  stats: GalleryStats;
};

const collectionLabels: Record<string, string> = {
  "final-select": "Final Selects",
  "command-wall": "Command Wall",
  "atlas-night": "Atlas Night",
  "fuji-variants": "Fuji Variants",
  environment: "Environment",
  systems: "Systems",
  reference: "Reference",
  archive: "Archive",
  seed: "Seed"
};

function StatusChip({ icon, label, tone = "solid" }: { icon: string; label: string; tone?: "solid" | "dashed" }) {
  return (
    <span className={`status-chip ${tone}`}>
      <span aria-hidden="true">{icon}</span>
      {label}
    </span>
  );
}

export function FujiGallery({ items, stats }: Props) {
  const [activeCollection, setActiveCollection] = useState("all");
  const [showArchive, setShowArchive] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const canonicalItems = useMemo(() => items.filter((item) => item.id === item.canonicalId), [items]);
  const visibleBase = showArchive ? items : canonicalItems;
  const collections = useMemo(() => ["all", ...Array.from(new Set(items.map((item) => item.collection)))], [items]);

  const visibleItems = useMemo(() => {
    const pool = activeCollection === "all" ? visibleBase : visibleBase.filter((item) => item.collection === activeCollection);
    return [...pool].sort((a, b) => {
      const rankA = a.featuredRank ?? 0;
      const rankB = b.featuredRank ?? 0;
      if (rankA !== rankB) return rankB - rankA;
      return a.id.localeCompare(b.id);
    });
  }, [activeCollection, visibleBase]);

  const featured = useMemo(
    () =>
      [...canonicalItems]
        .filter((item) => item.featuredRank !== null)
        .sort((a, b) => (b.featuredRank ?? 0) - (a.featuredRank ?? 0))
        .slice(0, 12),
    [canonicalItems]
  );
  const hero = featured[0] ?? canonicalItems[0];
  const selected = selectedId ? items.find((item) => item.id === selectedId) ?? null : null;
  const variantCount = selected ? items.filter((item) => item.hash === selected.hash).length : 0;

  return (
    <main className="gallery-shell">
      <section className="hero" aria-labelledby="gallery-title">
        <Image src={hero.displaySrc} alt="" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-mask" />
        <header className="system-header" aria-label="Gallery system status">
          <div>
            <p className="system-kicker">Fuji Gallery Atlas</p>
            <p className="system-state">VERCEL READY / LOCAL OPTIMIZED</p>
          </div>
          <div className="header-chips">
            <StatusChip icon="*" label="DEMO GALLERY" />
            <StatusChip icon="OK" label={`${stats.canonicalCount} JAPAN FRAMES`} />
            <StatusChip icon="VAR" label={`${stats.duplicateCopies} ARCHIVE VARIANTS`} tone="dashed" />
          </div>
        </header>

        <div className="hero-content">
          <div>
            <p className="eyebrow">CINEMATIC JAPAN IMAGE ARCHIVE</p>
            <h1 id="gallery-title">Fuji systems image wall for Vercel.</h1>
            <p className="hero-copy">
              A generated gallery pipeline turns {stats.total} Japan archive images into fast WebP variants,
              groups exact duplicates without uploading repeated files, and presents the collection as a polished visual atlas.
            </p>
          </div>
          <aside className="proof-panel" aria-label="Gallery evidence">
            <div className="proof-row">
              <span>{stats.total}</span>
              <p>Japan archive images</p>
            </div>
            <div className="proof-row">
              <span>{stats.canonicalCount}</span>
              <p>default gallery images</p>
            </div>
            <div className="proof-row">
              <span>{stats.duplicateCopies}</span>
              <p>hash-matched archive variants</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="command-wall" aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FEATURED WALL</p>
            <h2 id="featured-title">Twelve strongest atlas frames.</h2>
          </div>
          <StatusChip icon="OK" label="OPTIMIZED WEBP" />
        </div>
        <div className="featured-grid">
          {featured.map((item, index) => (
            <button className="featured-tile" key={item.id} onClick={() => setSelectedId(item.id)}>
              <Image src={item.thumbSrc} alt={item.title} fill sizes="(max-width: 768px) 50vw, 18vw" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="browser" aria-labelledby="browser-title">
        <div className="toolbar">
          <div>
            <p className="eyebrow">BROWSER</p>
            <h2 id="browser-title">{showArchive ? "Archive records mapped to canonical assets." : "Canonical gallery."}</h2>
          </div>
          <label className="archive-toggle">
            <input type="checkbox" checked={showArchive} onChange={(event) => setShowArchive(event.target.checked)} />
            <span>VAR</span>
            Show duplicate records
          </label>
        </div>

        <div className="filters" aria-label="Collection filters">
          {collections.map((collection) => (
            <button
              key={collection}
              className={activeCollection === collection ? "active" : ""}
              onClick={() => setActiveCollection(collection)}
            >
              {collection === "all" ? "All" : collectionLabels[collection] ?? collection}
            </button>
          ))}
        </div>

        <div className="masonry" aria-live="polite">
          {visibleItems.map((item) => (
            <button
              className="gallery-card"
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              aria-label={`Open ${item.location}`}
            >
              <span className="image-wrap" style={{ aspectRatio: `${item.width} / ${item.height}` }}>
                <Image src={item.thumbSrc} alt={item.location} fill sizes="(max-width: 720px) 50vw, 22vw" loading="eager" />
              </span>
              <span className="card-meta">
                <strong>{item.id}</strong>
                <span>{collectionLabels[item.collection] ?? item.collection}</span>
                {item.id !== item.canonicalId ? <em>Variant</em> : <em>Canonical</em>}
              </span>
              <span className="hover-card" aria-hidden="true">
                <span className="hover-title">{item.location}</span>
                <span className="hover-grid">
                  <span>{item.width} x {item.height}</span>
                  <span>{collectionLabels[item.collection] ?? item.collection}</span>
                  <span>{item.id !== item.canonicalId ? "Duplicate record" : "Uploaded asset"}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {selected ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${selected.location} detail`}>
          <button className="modal-close" onClick={() => setSelectedId(null)} aria-label="Close image detail">
            x
          </button>
          <div className="modal-card">
            <div className="modal-image">
              <Image src={selected.displaySrc} alt={selected.location} fill sizes="90vw" />
            </div>
            <aside className="modal-details">
              <p className="eyebrow">IMAGE DETAIL</p>
              <h2>{selected.location}</h2>
              <StatusChip icon={selected.id === selected.canonicalId ? "OK" : "VAR"} label={selected.id === selected.canonicalId ? "CANONICAL" : "VARIANT"} />
              <dl>
                <div>
                  <dt>Location</dt>
                  <dd>{selected.location}</dd>
                </div>
                <div>
                  <dt>Dimensions</dt>
                  <dd>
                    {selected.width} x {selected.height}
                  </dd>
                </div>
                <div>
                  <dt>Collection</dt>
                  <dd>{collectionLabels[selected.collection] ?? selected.collection}</dd>
                </div>
                <div>
                  <dt>Hash</dt>
                  <dd>{selected.hash.slice(0, 18)}...</dd>
                </div>
                <div>
                  <dt>Archive records</dt>
                  <dd>{variantCount} mapped to one uploaded image asset</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      ) : null}
    </main>
  );
}
