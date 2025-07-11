export enum MangaStatus {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  HIATUS = 'Hiatus',
}

export enum ContentRating {
  SAFE = 'Safe',
  SUGGESTIVE = 'Suggestive',
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
