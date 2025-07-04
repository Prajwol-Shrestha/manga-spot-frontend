import { Button } from '@/components/ui/Button';
import IconButton from '@/components/ui/IconButton';
import Typography from '@/components/ui/Typography';
import { cn } from '@/lib/utils';
import { getRandomManga } from '@/services/manga-service/mangaGetService';
import Link from 'next/link';
import Description from './Description';
import Tag from '@/components/Tag/Tag';

export default async function page() {
  const data = await getRandomManga();
  const { id, title, description, tags, coverArt } = data ?? {};


  return (
    <section className="hero relative !bg-cover !bg-center">
      <div className="rounded-lg bg-gray-600 py-12 backdrop-blur-xl">
        <div className="container flex flex-col gap-4 sm:flex-row">
          <div className="h-[20vh] sm:h-[40vh] sm:basis-1/3">
            <img src={coverArt} loading="lazy" alt={title} className="h-full object-contain rounded-md" />
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <Typography variant={'h6'} className="text-white">
              {title}
            </Typography>
            <div className="flex gap-4">
              <Link href={`/manga/read/${id}`} target="_blank">
                <IconButton
                  variant={'default'}
                  text="Read Now"
                  icon={'system-uicons:book-text'}
                  iconPlacement={'left'}
                  additionalClassNames="rounded-xl text-secondary-600"
                />
              </Link>
              {/* <BookmarkButton mal_id={mal_id} title={title} image={images.webp.image_url}/> */}
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag tag={tag} key={tag.id} />
              ))}
            </div>
            <Description desc={description} />
          </div>
        </div>
      </div>
    </section>
  );
}
