import { SortBy, SortOrder } from '@/generated/graphql';

export const DEFAULT_SORT_BY = SortBy.BookName;
export const DEFAULT_SORT_ORDER = SortOrder.Asc;

export const getFilterParams = (searchParams: URLSearchParams) => {
  const sortBy = (searchParams.get('sortBy') as SortBy) ?? DEFAULT_SORT_BY;
  const sortOrder = (searchParams.get('sortOrder') as SortOrder) ?? DEFAULT_SORT_ORDER;
  const authors = searchParams.getAll('authors');
  const publishers = searchParams.getAll('publishers');
  const genres = searchParams.getAll('genres');
  const beforeDate = new Date(searchParams.get('beforeDate') ?? '');
  const afterDate = new Date(searchParams.get('afterDate') ?? '');
  const minPages = parseInt(searchParams.get('minPages') ?? '', 10) || undefined;
  const maxPages = parseInt(searchParams.get('maxPages') ?? '', 10) || undefined;
  const minRating = parseInt(searchParams.get('minRating') ?? '', 10) || undefined;

  return {
    sortBy,
    sortOrder,
    authors,
    publishers,
    genres,
    beforeDate,
    afterDate,
    minPages,
    maxPages,
    minRating,
    DEFAULT_SORT_BY,
    DEFAULT_SORT_ORDER,
  };
};

export const getFormattedFilterCount = (count: number | undefined) => {
  if (count === undefined) {
    return '0';
  }
  return count >= 1000 ? `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k` : `${count}`;
};
