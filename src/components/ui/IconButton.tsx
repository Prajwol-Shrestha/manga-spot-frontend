'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null | undefined;
  iconPlacement: 'top' | 'right' | 'bottom' | 'left';
  icon: any;
  text?: string;
  additionalClassNames?: string;
}

export default function IconButton({
  icon,
  iconPlacement = 'left',
  text,
  variant,
  additionalClassNames,
  onClick,
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(`flex items-center justify-between gap-2 text-xs`, additionalClassNames)}
      onClick={onClick}
    >
      {icon && iconPlacement === 'left' && <Icon icon={icon} fontSize={'2rem'} />}
      {text}
      {icon && iconPlacement === 'right' && <Icon icon={icon} fontSize={'2rem'} />}
    </Button>
  );
}
