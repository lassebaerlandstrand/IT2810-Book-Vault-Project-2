// TODO: Update with only authors on books satisfying the filters

import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '@/graphql/queries/books';

export const useAuthors = () => {
  const { data, loading, error } = useQuery(GET_AUTHORS);

  return {
    authors: data?.authors,
    loading,
    error,
  };
};
