import { useQuery } from '@apollo/client';
import { GET_USER } from '@/graphql/queries/users';

type UseUserArgs = {
  UUID?: string;
};

/**
 * Custom hook that fetches a user by their UUID
 * @param {string} UUID - The UUID of the user to fetch
 * @returns Object containing:
 * - user: The user data if found
 * - loading: Boolean indicating if the query is in progress
 * - error: Any error that occurred during the query
 */
export const useUserHook = ({ UUID }: UseUserArgs) => {
  if (!UUID) {
    return { user: undefined, loading: false, error: undefined, refectch: undefined };
  }

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { UUID },
  });

  return {
    user: data?.user,
    loading,
    error,
  };
};
