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
import BookmarkList from './BookmarkList';

export default function BookmarksPage() {


  return (
    <main className="page-container flex flex-1 flex-col">
      <Typography variant="h5" className="mb-6 font-bold">
        Your Bookmarks
      </Typography>


      <BookmarkList />

    </main>
  );
}
