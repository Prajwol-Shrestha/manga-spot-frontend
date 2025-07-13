import { END_POINTS } from '@/constants/endpoints';
import fetcher from '@/lib/fetcher';

export async function getAllBookmarks(cookieHeader?: string, queryParams?: Record<string, any>) {
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
  const result = await fetcher(END_POINTS.bookmarks.getBookmarks, queryParams, headers);
  return result;
}