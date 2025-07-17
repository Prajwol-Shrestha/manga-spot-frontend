import { getReadingHistoryService } from '@/services/reading-history-service/readingHistoryService'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

export default async function ReadingHistoryPage() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  const config = {
    ...(cookieHeader && {
      headers: {
        Cookie: cookieHeader,
      },
    }),
  }

  const readingHistory = await getReadingHistoryService(config)

  return (
    <main className="page-container px-4">
      <h1 className="text-2xl font-semibold mb-6">📖 Reading History</h1>

      {readingHistory.length === 0 ? (
        <p className="text-gray-500">No reading history found.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-3 md:grid-cols-4">
          {readingHistory.map((item) => (
            <li
              key={item.chapterId}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <Link href={`/manga/${item.mangaId}/chapter/${item.chapterId}`}>
                <div className="relative w-full h-46">
                  <img
                    src={item.coverArt}
                    alt={item.title}
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-medium truncate">{item.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Chapter {item.chapterNumber}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Last read: {new Date(item.updatedAt).toLocaleString()}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
