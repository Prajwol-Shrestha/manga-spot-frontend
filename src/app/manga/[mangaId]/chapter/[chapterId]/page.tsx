import Typography from '@/components/ui/Typography';
import { getChapterPages } from '@/services/getChapterPages';
import { IChapterPages } from '@/types/chapter-pages';
import { IMangaWithVolume } from '@/types/manga';
import React from 'react';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ mangaId: string; chapterId: string }> }) {
  const { mangaId, chapterId } = await params;
  const chapterResponse: IChapterPages = await getChapterPages(chapterId, {
    mangaId: mangaId,
  });

  const images = chapterResponse.data.chapterImages || [];
  const mangaData: IMangaWithVolume = chapterResponse.data.mangaDetails;

  const chapters = mangaData.volumes.flatMap((v) => v.chapters);
  const currentChapter = chapters.find((ch) => ch.chapterId === chapterId);

  const currentIndex = chapters.findIndex((ch) => ch.chapterId === chapterId);
  const prevChapter = chapters[currentIndex - 1];
  const nextChapter = chapters[currentIndex + 1];

  return (
    <main className="page-container max-w-3xl px-4 py-12">
      {/* Header */}
      <div className="mb-10 space-y-1 text-center">
        <Typography variant="h6" className="font-bold">
          {mangaData.title}
        </Typography>
        {currentChapter && (
          <Typography variant="h6" className="text-gray-700">{`Chapter ${currentChapter.chapter}`}</Typography>
        )}
        <Typography variant="body2" className="text-muted-foreground">
          {images.length} pages
        </Typography>
      </div>

      {/* Manga Pages */}
      <div className="mx-auto max-w-[600px] space-y-3">
        {images.map((page, index) => (
          <div key={page} className="overflow-hidden rounded-md border border-gray-200 shadow dark:border-gray-700">
            <img
              src={page}
              alt={`Page ${index + 1}`}
              className="h-auto w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Footer / Navigation */}
      <div className="mt-12 space-y-6 text-center">
        <Typography variant="body2" className="text-muted-foreground">
          -- END OF CHAPTER --
        </Typography>

        <div className="flex flex-wrap justify-center gap-4">
          {prevChapter && (
            <Link
              href={`/manga/${mangaId}/chapter/${prevChapter.chapterId}`}
              className="rounded bg-gray-100 px-4 py-2 text-sm transition hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              ← Previous Chapter
            </Link>
          )}
          <Link
            href={`/manga/${mangaId}`}
            className="rounded bg-blue-100 px-4 py-2 text-sm transition hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800"
          >
            📚 Back to Manga
          </Link>
          {nextChapter && (
            <Link
              href={`/manga/${mangaId}/chapter/${nextChapter.chapterId}`}
              className="rounded bg-gray-100 px-4 py-2 text-sm transition hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Next Chapter →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
