export interface IBookmark {
  coverArt: string;
  createdAt: string;
  mangaId: string;
  title: string;
  userId: string;
}

export interface IBookmarkResponse {
  data: IBookmark[];
  limit: number;
  offset: number;
  total: number;
}
