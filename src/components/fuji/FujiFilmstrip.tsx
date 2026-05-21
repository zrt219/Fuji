"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clapperboard, Home, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fujiCategoryLabelMap } from "@/data/fuji-chapters";
import { formatFujiMetaValue } from "@/data/fuji-labels";
import type { FujiCategory, FujiImage } from "@/data/fuji-images";

type FilmChapter = {
  title: string;
  subtitle: string;
  categories: FujiCategory[];
  limit: number;
};

type FilmFrame = {
  chapter: FilmChapter;
  image: FujiImage;
};

const filmChapters: FilmChapter[] = [
  {
    title: "Fuji Opens",
    subtitle: "Opening frames that establish the atlas atmosphere.",
    categories: ["japan-heritage-art", "fuji-five-lakes", "fuji-golden-reflection"],
    limit: 3,
  },
  {
    title: "Lakes and Reflections",
    subtitle: "Water, mirror light, and wide Fuji horizon lines.",
    categories: ["fuji-five-lakes", "fuji-golden-reflection", "fuji-blue-night"],
    limit: 4,
  },
  {
    title: "Sacred Japan",
    subtitle: "Temple paths, torii corridors, and heritage composition.",
    categories: ["japan-temple-mountain", "japan-torii-shrine", "japan-heritage-art"],
    limit: 4,
  },
  {
    title: "Rural Systems",
    subtitle: "Pastoral, floral, and agricultural landscapes around Fuji.",
    categories: ["fuji-rural-agritech", "fuji-pastoral-fields", "fuji-floral-fields"],
    limit: 4,
  },
  {
    title: "Digital Twin Fuji",
    subtitle: "Cyber-physical overlays, mapped systems, and AI infrastructure.",
    categories: ["fuji-digital-twin"],
    limit: 4,
  },
  {
    title: "Tokyo Energy",
    subtitle: "Crossings, alleys, and backstreet urban texture.",
    categories: ["tokyo-neon-crossing", "tokyo-lantern-alley", "tokyo-backstreet"],
    limit: 4,
  },
  {
    title: "Sea of Clouds",
    subtitle: "Altitude, cloud oceans, and quiet cinematic distance.",
    categories: ["fuji-sea-of-clouds"],
    limit: 3,
  },
  {
    title: "Closing Frame",
    subtitle: "Premium finish frames for a clean portfolio outro.",
    categories: ["fuji-golden-reflection", "fuji-blue-night", "fuji-five-lakes"],
    limit: 3,
  },
];

type Props = {
  images: FujiImage[];
};

export function FujiFilmstrip({ images }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const frames = useMemo<FilmFrame[]>(() => {
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

  const activeFrame = frames[index] ?? frames[0];
  const chapterMarkers = useMemo(() => {
    const markers: Array<{ title: string; index: number }> = [];

    frames.forEach((frame, frameIndex) => {
      if (markers.some((marker) => marker.title === frame.chapter.title)) return;
      markers.push({ title: frame.chapter.title, index: frameIndex });
    });

    return markers;
  }, [frames]);

  const scrollToFrame = useCallback((nextIndex: number) => {
    const boundedIndex = Math.min(Math.max(nextIndex, 0), Math.max(frames.length - 1, 0));
    setIndex(boundedIndex);
    ref.current?.children[boundedIndex]?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [frames.length]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") scrollToFrame(index + 1);
      if (event.key === "ArrowLeft") scrollToFrame(index - 1);
      if (event.key === " ") {
        event.preventDefault();
        setIsPlaying((current) => !current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, scrollToFrame]);

  useEffect(() => {
    if (!isPlaying || !frames.length) return;

    const timer = window.setInterval(() => {
      setIndex((currentIndex) => {
        const nextIndex = currentIndex >= frames.length - 1 ? 0 : currentIndex + 1;
        ref.current?.children[nextIndex]?.scrollIntoView({ behavior: "smooth", inline: "center" });
        return nextIndex;
      });
    }, 4200);

    return () => window.clearInterval(timer);
  }, [frames.length, isPlaying]);

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
      <header className="fa-film-header">
        <div>
          <p className="fa-kicker">Fuji Atlas film mode</p>
          <h1>Japanese location system reel</h1>
        </div>
        <div className="fa-film-status" aria-label="Current film frame">
          <strong>{String(index + 1).padStart(2, "0")}</strong>
          <span>/ {String(Math.max(frames.length, 1)).padStart(2, "0")}</span>
        </div>
      </header>
      <nav className="fa-film-chapters" aria-label="Film chapters">
        {chapterMarkers.map((marker) => (
          <button key={marker.title} type="button" className={activeFrame?.chapter.title === marker.title ? "active" : ""} onClick={() => scrollToFrame(marker.index)}>
            {marker.title}
          </button>
        ))}
      </nav>
      <div className="fa-film-controls" aria-label="Film controls">
        <Link href="/fuji" aria-label="Return to Fuji Atlas">
          <Home size={16} />
          <span>Atlas</span>
        </Link>
        <button type="button" onClick={() => scrollToFrame(index - 1)} aria-label="Previous film frame">
          <ArrowLeft size={16} />
        </button>
        <button type="button" className="primary" onClick={() => setIsPlaying((current) => !current)} aria-label={isPlaying ? "Pause film mode" : "Play film mode"}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>
        <button type="button" onClick={() => scrollToFrame(index + 1)} aria-label="Next film frame">
          <ArrowRight size={16} />
        </button>
      </div>
      {activeFrame ? (
        <aside className="fa-film-intel" aria-label="Active frame metadata">
          <Clapperboard size={16} />
          <div>
            <strong>{activeFrame.image.id}</strong>
            <span>{fujiCategoryLabelMap[activeFrame.image.category] ?? activeFrame.image.category}</span>
          </div>
        </aside>
      ) : null}
      <div className="fa-filmstrip" ref={ref}>
        {frames.map(({ chapter, image }, frameIndex) => (
          <section
            key={`${image.id}-${chapter.title}`}
            className={frameIndex === index ? "fa-film-frame active" : "fa-film-frame"}
            tabIndex={0}
            onFocus={() => setIndex(frameIndex)}
          >
            <Image src={image.src} alt={image.alt} fill sizes="100vw" placeholder="blur" blurDataURL={image.blurDataURL} />
            <div className="fa-film-caption">
              <p>{chapter.title}</p>
              <h2>{fujiCategoryLabelMap[image.category] ?? image.category}</h2>
              <small>{chapter.subtitle}</small>
              <span>{image.id} / {formatFujiMetaValue("locationFamily", image.locationFamily)} / {formatFujiMetaValue("mood", image.mood)}</span>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
