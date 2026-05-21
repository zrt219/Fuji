"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { fujiCategoryLabelMap } from "@/data/fuji-chapters";
import { formatFujiMetaValue } from "@/data/fuji-labels";
import type { FujiCategory, FujiImage } from "@/data/fuji-images";

type FilmChapter = {
  title: string;
  subtitle: string;
  categories: FujiCategory[];
  limit: number;
};

const filmChapters: FilmChapter[] = [
  {
    title: "Fuji Opens",
    subtitle: "Opening frames that establish the atlas atmosphere.",
    categories: ["japan-heritage-art", "fuji-five-lakes", "fuji-golden-reflection"],
    limit: 3
  },
  {
    title: "Lakes and Reflections",
    subtitle: "Water, mirror light, and wide Fuji horizon lines.",
    categories: ["fuji-five-lakes", "fuji-golden-reflection", "fuji-blue-night"],
    limit: 4
  },
  {
    title: "Sacred Japan",
    subtitle: "Temple paths, torii corridors, and heritage composition.",
    categories: ["japan-temple-mountain", "japan-torii-shrine", "japan-heritage-art"],
    limit: 4
  },
  {
    title: "Rural Systems",
    subtitle: "Pastoral, floral, and agricultural landscapes around Fuji.",
    categories: ["fuji-rural-agritech", "fuji-pastoral-fields", "fuji-floral-fields"],
    limit: 4
  },
  {
    title: "Digital Twin Fuji",
    subtitle: "Cyber-physical overlays, mapped systems, and AI infrastructure.",
    categories: ["fuji-digital-twin"],
    limit: 4
  },
  {
    title: "Tokyo Energy",
    subtitle: "Crossings, alleys, and backstreet urban texture.",
    categories: ["tokyo-neon-crossing", "tokyo-lantern-alley", "tokyo-backstreet"],
    limit: 4
  },
  {
    title: "Sea of Clouds",
    subtitle: "Altitude, cloud oceans, and quiet cinematic distance.",
    categories: ["fuji-sea-of-clouds"],
    limit: 3
  },
  {
    title: "Closing Frame",
    subtitle: "Premium finish frames for a clean portfolio outro.",
    categories: ["fuji-golden-reflection", "fuji-blue-night", "fuji-five-lakes"],
    limit: 3
  }
];

type Props = {
  images: FujiImage[];
};

export function FujiFilmstrip({ images }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const frames = useMemo(() => {
    const used = new Set<string>();

    return filmChapters.flatMap((chapter) => {
      const selected = images
        .filter((image) => chapter.categories.includes(image.category))
        .sort((left, right) => {
          const leftScore = Number(left.heroCandidate) * 4 + Number(left.featured) * 2 + (left.useCase === "hero" ? 1 : 0);
          const rightScore = Number(right.heroCandidate) * 4 + Number(right.featured) * 2 + (right.useCase === "hero" ? 1 : 0);
          return rightScore - leftScore || left.id.localeCompare(right.id);
        })
        .filter((image) => {
          if (used.has(image.id)) return false;
          used.add(image.id);
          return true;
        })
        .slice(0, chapter.limit);

      return selected.map((image) => ({ chapter, image }));
    });
  }, [images]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = Math.min(Math.max(index + direction, 0), frames.length - 1);
      setIndex(nextIndex);
      ref.current?.children[nextIndex]?.scrollIntoView({ behavior: "smooth", inline: "center" });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [frames.length, index]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onScroll = () => {
      const nextIndex = Math.round(element.scrollLeft / Math.max(element.clientWidth, 1));
      setIndex(Math.min(Math.max(nextIndex, 0), Math.max(frames.length - 1, 0)));
    };

    element.addEventListener("scroll", onScroll, { passive: true });
    return () => element.removeEventListener("scroll", onScroll);
  }, [frames.length]);

  return (
    <main className="fa-film">
      <div className="fa-film-progress" style={{ inlineSize: `${((index + 1) / Math.max(frames.length, 1)) * 100}%` }} />
      <header>
        <p className="fa-kicker">Fuji Atlas film mode</p>
        <h1>Japanese cinematic location reel</h1>
      </header>
      <div className="fa-filmstrip" ref={ref}>
        {frames.map(({ chapter, image }, frameIndex) => (
          <section key={`${image.id}-${chapter.title}`} className="fa-film-frame" tabIndex={0} onFocus={() => setIndex(frameIndex)}>
            <Image src={image.src} alt={image.alt} fill sizes="100vw" placeholder="blur" blurDataURL={image.blurDataURL} />
            <div>
              <p>{chapter.title}</p>
              <h2>{fujiCategoryLabelMap[image.category] ?? image.category}</h2>
              <small>{chapter.subtitle}</small>
              <span>{image.id} · {formatFujiMetaValue("locationFamily", image.locationFamily)} · {formatFujiMetaValue("mood", image.mood)}</span>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
