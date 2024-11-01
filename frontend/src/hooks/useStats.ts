import { useQuery } from '@apollo/client';
import { GET_STATS } from '@/graphql/queries/stats';

export const useStats = () => {
  const { data, loading, error } = useQuery(GET_STATS);

  return {
    stats: data?.stats,
    loading,
    error,
  };
};