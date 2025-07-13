// "use client"
import BookmarksSection from '@/components/bookmarks/BookmarksSection';
import React from 'react';

export default function page() {
      
  return (
    <main className='page-container'>
      <div className='grid sm:grid-cols-12'>
        <section className='col-span-8'>
          a
        </section>
        <BookmarksSection className='col-span-4'/>
      </div>
    </main>
  );
}
