import { END_POINTS } from "@/constants/endpoints";
import universalFetcher from "@/lib/fetcher";
import { IReadingHistory } from "@/types/reading-history";

export async function getReadingHistoryService(config: RequestInit) {
    const data = await universalFetcher(END_POINTS["reading-history"].getReadingHistory, {
        config: config
    })
    return data
}