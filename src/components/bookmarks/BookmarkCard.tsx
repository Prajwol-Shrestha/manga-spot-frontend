import IBookmark from '@/types/bookmark'
import React from 'react'
import Typography from '../ui/Typography'
import { getLongDate } from '@/lib/date-helper'
import BookmarkButton from '../Buttons/BookmarkButton'


export default function BookmarkCard({ bookmark }: { bookmark: IBookmark }) {
  const { title, coverArt, mangaId, createdAt, id } = bookmark
  const formattedDate = getLongDate(createdAt)

  const manga = {
    title,
    coverArt,
    id: mangaId,
    bookmarkedByMe: true,
  }

  return (
    <div className='py-2 flex gap-3 justify-between'>
      <div className='flex gap-3'>
        <div>
          <div className='h-20 w-20 rounded-md'>
            <img src={coverArt} alt={title} className='object-cover w-full h-full rounded-md' />
          </div>
        </div>
        <div>
          <Typography variant={'body2'} className='font-semibold line-clamp-2'> {title} </Typography>
          <Typography variant={'caption'}> Bookmarked At: {formattedDate} </Typography>
        </div>
      </div>
      <div>
        <BookmarkButton type='icon' manga={manga} bookmarkId={id} />
      </div>
    </div>
  )
}
