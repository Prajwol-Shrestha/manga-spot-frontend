'use client';

import React from 'react';
import { getAllBookmarks } from '@/services/bookmarks-service/bookmarksService';
import { IBookmarkResponse } from '@/types/bookmark';
import Typography from '@/components/ui/Typography';
import BookmarkCard from '@/components/bookmarks/BookmarkCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';
import { useEffect, useState } from 'react';

const LIMIT = 15;

export default function BookmarkList() {
  const [bookmarksData, setBookmarksData] = useState<IBookmarkResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(1);

  const totalCount = bookmarksData?.total;
  const totalPages = Math.ceil(totalCount! / LIMIT) || 0;

  const queryParms = {
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setPage(page);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchBookmarks = async () => {
      const result = await getAllBookmarks(undefined, queryParms);
      setIsLoading(false);
      setBookmarksData(result);
    };
    fetchBookmarks();
  }, [page]);

  const isEmpty = bookmarksData?.data.length === 0;
  const bookmarks = bookmarksData?.data || [];

  return (
    <>
      {isLoading && <Typography variant="body1">Loading...</Typography>}
      {isEmpty && !isLoading && (
        <Typography variant="body1" className="text-muted-foreground italic">
          You haven’t bookmarked any manga yet.
        </Typography>
      )}
      {!isEmpty && !isLoading && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {bookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.mangaId} bookmark={bookmark} />
            ))}
          </div>
          <div className="relative mt-auto">
            <Typography variant="caption" className="absolute top-2 right-0">
              Showing results for page {page} of {totalPages}
            </Typography>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
                </PaginationItem>
                {new Array(totalPages).fill(0).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink onClick={() => handlePageChange(index + 1)}>{index + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => handlePageChange(page + 1)} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </>
  );
}
