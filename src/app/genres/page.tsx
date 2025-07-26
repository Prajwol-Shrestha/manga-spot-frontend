import Typography from '@/components/ui/Typography';
import { getAllTags } from '@/services/tagGetService';
import Link from 'next/link';
import React from 'react';

export default async function GenresPage() {
  const tagResponse = await getAllTags();
  const groupedTags = tagResponse?.data || {};

  return (
    <main className="page-container !mb-auto">
      <Typography variant={'h4'} className="mb-6 font-bold">
        All Tag Groups
      </Typography>

      {Object.entries(groupedTags).map(([groupName, tags]) => (
        <div key={groupName} className="mb-10">
          <Typography variant={'body2'} className="mb-4 font-semibold capitalize">
            {groupName}
          </Typography>
          <div className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <Link key={tag.id} href={`/browse?includedTags=${tag.id}`}>
                <div key={tag.id} className="border-border bg-card cursor-pointer rounded-lg border px-2 py-1">
                  <Typography variant={'caption'} className="">
                    {tag.name}
                  </Typography>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(groupedTags).length === 0 && (
        <p className="text-secondary-300 mt-10 text-center text-sm">No tag groups found.</p>
      )}
    </main>
  );
}
