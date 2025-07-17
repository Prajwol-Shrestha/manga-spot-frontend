import { END_POINTS } from '@/constants/endpoints';
import fetcher from '@/lib/fetcher';
import { IChapterPages } from '@/types/chapter-pages';

export async function getChapterPages(chapterId: string, params?: any, config?: RequestInit) {
  const result = await fetcher<IChapterPages>(END_POINTS['chapter-pages'].getChapterPages.replace(':chapterId', chapterId), { queryParams:{ ...params}, config });
  return result;
}
