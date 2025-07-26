'use server';

import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';
import { IBookmark } from '@/types/bookmark';
import { revalidateTag } from 'next/cache';

export async function addBookmark(body: { mangaId: string; coverArt: string; title: string }) {
  const config: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
  };
  const result = await universalFetcher<IBookmark>(END_POINTS.bookmarks.addBookmark, {
    config,
  });
  revalidateTag('bookmarks');
  return result;
}

export async function removeBookmark(id: string) {
  const config: RequestInit = {
    method: 'DELETE',
  };
  const result = await universalFetcher<IBookmark>(END_POINTS.bookmarks.removeBookmark.replace(':id', id), { config });
  revalidateTag('bookmarks');
  return result;
}
