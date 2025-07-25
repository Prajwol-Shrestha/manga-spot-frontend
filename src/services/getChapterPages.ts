import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';

export async function getChapterPages(chapterId: string, params?: any, config?: RequestInit) {
  const result = await universalFetcher(END_POINTS.chapters.chapterPages.replace(':chapterId', chapterId), {
    queryParams: { ...params },
    config,
  });
  return result;
}
