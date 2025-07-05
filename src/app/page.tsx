
// popular titles
// https://api.mangadex.org/manga?includes[]=cover_art&includes[]=artist&includes[]=author&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&hasAvailableChapters=true&createdAtSince=2025-05-30T18%3A15%3A00

import LatestUpdated from "@/components/latest-updated/LatestUpdated";


export default function Home() {
  return <div className="my-12">

    <LatestUpdated className="px-8 py-6 bg-secondary-600 rounded-md"/>
  </div>;
}
