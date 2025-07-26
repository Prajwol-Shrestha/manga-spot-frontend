import { ContentRating, MangaStatus } from './enums';
import { IMangaTag } from './tag';

export interface IManga {
  id: string;
  type: string;
  title: string;
  description: string;
  lastVolume: string;
  lastChapter: string;
  year: number;
  createdAt: string;
  updatedAt: string;
  status: MangaStatus;
  contentRating: ContentRating;
  tags: IMangaTag[];
  author: string;
  artist: string;
  coverArt: string;
  bookmarkedByMe: boolean;
}

export interface IMangaWithVolume extends IManga {
  volumes: {
    volume: string;
    chapters: {
      chapter: string;
      chapterId: string;
      isUnavilable: boolean;
    };
  }[];
}

export interface IGetMangaResponse {
  data: IManga[];
  limit: number;
  offset: number;
  response: string;
  result: string;
  total: number;
}
