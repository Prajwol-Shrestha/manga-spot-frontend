export interface IMangaTag {
  id: string;
  type: string;
  group: string;
  name: string;
  description?: string;
}

export interface ITagsGetResponse{
  data: Record<string, IMangaTag[]>;
  limit: number;
  offset: number;
  response: string;
  result: string;
  total: number;
}