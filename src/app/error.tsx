'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, RotateCw } from 'lucide-react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error('Error captured:', error);
  }, [error]);

  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <AlertTriangle className="h-12 w-12 text-[color:var(--danger)] mb-4" />
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 opacity-80 text-sm">
        We're sorry, an unexpected error occurred.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          <RotateCw className="h-4 w-4" />
          Try Again
        </button>

        <button
          onClick={() => router.push('/')}
          className="text-sm text-[color:var(--accent)] underline underline-offset-2"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
