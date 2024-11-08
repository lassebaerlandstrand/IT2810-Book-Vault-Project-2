import { useQuery } from '@apollo/client';
import { GET_GENRES } from '@/graphql/queries/books';

/**
 * Gets the list of broad genres from the server.
 * @returns {Object} Object containing the genres, loading state, and error state
 */
export const useGenres = () => {
  const { data, loading, error } = useQuery(GET_GENRES);

  return {
    genres: data?.genres,
    loading,
    error,
  };
};
