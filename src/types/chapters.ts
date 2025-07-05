import type { IManga, MangaStatus } from './manga';

// export interface Manga {
//   title: string;
//   description: string;
//   lastVolume: string;
//   lastChapter: string;
//   tags: MangaTag[];
//   year: number;
//   status: string;
//   contentRating: string;
//   createdAt: string;
//     updatedAt: string;
//     id: string;
//     coverArt: string;
//     artist: string;
//     author: string;
// }

export interface ChapterData {
  id: string;
  volume: string | null;
  chapter: string;
  title: string;
  publishAt: string;
  readableAt: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
    manga?: IManga;
    scanlator?: string;
}

export interface ChapterOutputData {
  data: ChapterData[];
  response: string;
  result: string;
  limit: number;
  offset: number;
  total: number;
}
