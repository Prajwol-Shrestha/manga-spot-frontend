import LatestUpdated from "@/components/latest-updated/LatestUpdated";
import PopularMangasCarousel from "@/components/popular-mangas/PopularMangasCarousel";

export default function Home() {
  return <div className="my-12 space-y-8">
    <PopularMangasCarousel />
    <LatestUpdated className="px-8 py-6 bg-secondary-600 rounded-md"/>
  </div>;
}
