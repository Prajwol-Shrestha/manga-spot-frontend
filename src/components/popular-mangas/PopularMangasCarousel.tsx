import { getMangas } from '@/services/manga-service/mangaGetService';
import dayjs from 'dayjs';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/Carousel';
import CarouselCard from './CarouselCard';
import Autoplay from 'embla-carousel-autoplay';

// popular titles
// https://api.mangadex.org/manga?includes[]=cover_art&includes[]=artist&includes[]=author&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&hasAvailableChapters=true&createdAtSince=2025-05-30T18%3A15%3A00

const queryParams = {
  includes: ['cover_art', 'artist', 'author'],
  order: {
    followedCount: 'desc',
  },
  contentRating: ['safe', 'suggestive'],
  hasAvailableChapters: true,
  createdAtSince: dayjs().subtract(4, 'month').format('YYYY-MM-DDTHH:mm:ss'),
};
export default async function PopularMangasCarousel() {
  const data = await getMangas(queryParams);
  const popularMangas = data?.data || [];

  return (
    <div className="container px-6">
      <Carousel
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {popularMangas?.map((manga, index: number) => (
            <CarouselItem key={manga.id}>
              {' '}
              <CarouselCard manga={manga} index={index} />{' '}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
