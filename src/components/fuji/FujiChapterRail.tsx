"use client";

import type { FujiChapterId } from "@/data/fuji-chapters";
import { fujiChapters } from "@/data/fuji-chapters";
import type { FujiCategory } from "@/data/fuji-images";

type Props = {
  active: FujiChapterId;
  counts: Record<FujiCategory, number>;
  total: number;
  onSelect: (chapter: FujiChapterId) => void;
};

export function FujiChapterRail({ active, counts, total, onSelect }: Props) {
  return (
    <nav className="fa-chapter-rail" aria-label="Fuji Atlas chapters">
      {fujiChapters.map((chapter, index) => {
        const count = chapter.id === "all" ? total : counts[chapter.id] ?? 0;
        return (
          <button key={chapter.id} className={active === chapter.id ? "active" : ""} onClick={() => onSelect(chapter.id)}>
            <span className="fa-chapter-index">{String(index + 1).padStart(2, "0")}</span>
            <span>
              <strong>{chapter.label}</strong>
              <em>{chapter.subtitle}</em>
            </span>
            <b>{count}</b>
          </button>
        );
      })}
    </nav>
  );
}
