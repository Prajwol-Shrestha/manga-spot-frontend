import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';
import { ChapterOutputData } from '@/types/chapters';

// @eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getLatestUpdatedChapters(params: Record<string, any>): Promise<ChapterOutputData> {
  const result = await universalFetcher(END_POINTS.chapters.getLatestUpdatedChapters, {
    queryParams: params,
    config: {
      next: {
        revalidate: 10800,
      },
    },
  });
  return result;
}
