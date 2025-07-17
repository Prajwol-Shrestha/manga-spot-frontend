import { END_POINTS } from "@/constants/endpoints";
import fetcher from "@/lib/fetcher";
import { IReadingHistory } from "@/types/reading-history";

export async function getReadingHistoryService(config: RequestInit) {
    const data = await fetcher<IReadingHistory[]>(END_POINTS["reading-history"].getReadingHistory, {
        config: config
    })
    return data
}