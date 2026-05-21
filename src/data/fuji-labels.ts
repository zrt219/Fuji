import type { FujiImage } from "./fuji-images";

export type FujiMetaField =
  | "locationFamily"
  | "visualSystem"
  | "mood"
  | "palette"
  | "timeOfDay"
  | "composition"
  | "useCase";

export const fujiFieldLabelMap: Record<FujiMetaField, string> = {
  locationFamily: "Location family",
  visualSystem: "Visual system",
  mood: "Mood",
  palette: "Palette",
  timeOfDay: "Time of day",
  composition: "Composition",
  useCase: "Use case"
};

export const fujiLocationFamilyLabelMap: Record<FujiImage["locationFamily"], string> = {
  "mount-fuji": "Mount Fuji",
  "fuji-five-lakes": "Fuji Five Lakes",
  tokyo: "Tokyo",
  "kyoto-shrine": "Kyoto shrine",
  "mountain-temple": "Mountain temple",
  "rural-japan": "Rural Japan",
  "heritage-art": "Heritage art",
  unknown: "Unknown"
};

export const fujiVisualSystemLabelMap: Record<FujiImage["visualSystem"], string> = {
  "natural-landscape": "Natural landscape",
  "sacred-architecture": "Sacred architecture",
  "urban-neon": "Urban neon",
  "cyber-physical": "Cyber-physical",
  agriculture: "Agriculture",
  pastoral: "Pastoral",
  heritage: "Heritage"
};

export const fujiMoodLabelMap: Record<FujiImage["mood"], string> = {
  calm: "Calm",
  cinematic: "Cinematic",
  sacred: "Sacred",
  electric: "Electric",
  mysterious: "Mysterious",
  premium: "Premium",
  pastoral: "Pastoral",
  technical: "Technical"
};

export const fujiPaletteLabelMap: Record<FujiImage["palette"], string> = {
  blue: "Blue",
  gold: "Gold",
  orange: "Orange",
  green: "Green",
  red: "Red",
  purple: "Purple",
  neutral: "Neutral",
  mixed: "Mixed"
};

export const fujiTimeOfDayLabelMap: Record<FujiImage["timeOfDay"], string> = {
  day: "Day",
  sunrise: "Sunrise",
  sunset: "Sunset",
  "blue-hour": "Blue hour",
  night: "Night",
  unknown: "Unknown"
};

export const fujiCompositionLabelMap: Record<FujiImage["composition"], string> = {
  "wide-landscape": "Wide landscape",
  "mountain-center": "Mountain center",
  "lake-reflection": "Lake reflection",
  "street-depth": "Street depth",
  "architectural-corridor": "Architectural corridor",
  "field-perspective": "Field perspective",
  cloudscape: "Cloudscape",
  "people-overlook": "People overlook",
  "heritage-frame": "Heritage frame"
};

export const fujiUseCaseLabelMap: Record<FujiImage["useCase"], string> = {
  hero: "Hero",
  "section-background": "Section background",
  "gallery-card": "Gallery card",
  "portfolio-case-study": "Portfolio case study",
  "ai-system-visual": "AI system visual",
  "transition-frame": "Transition frame"
};

export function formatFujiMetaValue(field: FujiMetaField, value: string) {
  switch (field) {
    case "locationFamily":
      return fujiLocationFamilyLabelMap[value as FujiImage["locationFamily"]];
    case "visualSystem":
      return fujiVisualSystemLabelMap[value as FujiImage["visualSystem"]];
    case "mood":
      return fujiMoodLabelMap[value as FujiImage["mood"]];
    case "palette":
      return fujiPaletteLabelMap[value as FujiImage["palette"]];
    case "timeOfDay":
      return fujiTimeOfDayLabelMap[value as FujiImage["timeOfDay"]];
    case "composition":
      return fujiCompositionLabelMap[value as FujiImage["composition"]];
    case "useCase":
      return fujiUseCaseLabelMap[value as FujiImage["useCase"]];
    default:
      return String(value);
  }
}
