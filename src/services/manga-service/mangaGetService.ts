import { END_POINTS } from '@/constants/endpoints';
import fetcher from '@/lib/fetcher';
import { IMangaWithVolume } from '@/types/manga';

export async function getRandomManga(config?: RequestInit): Promise<IMangaWithVolume> {
  const result = await fetcher(
    END_POINTS.manga.getRandomManga,
    { includes: ['cover_art'] },
    {
      cache: 'no-cache',
      ...config,
    }
  );
  return result;
}

export async function getMangas(params?: any, config?: RequestInit): Promise<IMangaWithVolume[]> {
  const result = await fetcher(END_POINTS.manga.getMangas, { ...params }, config);
  return result;
}

export async function getMangaById(id: string, params?: any, config?: RequestInit): Promise<IMangaWithVolume> {
  const result = await fetcher(
    END_POINTS.manga.getMangaById.replace(':id', id),
    { ...{ includes: ['cover_art'] }, ...params },
    config
  );
  return result;
}
