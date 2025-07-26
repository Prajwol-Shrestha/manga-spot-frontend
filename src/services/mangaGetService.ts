import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';
import { IQueryParams } from '@/types/common';
import { IGetMangaResponse, IMangaWithVolume } from '@/types/manga';

export async function getRandomManga(): Promise<IMangaWithVolume> {
  const result = await universalFetcher<IMangaWithVolume>(END_POINTS.manga.getRandomManga, {
    queryParams: { includes: ['cover_art'] },
    config: { cache: 'no-cache' },
  });
  return result;
}

export async function getMangas(params?: IQueryParams): Promise<IGetMangaResponse> {
  const result = await universalFetcher<IGetMangaResponse>(END_POINTS.manga.getMangas, {
    queryParams: { ...params, ...{ includes: ['cover_art'] } },
  });
  return result;
}

export async function getMangaById(id: string, params?: IQueryParams): Promise<IMangaWithVolume> {
  const result = await universalFetcher<IMangaWithVolume>(END_POINTS.manga.getMangaById.replace(':id', id), {
    queryParams: { ...{ includes: ['cover_art'] }, ...params },
  });
  return result;
}
