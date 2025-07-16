import LatestUpdated from '@/components/latest-updated/LatestUpdated';
import PopularMangasCarousel from '@/components/popular-mangas/PopularMangasCarousel';

export default function Home() {
  return (
    <main className="page-container space-y-8">
      <PopularMangasCarousel />
      <LatestUpdated className="bg-background rounded-md px-8 py-6" />
    </main>
  );
}
