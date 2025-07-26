import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';
import { IChapterPages } from '@/types/chapter-pages';
import { IQueryParams } from '@/types/common';

export async function getChapterPages(chapterId: string, params?: IQueryParams) {
  const result = await universalFetcher<IChapterPages>(
    END_POINTS.chapters.chapterPages.replace(':chapterId', chapterId),
    {
      queryParams: { ...params },
    }
  );
  return result;
}
