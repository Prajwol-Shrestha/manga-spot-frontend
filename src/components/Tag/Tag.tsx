import Link from 'next/link';
import Typography from '../ui/Typography';
import { IMangaTag } from '@/types/manga';

export default function Tag({ tag }: { tag: IMangaTag }) {
    const { id, name } = tag ?? {};
    
  return (
    <div className="bg-accent rounded-md px-5 py-2">
      <Link href={`/search/genre?id=${id}&name=${name}`}>
        <Typography variant={'caption'} className="line-clamp-1 text-xs !text-foreground capitalize">
          {' '}
          {name}
        </Typography>
      </Link>
    </div>
  );
}
