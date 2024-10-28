import { SortBy, SortOrder } from '@/generated/graphql';

export const DEFAULT_SORT_BY = SortBy.BookName;
export const DEFAULT_SORT_ORDER = SortOrder.Asc;

export const getFilterParams = (searchParams: URLSearchParams) => {
  const sortBy = (searchParams.get('sortBy') as SortBy) ?? DEFAULT_SORT_BY;
  const sortOrder = (searchParams.get('sortOrder') as SortOrder) ?? DEFAULT_SORT_ORDER;
  const authors = searchParams.getAll('authors');
  const publishers = searchParams.getAll('publishers');
  const genres = searchParams.getAll('genres');

  return {
    sortBy,
    sortOrder,
    authors,
    publishers,
    genres,
    DEFAULT_SORT_BY,
    DEFAULT_SORT_ORDER,
  };
};
