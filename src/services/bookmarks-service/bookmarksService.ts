import { END_POINTS } from '@/constants/endpoints';
import fetcher from '@/lib/fetcher';

interface IQueryParams {
  offset: number;
  limit: number;
}

export async function getAllBookmarks(cookieHeader?: string, queryParams?: IQueryParams) {
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