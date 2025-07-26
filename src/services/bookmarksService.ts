import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';
import { IBookmarkResponse } from '@/types/bookmark';
import { IQueryParams } from '@/types/common';

export async function getAllBookmarks(queryParams?: IQueryParams) {
  const result = await universalFetcher<IBookmarkResponse>(END_POINTS.bookmarks.getBookmarks, {
    queryParams,
  });
  return result;
}
