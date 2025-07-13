import { cleanObj } from '@/lib/utils';
import { getMangas } from '@/services/manga-service/mangaGetService';
import { IGetMangaResponse } from '@/types/manga';
import { useEffect, useState } from 'react';

export default function useMangas(filters: Record<string, any> = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [mangaData, setMangaData] = useState<IGetMangaResponse | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchManga = async () => {
      const cleanedFilters = cleanObj(filters);
      const result = await getMangas(cleanedFilters);
      setIsLoading(false);
      setMangaData(result);
    };
    fetchManga();
  }, [...Object.values(filters)]);

  const mangas = mangaData?.data || [];
  const isEmpty = mangaData?.total === 0;
  const totalCount = mangaData?.total

  return { isLoading, mangas, isEmpty, totalCount };
}
