import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';
import { IReadingHistory } from '@/types/reading-history';

export async function getReadingHistoryService() {
  const data = await universalFetcher<IReadingHistory[]>(END_POINTS['reading-history'].getReadingHistory);
  return data;
}
