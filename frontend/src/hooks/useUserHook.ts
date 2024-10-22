import { useQuery } from '@apollo/client';
import { GET_USER } from '@/graphql/queries/users';

type UseUserArgs = {
  UUID?: string;
};

export const useUserHook = ({ UUID }: UseUserArgs) => {
  if (!UUID) {
    return { user: undefined, loading: false, error: undefined };
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
