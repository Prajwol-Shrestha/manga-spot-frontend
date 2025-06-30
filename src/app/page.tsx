
// popular titles
// https://api.mangadex.org/manga?includes[]=cover_art&includes[]=artist&includes[]=author&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&hasAvailableChapters=true&createdAtSince=2025-05-30T18%3A15%3A00

// latest updated
// https://api.mangadex.org/chapter?limit=32&offset=0&includes[]=user&includes[]=scanlation_group&includes[]=manga&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[readableAt]=desc

export default function Home() {
  return <div className="min-h-[200vh]"></div>;
}
