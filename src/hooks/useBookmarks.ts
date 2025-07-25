import { getAllBookmarks } from '@/services/bookmarksService';
import { IBookmarkResponse } from '@/types/bookmark';
import { useEffect, useState } from 'react';

export default function useBookmarks(queryParms: Record<string, any>) {
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarksData, setBookmarksData] = useState<IBookmarkResponse | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchBookmarks = async () => {
      const result = await getAllBookmarks(undefined, queryParms);
      setIsLoading(false);
      setBookmarksData(result);
    };
    fetchBookmarks();
  }, [...Object.values(queryParms)]);

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
