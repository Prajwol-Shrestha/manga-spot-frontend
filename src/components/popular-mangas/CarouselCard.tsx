import { IMangaWithVolume } from '@/types/manga';
import React from 'react';
import Typography from '../ui/Typography';
import { ContentRatingBadge, StatusBadge } from '../CustomBadges/CustomBadges';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import IconButton from '../ui/IconButton';

interface IProps {
  manga: IMangaWithVolume;
  index: number;
}

export default function CarouselCard({ manga, index }: IProps) {
  const { title, description, status, contentRating, tags, coverArt, author } = manga;
  const rank = index + 1;

  return (
    <div className="flex gap-6">
      <div className="h-80 w-80 rounded-md">
        <img src={coverArt} alt={title} className="h-full w-full rounded-md object-cover" />
      </div>
      <div className="h-full flex-1 space-y-3.5 py-4 pr-8">
        <Typography variant={'body1'} className="line-clamp-3 font-semibold">
          {title}
        </Typography>
        <div className="flex flex-wrap items-center gap-2">
          {status && <StatusBadge status={status} />}
          {contentRating && <ContentRatingBadge rating={contentRating} />}
          {tags.map((tag) => (
            <Badge variant="default" key={tag.id}>
              {tag.name}
            </Badge>
          ))}
        </div>
        <Typography variant={'caption'} className="line-clamp-4 text-gray-400">
          {description}
        </Typography>
        <div className="flex items-center gap-2">
          <IconButton
            variant={'default'}
            text="Read Now"
            icon={'system-uicons:book-text'}
            iconPlacement={'left'}
            additionalClassNames="rounded-xl text-secondary-600"
          />
          <IconButton variant={'secondary'} text="Bookmark" icon="material-symbols:bookmark" iconPlacement="right" />
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <Typography variant={'caption'} className="font-semibold">
            {' '}
            {author}{' '}
          </Typography>
          <Typography variant={'caption'} className="font-semibold uppercase">
            No. {rank}
          </Typography>
        </div>
      </div>
    </div>
  );
}
