import { END_POINTS } from '@/constants/endpoints';
import fetcher from '@/lib/fetcher';

export async function getAllBookmarks(cookieHeader?: string) {
  const headers: RequestInit = {
    ...(cookieHeader && {
      headers: {
        Cookie: cookieHeader,
      },
    }),
    next: {
      tags: ['bookmarks'],
    },
  };
  const result = await fetcher(END_POINTS.bookmarks.getBookmarks, undefined, headers);
  return result;
}