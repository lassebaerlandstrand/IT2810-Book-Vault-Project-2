import { useEffect, useState } from 'react';
import { ApolloError, useQuery } from '@apollo/client';
import { FilterCountResult } from '@/generated/graphql';
import { GET_FILTER_COUNT } from '@/graphql/queries/books';

type UseFilterCountArgs = {
  search?: string;
  beforeDate?: Date;
  afterDate?: Date;
  authors?: string[];
  genres?: string[];
  publishers?: string[];
  minPages?: number;
  maxPages?: number;
  minRating?: number;
};

export const useFilterCount = ({
  search,
  beforeDate,
  afterDate,
  authors,
  genres,
  publishers,
  minPages,
  maxPages,
  minRating,
}: UseFilterCountArgs) => {
  const [filterCount, setFilterCount] = useState<FilterCountResult | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApolloError | null>(null);

  const filterInput = {
    search,
    beforeDate,
    afterDate,
    authors,
    genres,
    publishers,
    minPages,
    maxPages,
    minRating,
  };

  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_FILTER_COUNT, {
    variables: { input: filterInput },
  });

  // useEffect with dependencies to avoid infinite loop
  useEffect(() => {
    if (!queryLoading) {
      if (queryError) {
        setError(queryError);
      } else {
        setFilterCount(data?.filterCount);
      }
      setLoading(false);
    }
  }, [queryLoading, queryError, data]);

  return {
    filterCount,
    loading: loading || queryLoading,
    error,
  };
};
