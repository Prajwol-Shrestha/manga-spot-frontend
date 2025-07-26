import type { IManga } from './manga';

export interface ChapterData {
  id: string;
  mangaId: string;
  title: string;
  volume: string | null;
  chapter: string;
  publishAt: string;
  readableAt: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
  scanlator?: string;
  manga?: IManga;
}

export interface ChapterOutputData {
  data: ChapterData[];
  response: string;
  result: string;
  limit: number;
  offset: number;
  total: number;
}
