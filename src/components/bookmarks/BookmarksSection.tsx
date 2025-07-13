import { getAllBookmarks } from '@/services/bookmarks-service/bookmarksService';
import {IBookmark, IBookmarkResponse} from '@/types/bookmark';
import { cookies } from 'next/headers';
import React from 'react';
import Typography from '../ui/Typography';
import BookmarkCard from './BookmarkCard';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';


interface IProps{
  className?: string
}

export default async function BookmarksSection({className}: IProps) {
  const cookieStore = cookies();
  const cookieHeader = (await cookieStore).toString();
  const bookmarkData: IBookmarkResponse = (await getAllBookmarks(cookieHeader)) || [];

  const bookmarks: IBookmark[] = bookmarkData.data;
  const isEmpty = bookmarks.length === 0;
  const fiveBookmarks = bookmarks.slice(0, 5);

  return (
    <section className={cn('', className)}>
      <div className='flex items-center justify-between gap-3'>
        <Typography variant={'body1'} className="font-bold">
          {' '}
          Bookmarks{' '}
        </Typography>
        <Button variant={'link'}>
          Show All
        </Button>
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
