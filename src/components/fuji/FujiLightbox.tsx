"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fujiCategoryLabelMap, fujiCategorySubtitleMap } from "@/data/fuji-chapters";
import { formatFujiMetaValue } from "@/data/fuji-labels";
import type { FujiImage } from "@/data/fuji-images";

type Props = {
  image: FujiImage | null;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function FujiLightbox({ image, onClose, onNext, onPrevious }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!image) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [image, onClose, onNext, onPrevious]);

  if (!image) return null;

  return (
    <div className="fa-lightbox" role="dialog" aria-modal="true" aria-label={`${image.id} detail`}>
      <div className="fa-lightbox-actions">
        <button className="fa-lightbox-close" onClick={onClose} aria-label="Close lightbox">
          Close
        </button>
        <button className="fa-lightbox-nav previous middle" onClick={onPrevious} aria-label="Previous image">
          <span className="fa-lightbox-nav-kana">前</span>
          <span>Previous</span>
        </button>
        <button className="fa-lightbox-nav next middle" onClick={onNext} aria-label="Next image">
          <span>Next</span>
          <span className="fa-lightbox-nav-kana">次</span>
        </button>
      </div>
      <div className="fa-lightbox-image">
        <Image src={image.src} alt={image.alt} fill sizes="90vw" placeholder="blur" blurDataURL={image.blurDataURL} />
        <aside className={`fa-lightbox-meta${showDetails ? " expanded" : ""}`}>
          <div className="fa-lightbox-meta-head">
            <p className="fa-kicker">{image.id}</p>
            <h2>{fujiCategoryLabelMap[image.category] ?? image.category}</h2>
            <p className="fa-lightbox-subtitle">{fujiCategorySubtitleMap[image.category] ?? image.alt}</p>
          </div>
          <div className="fa-lightbox-summary">
            <span>{formatFujiMetaValue("locationFamily", image.locationFamily)}</span>
            <span>{formatFujiMetaValue("mood", image.mood)}</span>
            <span>{formatFujiMetaValue("timeOfDay", image.timeOfDay)}</span>
          </div>
          <button
            className="fa-lightbox-toggle"
            onClick={() => setShowDetails((current) => !current)}
            aria-expanded={showDetails}
            aria-controls="fuji-lightbox-details"
          >
            {showDetails ? "Hide details" : "Details"}
          </button>
          {showDetails ? (
            <dl id="fuji-lightbox-details">
              <div>
                <dt>Filename</dt>
                <dd>{image.filename}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{fujiCategoryLabelMap[image.category] ?? image.category}</dd>
              </div>
              <div>
                <dt>Location family</dt>
                <dd>{formatFujiMetaValue("locationFamily", image.locationFamily)}</dd>
              </div>
              <div>
                <dt>Visual system</dt>
                <dd>{formatFujiMetaValue("visualSystem", image.visualSystem)}</dd>
              </div>
              <div>
                <dt>Mood</dt>
                <dd>{formatFujiMetaValue("mood", image.mood)}</dd>
              </div>
              <div>
                <dt>Palette</dt>
                <dd>{formatFujiMetaValue("palette", image.palette)}</dd>
              </div>
              <div>
                <dt>Time of day</dt>
                <dd>{formatFujiMetaValue("timeOfDay", image.timeOfDay)}</dd>
              </div>
              <div>
                <dt>Composition</dt>
                <dd>{formatFujiMetaValue("composition", image.composition)}</dd>
              </div>
              <div>
                <dt>Use case</dt>
                <dd>{formatFujiMetaValue("useCase", image.useCase)}</dd>
              </div>
            </dl>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
