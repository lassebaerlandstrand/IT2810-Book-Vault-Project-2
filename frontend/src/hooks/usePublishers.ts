// TODO: Update with only publishers on books satisfying the filters

import { useQuery } from '@apollo/client';
import { GET_PUBLISHERS } from '@/graphql/queries/books';

export const usePublishers = () => {
  const { data, loading, error } = useQuery(GET_PUBLISHERS);

  return {
    publishers: data?.publishers,
    loading,
    error,
  };
};
