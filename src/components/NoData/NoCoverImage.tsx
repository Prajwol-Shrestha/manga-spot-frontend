import { cn } from '@/lib/utils';
import React from 'react';

interface IProps {
  className?: string;
}

export default function NoCoverImage({ className }: IProps) {
  return (
    <div className={cn('flex h-full w-full items-center justify-center text-base text-gray-400', className)}>
      No Cover
    </div>
  );
}
