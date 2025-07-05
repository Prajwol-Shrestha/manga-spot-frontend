import { END_POINTS } from '@/constants/endpoints';
import fetcher from '@/lib/fetcher';
import { ChapterOutputData } from '@/types/chapters';

// @eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getLatestUpdatedChapters(params: Record<string, any>): Promise<ChapterOutputData> {
  const result = await fetcher(
    END_POINTS.manga.getLatestUpdatedChapters,
    { ...params },
    {
      next: {
        revalidate: 10800,
      },
    }
  );
  return result;
}
