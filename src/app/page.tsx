import { FujiGallery } from "@/components/fuji-gallery";
import { galleryItems, galleryStats } from "@/data/gallery";

export default function Home() {
  return <FujiGallery items={galleryItems} stats={galleryStats} />;
}
