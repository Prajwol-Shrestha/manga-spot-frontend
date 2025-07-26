import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';
import { ITagsGetResponse } from '@/types/tag';

export async function getAllTags() {
  const data = await universalFetcher<ITagsGetResponse>(END_POINTS.tags.getAlltags);
  return data;
}
