import { useQuery } from '@apollo/client';
import { GET_PAGE_SPAN } from '@/graphql/queries/books';

export const usePageSpan = () => {
  const { data, loading, error } = useQuery(GET_PAGE_SPAN);

  return {
    leastPages: data?.pageSpan.least ?? 1,
    mostPages: data?.pageSpan.most ?? 11095,
    loading,
    error,
  };
};
