import Typography from '@/components/ui/Typography'
import { getAllTags } from '@/services/tags-service/tagGetService'
import Link from 'next/link'
import React from 'react'

export default async function GenresPage() {
  const tagResponse = await getAllTags()
  const groupedTags = tagResponse?.data || {}

  return (
    <main className="page-container !mb-auto">
      <Typography variant={'h4'} className="font-bold mb-6">All Tag Groups</Typography>

      {Object.entries(groupedTags).map(([groupName, tags]) => (
        <div key={groupName} className="mb-10">
          <Typography variant={'body2'} className="font-semibold mb-4 capitalize">
            {groupName}
          </Typography>
          <div className="flex flex-wrap gap-4">
                  {tags.map((tag) => (
                <Link href={`/browse?includedTags=${tag.id}`}>
                    <div
                        key={tag.id}
                        className="border border-border rounded-lg py-1 px-2 bg-card cursor-pointer"
                    >
                        <Typography variant={'caption'} className="">{tag.name}</Typography>
                    </div>
                </Link>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(groupedTags).length === 0 && (
        <p className="text-sm text-secondary-300 text-center mt-10">
          No tag groups found.
        </p>
      )}
    </main>
  )
}
