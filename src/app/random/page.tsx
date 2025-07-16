import { cookies } from 'next/headers';
import Link from 'next/link';
import { getRandomManga } from '@/services/manga-service/mangaGetService';

import Typography from '@/components/ui/Typography';
import IconButton from '@/components/ui/IconButton';
import Tag from '@/components/Tag/Tag';
import BookmarkButton from '@/components/Buttons/BookmarkButton';
import Description from './Description';
import NoCoverImage from '@/components/NoData/NoCoverImage';

export default async function Page() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const isLoggedIn = cookieStore.get('accessToken')

  const config: RequestInit = {
    ...(cookieHeader && {
      headers: {
        Cookie: cookieHeader,
      },
    }),
  };

  const data = await getRandomManga(config);
  const {
    id,
    title,
    description,
    tags,
    coverArt,
    lastVolume,
    lastChapter,
    year,
    status,
    contentRating,
    author,
    artist,
  } = data ?? {};

  return (
    <main className="page-container relative bg-[url('/assets/hero-bg.jpg')] bg-cover bg-center py-10">
      <div className="container mx-auto max-w-6xl rounded-xl bg-black/70 p-6 backdrop-blur-md shadow-lg text-white">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* LEFT: COVER */}
          
          <div className="w-full overflow-hidden rounded-lg shadow-md aspect-[2/3] bg-gray-800">
            {coverArt ? (
              <img
                src={coverArt}
                alt={title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (<NoCoverImage />)}
          </div>

          {/* RIGHT: DETAILS */}
          <div className="col-span-2 flex flex-col gap-4">
            {/* Title */}
            <Typography variant="h4" className="font-bold">
              {title}
            </Typography>

            {/* Metadata */}
            <div className="text-sm text-gray-300 flex flex-wrap gap-3">
              {year && <span>📅 {year}</span>}
              {status && <span>📖 {status}</span>}
              {contentRating && <span>🔞 {contentRating}</span>}
              {lastVolume && <span>📚 Vol. {lastVolume}</span>}
              {lastChapter && <span>📄 Ch. {lastChapter}</span>}
              {author && <span>✍️ Author: {author}</span>}
              {artist && <span>🎨 Artist: {artist}</span>}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Link href={`/manga/${id}`} target="_blank">
                <IconButton
                  variant="default"
                  text="Read Now"
                  icon="system-uicons:book-text"
                  iconPlacement="left"
                  additionalClassNames="rounded-md bg-primary hover:bg-primary/80"
                />
              </Link>
              {isLoggedIn && (
                <BookmarkButton type="button" manga={data} />
              )}
            </div>

            {/* Tags */}
            {tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag tag={tag} key={tag.id} />
                ))}
              </div>
            )}

            {/* Description */}
            <Description desc={description} />
          </div>
        </div>
      </div>
    </main>
  );
}
