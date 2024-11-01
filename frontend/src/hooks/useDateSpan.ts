import { useQuery } from '@apollo/client';
import { GET_DATE_SPAN } from '@/graphql/queries/books';

export const useDateSpan = () => {
  const { data, loading, error } = useQuery(GET_DATE_SPAN);

  return {
    earliestDate: new Date(data?.dateSpan.earliest)?.getFullYear() ?? 1900,
    latestDate: new Date(data?.dateSpan.latest)?.getFullYear() ?? 2024,
    loading,
    error,
  };
};
