import { IMangaWithVolume } from './manga';

export interface IChapterPages {
  result: string;
  count: number;
  data: {
    chapterImages: string[];
    mangaDetails: IMangaWithVolume;
  };
}
