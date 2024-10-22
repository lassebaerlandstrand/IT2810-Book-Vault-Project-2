// TODO: Update with only genres on books satisfying the filters

import { useQuery } from '@apollo/client';
import { GET_GENRES } from '@/graphql/queries/books';

export const useGenres = () => {
  const { data, loading, error } = useQuery(GET_GENRES);

  return {
    genres: data?.genres,
    loading,
    error,
  };
};
