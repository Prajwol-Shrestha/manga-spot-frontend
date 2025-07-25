import React from 'react';
import Link from 'next/link';
import Typography from '@/components/ui/Typography';
import { getMangaById } from '@/services/mangaGetService';
import { IMangaWithVolume } from '@/types/manga';
import BookmarkButton from '@/components/Buttons/BookmarkButton';
import { cookies } from 'next/headers';
import NoCoverImage from '@/components/NoData/NoCoverImage';

export default async function MangaDetailsPage({ params }: { params: Promise<{ mangaId: string }> }) {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  const isLoggedIn = cookieStore.get('accessToken')

  const config: RequestInit = {
    ...(cookieHeader && {
      headers: {
        Cookie: cookieHeader,
      },
    }),
  };

  const { mangaId } = await params;
  const mangaData: IMangaWithVolume = await getMangaById(mangaId, undefined, config);

  const groupTags = (group: string) => mangaData.tags.filter((tag) => tag.group === group);

  const chapters = mangaData.volumes.flatMap((v) => v.chapters);


  return (
    <main className="page-container max-w-5xl space-y-10 px-4 py-12">
      {/* Title & Meta */}
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Cover */}
        <div className="mx-auto w-full max-w-xs md:mx-0">
          <div className="aspect-[3/4] overflow-hidden rounded-lg border border-gray-300 bg-gray-100 shadow dark:border-gray-700">
            {mangaData.coverArt ? (
              <img
                src={mangaData.coverArt}
                alt={mangaData.title}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
                <NoCoverImage />
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <Typography variant="h6" className="line-clamp-2 font-bold">
            {mangaData.title}
          </Typography>
          <div>
            <Typography variant="body2" className="text-muted-foreground line-clamp-2 whitespace-pre-line">
              {mangaData.description}
            </Typography>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <strong>Status:</strong> {mangaData.status}
            </div>
            <div>
              <strong>Year:</strong> {mangaData.year}
            </div>
            <div>
              <strong>Chapters:</strong> {mangaData.lastChapter}
            </div>
            <div>
              <strong>Volumes:</strong> {mangaData.lastVolume}
            </div>
            <div>
              <strong>Rating:</strong> {mangaData.contentRating}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-4 space-y-2">
            {['genre', 'theme', 'format'].map((group) => {
              const tags = groupTags(group);
              return (
                tags.length > 0 && (
                  <div key={group}>
                    <Typography variant="body2" className="font-semibold capitalize">
                      {group}
                    </Typography>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              );
            })}
          </div>

          {isLoggedIn && (
            <BookmarkButton type="button" manga={mangaData} />
          )}
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-4">
        <Typography variant="h5" className="font-semibold">
          Chapters
        </Typography>
        <div className="flex gap-3 flex-wrap">
          {chapters.map((ch) => (
            <div key={ch.chapterId} className="space-y-2">
              <Link
                key={ch.chapterId}
                href={`/manga/${mangaId}/chapter/${ch.chapterId}`}
                className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Chapter {ch.chapter}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
