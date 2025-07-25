import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';

export async function getAllBookmarks(queryParams?: Record<string, any>) {
  const result = await universalFetcher(END_POINTS.bookmarks.getBookmarks, {
    queryParams,    
  });
  return result;
}