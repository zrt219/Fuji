import Image from "next/image";
import type { FujiImage } from "@/data/fuji-images";

type Props = {
  hero: FujiImage;
  totalFrames: number;
  categoryCount: number;
  heroCandidates: number;
  digitalTwinFrames: number;
  uncategorizedCount: number;
};

export function FujiHero({ hero, totalFrames, categoryCount, heroCandidates, digitalTwinFrames, uncategorizedCount }: Props) {
  return (
    <section className="fa-hero" aria-labelledby="fuji-title">
      <Image src={hero.src} alt="" fill priority sizes="100vw" placeholder="blur" blurDataURL={hero.blurDataURL} className="fa-hero-image" />
      <div className="fa-hero-scrim" />
      <div className="fa-hero-inner">
        <div className="fa-hero-copy">
          <p className="fa-kicker">Fuji / Japan visual operating system</p>
          <h1 id="fuji-title">Fuji Atlas</h1>
          <p>A cinematic Japanese visual system for AI, product, and portfolio worlds.</p>
        </div>
        <div className="fa-stat-grid" aria-label="Fuji Atlas stats">
          <div>
            <strong>{totalFrames}</strong>
            <span>Total frames</span>
          </div>
          <div>
            <strong>{categoryCount}</strong>
            <span>Active categories</span>
          </div>
          <div>
            <strong>{heroCandidates}</strong>
            <span>Hero candidates</span>
          </div>
          <div>
            <strong>{digitalTwinFrames}</strong>
            <span>Digital twin frames</span>
          </div>
          <div>
            <strong>{uncategorizedCount}</strong>
            <span>Uncategorized</span>
          </div>
        </div>
      </div>
    </section>
  );
}
