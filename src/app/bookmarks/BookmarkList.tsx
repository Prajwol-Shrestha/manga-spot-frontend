'use client';

import React from 'react';
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
import { useState } from 'react';
import useBookmarks from '@/hooks/useBookmarks';

const LIMIT = 15;

export default function BookmarkList() {
  const [page, setPage] = useState(1);
  const queryParms = {
    limit: LIMIT,
    offset: (page - 1) * LIMIT,
  };

  const { isLoading, bookmarks, totalCount, isEmpty } = useBookmarks(queryParms);
  const totalPages = Math.ceil(totalCount! / LIMIT) || 0;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setPage(page);
  };

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
