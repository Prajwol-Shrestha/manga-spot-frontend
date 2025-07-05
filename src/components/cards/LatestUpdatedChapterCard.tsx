import React from 'react';
import Typography from '../ui/Typography';
import { ChapterData } from '@/types/chapters';
import Link from 'next/link';
import { getAgo } from '@/lib/date-helper';
import { ContentRatingBadge, StatusBadge } from '../CustomBadges/CustomBadges';

export default function LatestUpdatedChaperCard({ chapter }: { chapter: ChapterData }) {
  const {
    chapter: chapterNumber,
    title,
    createdAt,
    updatedAt,
    manga,
  } = chapter ?? {};


  const {
    title: mangaTitle,
    status,
    contentRating,
    // id: mangaId,
    coverArt,
  } = manga ?? {};

  return (
    <div className="flex gap-4">
      <div className="h-40 w-36 rounded-md">
        <img src={coverArt} alt={mangaTitle} className="h-full w-full rounded-md object-cover" />
      </div>
      <div className="flex-1 py-3">
        <Typography variant={'body2'} className="font-semibold line-clamp-2">
          {mangaTitle}
        </Typography>
        <div className="flex items-center justify-between gap-2 ">
          <Link href={'/'} className="mt-3 hover:underline">
            Chapter {chapterNumber} {title && `- ${title}`}{' '}
          </Link>
          <Typography variant={'caption'}> {getAgo(updatedAt ?? createdAt)}</Typography>
        </div>
        <div className="flex items-center gap-2 mt-3">
          {status && <StatusBadge status={status} />}
          {contentRating && <ContentRatingBadge rating={contentRating} />}
        </div>
      </div>
    </div>
  );
}
