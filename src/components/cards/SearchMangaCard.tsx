import { isLoggedIn } from '@/stores/authStore';
import BookmarkButton from '../Buttons/BookmarkButton';
import Typography from '../ui/Typography';
import Link from 'next/link';

interface Manga {
  id: string;
  title: string;
  description: string;
  year: number;
  status: string;
  author: string;
  artist: string;
  coverArt: string;
  bookmarkedByMe: boolean;
  contentRating: string;
}

export default function SearchMangaCard({ manga }: { manga: Manga }) {
  const isSignedIn = isLoggedIn()
  return (
    <div className="flex max-w-xl gap-4 rounded-2xl bg-white p-4 shadow-md dark:bg-zinc-900">
      <img
        src={manga.coverArt.trim()}
        alt={manga.title}
        className="h-44 w-32 rounded-lg border border-gray-300 object-cover"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Link href={`/manga/${manga.id}`}>
          <Typography variant={'body1'} className="line-clamp-2 font-semibold">{manga.title}</Typography>
          </Link>
          <Typography variant={'caption'} className="mb-1 text-zinc-500">
            {manga.author} • {manga.year} • {manga.status}
          </Typography>
          <Typography variant={'caption'} className="line-clamp-3 text-zinc-600 dark:text-zinc-300 break-all">{manga.description}</Typography>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="rounded-full bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-700">{manga.contentRating}</span>
          {isSignedIn && (
            <BookmarkButton type="icon" manga={manga} />
          )}
        </div>
      </div>
    </div>
  );
}
