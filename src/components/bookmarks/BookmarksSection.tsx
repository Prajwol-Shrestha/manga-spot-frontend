import { getAllBookmarks } from '@/services/bookmarksService';
import { IBookmark, IBookmarkResponse } from '@/types/bookmark';
import React from 'react';
import Typography from '../ui/Typography';
import BookmarkCard from './BookmarkCard';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface IProps {
  className?: string;
}

export default async function BookmarksSection({ className }: IProps) {
  const bookmarkData: IBookmarkResponse = (await getAllBookmarks()) || [];

  const bookmarks: IBookmark[] = bookmarkData.data;
  const isEmpty = bookmarks.length === 0;
  const fiveBookmarks = bookmarks.slice(0, 5);

  return (
    <section className={cn('', className)}>
      <div className="flex items-center justify-between gap-3">
        <Typography variant={'body1'} className="font-bold">
          {' '}
          Bookmarks{' '}
        </Typography>
        <Link href={'/bookmarks'}>
          <Button variant={'link'}>Show All</Button>
        </Link>
      </div>
      <hr />
      <div className="mt-3 space-y-2">
        {isEmpty && <Typography variant={'body2'}>You have no bookmarks yet.</Typography>}
        {fiveBookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.mangaId} bookmark={bookmark} />
        ))}
      </div>
    </section>
  );
}
