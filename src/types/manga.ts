export enum MangaStatus {
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  HIATUS = 'hiatus',
}

export enum ContentRating {
  SAFE = 'safe',
  SUGGESTIVE = 'suggestive',
  EROTICA = 'erotica',
  PORNOGRAPHIC = 'pornographic',
}

export interface IMangaTag {
  id: string;
  type: string;
  group: string;
  name: string;
  description?: string;
}

export interface IManga {
  id: string;
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

export interface IChapterInfo {
  chapter: string;
  id: string;
  isUnavailable: boolean;
  others: string[];
  count: number;
}

export interface IVolumeInfo {
  volume: string;
  count: number;
  chapters: Record<string, IChapterInfo>;
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


export interface IGetMangaResponse{
  data: IManga[];
  limit: number;
  offset: number;
  response: string;
  result: string;
  total: number;
}