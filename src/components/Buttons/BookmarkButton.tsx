'use client';

import { cn } from '@/lib/utils';
import IconButton from '../ui/IconButton';
import { useState } from 'react';
import { IMangaWithVolume } from '@/types/manga';
import { toast } from 'sonner';
import { addBookmark, removeBookmark } from '@/actions/bookmarks';

interface IProps {
  className?: string;
  type: 'icon' | 'button';
  manga: Pick<IMangaWithVolume, 'id' | 'title' | 'coverArt' | 'bookmarkedByMe'>;
}
export default function BookmarkButton({ className, type = 'button', manga }: IProps) {
  const { id: mangaId, title, coverArt, bookmarkedByMe } = manga ?? {};
  const [isBookmarked, setIsBookmarked] = useState(bookmarkedByMe);

  const handleToggleBookmark = async () => {
    setIsBookmarked((prev) => !prev);
    try {
      if (isBookmarked) {
        return await removeBookmark(mangaId);
      }
      await addBookmark({ mangaId, coverArt: coverArt, title: title });
    } catch (err) {
      toast.error('Could not bookmark manga. Try again later!.');
    }
  };

  return (
    <IconButton
      onClick={handleToggleBookmark}
      variant={'secondary'}
      additionalClassNames={cn('', className, {
        '!bg-transparent hover:!bg-transparent !p-2': type === 'icon',
      })}
      text={type === 'icon' ? '' : isBookmarked ? 'Bookmarked' : 'Bookmark'}
      icon={isBookmarked ? 'material-symbols:bookmark' : 'material-symbols:bookmark-outline'}
      iconPlacement="right"
    />
  );
}
