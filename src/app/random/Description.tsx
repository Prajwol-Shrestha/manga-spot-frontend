'use client';
import { Button } from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Description({ desc }: { desc: string }) {
  const [seemore, setSeeMore] = useState(false);
  return (
    <>
      <Typography
        variant={'body2'}
        className={cn('line-clamp-3 max-w-[80%] text-white/90', {
          'line-clamp-none': seemore,
        })}
      >
        {desc}
      </Typography>
      <div>
        <Button variant={'link'} className="pl-0 underline" onClick={() => setSeeMore((prev) => !prev)}>
          See {seemore ? 'Less' : 'More'}
        </Button>
      </div>
    </>
  );
}
