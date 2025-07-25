import { END_POINTS } from '@/constants/endpoints';
import universalFetcher from '@/lib/fetcher';
import { IGetMangaResponse, IMangaWithVolume } from '@/types/manga';

export async function getRandomManga(config?: RequestInit): Promise<IMangaWithVolume> {
  const result = await universalFetcher(END_POINTS.manga.getRandomManga, {
    queryParams: { includes: ['cover_art'] },
    config: { cache: 'no-cache', ...config },
  });
  return result;
}

export async function getMangas(params?: any, config?: RequestInit): Promise<IGetMangaResponse> {
  const result = await universalFetcher(END_POINTS.manga.getMangas, {
    queryParams: { ...params, ...{ includes: ['cover_art'] } },
    config,
  });
  return result;
}

export async function getMangaById(id: string, params?: any, config?: RequestInit): Promise<IMangaWithVolume> {
  const result = await universalFetcher(END_POINTS.manga.getMangaById.replace(':id', id), {
    queryParams: { ...{ includes: ['cover_art'] }, ...params },
    config,
  });
  return result;
}
