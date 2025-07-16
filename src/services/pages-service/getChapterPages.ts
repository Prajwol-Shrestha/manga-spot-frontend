import { END_POINTS } from '@/constants/endpoints';
import fetcher from '@/lib/fetcher';

export async function getChapterPages(chapterId: string, params?: any, config?: RequestInit) {
  const result = await fetcher(END_POINTS['chapter-pages'].getChapterPages.replace(':chapterId', chapterId), { queryParams:{ ...params}, config });
  return result;
}
