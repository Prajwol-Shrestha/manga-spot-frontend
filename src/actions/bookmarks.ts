'use server';

import { END_POINTS } from '@/constants/endpoints';
import fetcher from '@/lib/fetcher';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function addBookmark(body: { mangaId: string; coverArt: string; title: string }) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const config: RequestInit = {
    method: 'POST',
    body: JSON.stringify(body),
    ...(cookieHeader && {
      headers: {
        Cookie: cookieHeader
      }
    })
  };
  const result = await fetcher(END_POINTS.bookmarks.addBookmark, {
    config,
  });
  revalidateTag('bookmarks');
  return result;
}

export async function removeBookmark(id: string) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const config: RequestInit = {
    method: 'DELETE',
    headers: {
      Cookie: cookieHeader,
    },
  };
  const result = await fetcher(END_POINTS.bookmarks.removeBookmark.replace(':id', id), undefined, config);
  revalidateTag('bookmarks');
  return result;
}
