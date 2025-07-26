import { getReadingHistoryService } from '@/services/readingHistoryService';
import Link from 'next/link';
import React from 'react';

export default async function ReadingHistoryPage() {
  const readingHistory = await getReadingHistoryService();

  return (
    <main className="page-container px-4">
      <h1 className="mb-6 text-2xl font-semibold">📖 Reading History</h1>

      {readingHistory.length === 0 ? (
        <p className="text-gray-500">No reading history found.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-3 md:grid-cols-4">
          {readingHistory.map((item) => (
            <li key={item.chapterId} className="overflow-hidden rounded-xl border shadow transition hover:shadow-lg">
              <Link href={`/manga/${item.mangaId}/chapter/${item.chapterId}`}>
                <div className="relative h-46 w-full">
                  <img src={item.coverArt} alt={item.title} className="object-cover" />
                </div>
                <div className="p-4">
                  <h2 className="truncate text-lg font-medium">{item.title}</h2>
                  <p className="mt-1 text-sm text-gray-600">Chapter {item.chapterNumber}</p>
                  <p className="mt-2 text-xs text-gray-400">Last read: {new Date(item.updatedAt).toLocaleString()}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
