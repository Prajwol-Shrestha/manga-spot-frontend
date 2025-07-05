import { getLatestUpdatedChapters } from '@/services/chapters-service/chaptersGetService';
import React from 'react';
import Typography from '../ui/Typography';
import { cn } from '@/lib/utils';
import LatestUpdatedChaperCard from '../cards/LatestUpdatedChapterCard';

// latest updated
// https://api.mangadex.org/chapter?limit=32&offset=0&includes[]=user&includes[]=scanlation_group&includes[]=manga&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[readableAt]=desc

const queryParams = {
  limit: 32,
  offset: 0,
  includes: ['user', 'scanlation_group', 'manga'],
  contentRating: ['safe', 'suggestive', 'erotica'],
  order: {
    readableAt: 'desc',
  },
};

interface IProps {
  className?: string;
}
export default async function LatestUpdated({ className }: IProps) {
  const latestDatas = await getLatestUpdatedChapters(queryParams);
  const latestUpdatedMangas = latestDatas?.data || [];

  return (
    <section className={cn('', className)}>
      <div>
        <Typography variant={'body1'} className="font-bold">
          {' '}
          Latest Updates{' '}
        </Typography>
      </div>
      <hr />
      <div className="my-8 grid grid-cols-1 gap-x-16 gap-y-6 sm:grid-cols-2">
        {latestUpdatedMangas.map((chapter) => (
          <LatestUpdatedChaperCard key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </section>
  );
}
