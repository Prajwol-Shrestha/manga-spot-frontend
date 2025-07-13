import { debounce } from '@/lib/utils';
import { ParserBuilder, useQueryStates } from 'nuqs';
import { useCallback, useMemo } from 'react';

export type InitialFilters = {
  [key: string]:
    | ParserBuilder<string>
    | ParserBuilder<number>
    | ParserBuilder<boolean>
    | ParserBuilder<string[]>
    | ParserBuilder<number[]>;
};

export default function useFilters(defaultFilters: InitialFilters) {
  const [filters, setFilters] = useQueryStates(defaultFilters, {
    history: 'replace',
  });

  const setFilterValue = useCallback(
    (key: string, value: string) => {
      console.log({ key, value });
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setFilters]
  );

const debouncedSetFilter = useMemo(() => {
  const debounced = debounce((key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, 500);
  return debounced;
}, [setFilters]);


  const removeFilter = useCallback(
    (key: string) => {
      setFilters((prev) => ({
        ...prev,
        [key]: null,
      }));
    },
    [setFilters]
  );

  const resetFilters = useCallback(() => {
    setFilters(null);
  }, [setFilters]);

  return { filters, setFilterValue, debouncedSetFilter, removeFilter, resetFilters };
}
