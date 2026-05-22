import { FujiGallery } from "@/components/fuji/FujiGallery";
import { FujiHero } from "@/components/fuji/FujiHero";
import { fujiImages } from "@/data/fuji-images";

export function FujiAtlasPage() {
  const hero = fujiImages.find((image) => image.heroCandidate) ?? fujiImages[0];
  const categories = new Set(
    fujiImages.map((image) => image.category).filter((category) => category !== "uncategorized")
  );
  const heroCandidates = fujiImages.filter((image) => image.heroCandidate).length;
  const digitalTwinFrames = fujiImages.filter((image) => image.category === "fuji-digital-twin").length;
  const uncategorizedCount = fujiImages.filter((image) => image.category === "uncategorized").length;

  return (
    <main className="fa-page">
      <FujiHero
        hero={hero}
        totalFrames={fujiImages.length}
        categoryCount={categories.size}
        heroCandidates={heroCandidates}
        digitalTwinFrames={digitalTwinFrames}
        uncategorizedCount={uncategorizedCount}
      />
      <FujiGallery images={fujiImages} />
    </main>
  );
}
