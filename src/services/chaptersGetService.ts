import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';
import { ChapterOutputData } from '@/types/chapters';
import { IQueryParams } from '@/types/common';

// @eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getLatestUpdatedChapters(params: IQueryParams): Promise<ChapterOutputData> {
  const result = await universalFetcher<ChapterOutputData>(END_POINTS.chapters.getLatestUpdatedChapters, {
    queryParams: params,
    config: {
      next: {
        revalidate: 10800,
      },
    },
  });
  return result;
}
