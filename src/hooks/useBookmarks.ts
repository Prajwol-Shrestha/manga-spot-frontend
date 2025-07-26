import { getAllBookmarks } from '@/services/bookmarksService';
import { IBookmarkResponse } from '@/types/bookmark';
import { IQueryParams } from '@/types/common';
import { useEffect, useState } from 'react';

export default function useBookmarks(queryParams: IQueryParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarksData, setBookmarksData] = useState<IBookmarkResponse | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchBookmarks = async () => {
      const result = await getAllBookmarks(queryParams);
      setIsLoading(false);
      setBookmarksData(result);
    };
    fetchBookmarks();
  }, [...Object.values(queryParams)]);

  const totalCount = bookmarksData?.total;
  const bookmarks = bookmarksData?.data || [];
  const isEmpty = totalCount === 0;

  return {
    isLoading,
    totalCount,
    bookmarks,
    isEmpty,
  };
}
