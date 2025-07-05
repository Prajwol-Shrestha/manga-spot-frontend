import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800',
        secondary: 'bg-muted text-muted-foreground',
        destructive: 'bg-red-500 text-white',
        completed: 'bg-green-500 text-white',
        ongoing: 'bg-blue-500 text-white',
        hiatus: 'bg-yellow-400 text-black',
        cancelled: 'bg-gray-400 text-white',
        outline: 'border border-gray-300 text-gray-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);


export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
