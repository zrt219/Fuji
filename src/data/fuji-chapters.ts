import type { FujiCategory } from "./fuji-images";

export type FujiChapterId = FujiCategory | "all";

export const fujiChapters: Array<{ id: FujiChapterId; label: string; subtitle: string }> = [
  {
    id: "all",
    label: "All Frames",
    subtitle: "The complete Fuji / Japan visual archive"
  },
  {
    id: "fuji-five-lakes",
    label: "Five Lakes",
    subtitle: "Mount Fuji across water, mist, and reflection"
  },
  {
    id: "fuji-golden-reflection",
    label: "Golden Reflections",
    subtitle: "Sunrise, sunset, and mirror-light Fuji"
  },
  {
    id: "fuji-blue-night",
    label: "Blue Night",
    subtitle: "Nocturnal Fuji, stars, lake lights, deep atmosphere"
  },
  {
    id: "fuji-digital-twin",
    label: "Digital Twin Fuji",
    subtitle: "Cyber-physical landscapes, sensors, RAG overlays, data fields"
  },
  {
    id: "fuji-rural-agritech",
    label: "AgriTech Fuji",
    subtitle: "Smart farms, fields, data lines, rural systems"
  },
  {
    id: "fuji-pastoral-fields",
    label: "Pastoral Fuji",
    subtitle: "Barns, cows, open fields, countryside calm"
  },
  {
    id: "fuji-floral-fields",
    label: "Floral Fuji",
    subtitle: "Lavender, spring fields, purple foregrounds, seasonal color"
  },
  {
    id: "fuji-sea-of-clouds",
    label: "Sea of Clouds",
    subtitle: "Observation decks, cloud oceans, cinematic altitude"
  },
  {
    id: "japan-torii-shrine",
    label: "Torii Paths",
    subtitle: "Red shrine gates, sacred corridors, lantern light"
  },
  {
    id: "japan-temple-mountain",
    label: "Mountain Temples",
    subtitle: "Stone paths, old wood, sacred forest architecture"
  },
  {
    id: "tokyo-neon-crossing",
    label: "Tokyo Crossing",
    subtitle: "Rain, neon, crowds, signage, city energy"
  },
  {
    id: "tokyo-lantern-alley",
    label: "Lantern Alleys",
    subtitle: "Narrow restaurants, wet pavement, red lantern glow"
  },
  {
    id: "tokyo-backstreet",
    label: "Backstreets",
    subtitle: "Residential alleys, utility lines, quiet urban texture"
  },
  {
    id: "japan-heritage-art",
    label: "Heritage Art",
    subtitle: "Japanese print-inspired visual history"
  }
];

export const fujiCategoryLabelMap = Object.fromEntries(
  fujiChapters
    .filter((chapter): chapter is { id: FujiCategory; label: string; subtitle: string } => chapter.id !== "all")
    .map((chapter) => [chapter.id, chapter.label])
) as Record<FujiCategory, string>;

export const fujiCategorySubtitleMap = Object.fromEntries(
  fujiChapters
    .filter((chapter): chapter is { id: FujiCategory; label: string; subtitle: string } => chapter.id !== "all")
    .map((chapter) => [chapter.id, chapter.subtitle])
) as Record<FujiCategory, string>;
