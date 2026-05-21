"use client";

import Image from "next/image";
import { GalleryHorizontal, LayoutGrid } from "lucide-react";
import { useMemo, useState } from "react";
import { FujiChapterRail } from "./FujiChapterRail";
import { FujiLightbox } from "./FujiLightbox";
import type { FujiChapterId } from "@/data/fuji-chapters";
import { fujiCategoryLabelMap, fujiChapters } from "@/data/fuji-chapters";
import { formatFujiMetaValue } from "@/data/fuji-labels";
import type { FujiCategory, FujiImage } from "@/data/fuji-images";

type Props = {
  images: FujiImage[];
};

export function FujiGallery({ images }: Props) {
  const [activeChapter, setActiveChapter] = useState<FujiChapterId>("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<"masonry" | "row">("masonry");

  const counts = useMemo(
    () =>
      images.reduce((acc, image) => {
        acc[image.category] = (acc[image.category] ?? 0) + 1;
        return acc;
      }, {} as Record<FujiCategory, number>),
    [images]
  );

  const visibleImages = activeChapter === "all" ? images : images.filter((image) => image.category === activeChapter);
  const activeIndex = activeId ? visibleImages.findIndex((image) => image.id === activeId) : -1;
  const activeImage = activeIndex >= 0 ? visibleImages[activeIndex] : null;
  const activeChapterMeta = fujiChapters.find((chapter) => chapter.id === activeChapter);

  const openImage = (id: string) => setActiveId(id);
  const closeImage = () => setActiveId(null);
  const nextImage = () => {
    if (!visibleImages.length) return;
    const next = visibleImages[(Math.max(activeIndex, 0) + 1) % visibleImages.length];
    setActiveId(next.id);
  };
  const previousImage = () => {
    if (!visibleImages.length) return;
    const previous = visibleImages[(Math.max(activeIndex, 0) - 1 + visibleImages.length) % visibleImages.length];
    setActiveId(previous.id);
  };

  return (
    <section className="fa-gallery-shell" aria-labelledby="fuji-gallery-title">
      <FujiChapterRail active={activeChapter} counts={counts} total={images.length} onSelect={setActiveChapter} />
      <div className="fa-gallery-stage">
        <div className="fa-gallery-heading">
          <div>
            <p className="fa-kicker">Visual chapters</p>
            <h2 id="fuji-gallery-title">{activeChapterMeta?.label ?? "All Frames"}</h2>
            <p>{activeChapterMeta?.subtitle ?? "The complete Fuji / Japan visual archive"}</p>
          </div>
          <div className="fa-gallery-tools" aria-label="Gallery view settings">
            <div className="fa-layout-toggle" role="group" aria-label="Gallery layout">
              <button className={layoutMode === "masonry" ? "active" : ""} type="button" onClick={() => setLayoutMode("masonry")} aria-pressed={layoutMode === "masonry"}>
                <LayoutGrid size={15} aria-hidden="true" />
                <span>Masonry</span>
              </button>
              <button className={layoutMode === "row" ? "active" : ""} type="button" onClick={() => setLayoutMode("row")} aria-pressed={layoutMode === "row"}>
                <GalleryHorizontal size={15} aria-hidden="true" />
                <span>Row</span>
              </button>
            </div>
            <div className="fa-uncat-pill">
              <strong>{counts.uncategorized ?? 0}</strong>
              <span>uncategorized frames</span>
            </div>
          </div>
        </div>

        <div className={layoutMode === "row" ? "fa-masonry row" : "fa-masonry"}>
          {visibleImages.map((image) => (
            <button key={image.id} className="fa-card" onClick={() => openImage(image.id)} aria-label={`Open ${image.id}`}>
              <span className="fa-card-image" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 720px) 50vw, 25vw" placeholder="blur" blurDataURL={image.blurDataURL} />
              </span>
              <span className="fa-card-body">
                <span className="fa-id">{image.id}</span>
                <strong>{fujiCategoryLabelMap[image.category] ?? image.category}</strong>
                <em>{formatFujiMetaValue("locationFamily", image.locationFamily)} / {formatFujiMetaValue("mood", image.mood)}</em>
              </span>
            </button>
          ))}
        </div>
      </div>
      <FujiLightbox key={activeImage?.id ?? "closed"} image={activeImage} onClose={closeImage} onNext={nextImage} onPrevious={previousImage} />
    </section>
  );
}
