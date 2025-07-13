'use client';

import { useEffect, useState } from 'react';
import Typography from '@/components/ui/Typography';
import { Input } from '@/components/ui/Input';
import SearchMangaCard from '@/components/cards/SearchMangaCard';
import useMangas from '@/hooks/useMangas';
import useFilters from '@/hooks/useFilters';
import { allSearchFilters } from './filters';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/Pagination';

const LIMIT = 20;
export default function BrowsePage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { filters, debouncedSetFilter, removeFilter, setFilterValue } = useFilters(allSearchFilters);

  const { isLoading, isEmpty, mangas, totalCount } = useMangas({ limit: LIMIT, offset: 0, ...filters });
  const totalPages = totalCount ? Math.ceil(totalCount / LIMIT) : 1;

  useEffect(() => {
    if (filters) {
      setSearch(filters.title || '');
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      debouncedSetFilter('title', value);
    } else {
      debouncedSetFilter.cancel();
      removeFilter('title');
    }
  };

  return (
    <main className="page-container !mb-auto flex flex-col gap-6">
      {/* Header */}
      <Typography variant="h4" className="font-bold">
        Browse Manga
      </Typography>

      {/* Search Bar */}
      <div className="flex gap-2">
        <Input placeholder="Search for manga..." value={search} onChange={handleSearch} className="w-full max-w-xl" />
      </div>

      {isLoading && <Typography variant="body1">Loading...</Typography>}
      {!isLoading && isEmpty && (
        <Typography variant="body1" className="text-muted-foreground italic">
          No results found.
        </Typography>
      )}
      {!isEmpty && !isLoading && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mangas.map((data) => (
            <SearchMangaCard key={data.id} manga={data} />
          ))}
        </div>
      )}

      {/* <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
            </PaginationItem>
            {startPages.map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => handlePageChange(index + 1)}>{index + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationEllipsis />
            {endPages.fill(0).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => handlePageChange(index + 1)}>{index + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => handlePageChange(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div> */}
    </main>
  );
}
