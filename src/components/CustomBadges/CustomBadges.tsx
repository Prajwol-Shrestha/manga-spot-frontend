import { ContentRating, MangaStatus } from '@/types/manga';
import { Badge, BadgeProps } from '../ui/Badge';

const statusToVariant: Record<MangaStatus, BadgeProps['variant']> = {
  [MangaStatus.COMPLETED]: 'completed',   // ✅ green
  [MangaStatus.ONGOING]: 'ongoing',       // 🔵 blue
  [MangaStatus.CANCELLED]: 'cancelled',   // ⚫ gray
  [MangaStatus.HIATUS]: 'hiatus',         // 🟡 yellow
};

const ratingToVariant: Record<ContentRating, BadgeProps['variant']> = {
  [ContentRating.SAFE]: 'completed',         // ✅ green
  [ContentRating.SUGGESTIVE]: 'hiatus',      // 🟡 yellow (cautionary)
  [ContentRating.EROTICA]: 'destructive',    // 🔴 red
  [ContentRating.PORNOGRAPHIC]: 'destructive', // 🔴 red
};


export function StatusBadge({ status }: { status: MangaStatus }) {
  console.log(status, 'status')
  return <Badge variant={statusToVariant[status]}>{status}</Badge>;
}

export function ContentRatingBadge({ rating }: { rating: ContentRating }) {
  return <Badge variant={ratingToVariant[rating]}>{rating}</Badge>;
}
