'use client';

import Link from 'next/link';
import { ArrowLeftCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
         style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg opacity-80">The page you're looking for doesn’t exist.</p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-colors"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
        }}
      >
        <ArrowLeftCircle className="h-4 w-4" />
        Go back home
      </Link>
    </div>
  );
}
