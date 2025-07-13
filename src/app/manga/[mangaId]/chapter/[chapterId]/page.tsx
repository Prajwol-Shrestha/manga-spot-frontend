import Typography from '@/components/ui/Typography';
import { getMangaById } from '@/services/manga-service/mangaGetService';
import { getChapterPages } from '@/services/pages-service/getChapterPages';
import { IChapterPages } from '@/types/chapter-pages';
import { IMangaWithVolume } from '@/types/manga';
import React from 'react';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ mangaId: string; chapterId: string }> }) {
  const { mangaId, chapterId } = await params;

  const mangaData: IMangaWithVolume = await getMangaById(mangaId);

  const chapters = mangaData.volumes.flatMap((v) => v.chapters);
  const currentChapter = chapters.find((ch) => ch.chapterId === chapterId);

  const currentIndex = chapters.findIndex((ch) => ch.chapterId === chapterId);
  const prevChapter = chapters[currentIndex - 1];
  const nextChapter = chapters[currentIndex + 1];

  const data: IChapterPages = await getChapterPages(chapterId);
  const pages = data.images || [];

  return (
    <main className="page-container max-w-3xl px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center space-y-1">
        <Typography variant="h6" className="font-bold">
          {mangaData.title}
        </Typography>
        {currentChapter && (
          <Typography variant="h6" className="text-gray-700">{`Chapter ${currentChapter.chapter}`}</Typography>
        )}
        <Typography variant="body2" className="text-muted-foreground">
          {pages.length} pages
        </Typography>
      </div>

      {/* Manga Pages */}
      <div className="space-y-3 max-w-[600px] mx-auto">
        {pages.map((page, index) => (
          <div
            key={page}
            className="overflow-hidden rounded-md shadow border border-gray-200 dark:border-gray-700"
          >
            <img
              src={page}
              alt={`Page ${index + 1}`}
              className="w-full h-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Footer / Navigation */}
      <div className="mt-12 text-center space-y-6">
        <Typography variant="body2" className="text-muted-foreground">
          -- END OF CHAPTER --
        </Typography>

        <div className="flex justify-center gap-4 flex-wrap">
          {prevChapter && (
            <Link
              href={`/manga/${mangaId}/chapter/${prevChapter.chapterId}`}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm rounded transition"
            >
              ← Previous Chapter
            </Link>
          )}
          <Link
            href={`/manga/${mangaId}`}
            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-sm rounded transition"
          >
            📚 Back to Manga
          </Link>
          {nextChapter && (
            <Link
              href={`/manga/${mangaId}/chapter/${nextChapter.chapterId}`}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-sm rounded transition"
            >
              Next Chapter →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
