import { SortBy, SortOrder } from '@/generated/graphql';

export const DEFAULT_FILTERS = {
  sortBy: SortBy.BookName,
  sortOrder: SortOrder.Asc,
  selectedGenres: [],
  selectedPublishers: [],
  selectedAuthors: [],
  selectedBeforeDate: new Date(2020, 11, 31),
  selectedAfterDate: new Date(1900, 0, 1),
  selectedMinPages: undefined,
  selectedMaxPages: undefined,
  selectedMinRating: undefined,
};

export const getFilterParams = (searchParams: URLSearchParams) => {
  const sortBy = (searchParams.get('sortBy') as SortBy) ?? DEFAULT_FILTERS.sortBy;
  const sortOrder = (searchParams.get('sortOrder') as SortOrder) ?? DEFAULT_FILTERS.sortOrder;
  const authors = searchParams.getAll('authors') ?? DEFAULT_FILTERS.selectedAuthors;
  const publishers = searchParams.getAll('publishers') ?? DEFAULT_FILTERS.selectedPublishers;
  const genres = searchParams.getAll('genres') ?? DEFAULT_FILTERS.selectedGenres;
  const beforeDate = searchParams.get('beforeDate')
    ? new Date(searchParams.get('beforeDate') ?? '')
    : DEFAULT_FILTERS.selectedBeforeDate;
  const afterDate = searchParams.get('afterDate')
    ? new Date(searchParams.get('afterDate') ?? '')
    : DEFAULT_FILTERS.selectedAfterDate;
  const minPages =
    parseInt(searchParams.get('minPages') ?? '', 10) || DEFAULT_FILTERS.selectedMinPages;
  const maxPages =
    parseInt(searchParams.get('maxPages') ?? '', 10) || DEFAULT_FILTERS.selectedMaxPages;
  const minRating =
    parseInt(searchParams.get('minRating') ?? '', 10) || DEFAULT_FILTERS.selectedMinRating;

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
  };
};
