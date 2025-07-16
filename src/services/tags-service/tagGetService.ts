import { END_POINTS } from "@/constants/endpoints";
import fetcher from "@/lib/fetcher";
import { ITagsGetResponse } from "@/types/tag";

export async function getAllTags() {
    const data = await fetcher<ITagsGetResponse>(END_POINTS.tags.getAlltags)
    return data
}