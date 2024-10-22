import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '@/graphql/mutations/users';

export const makeUser = () => {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  useEffect(() => {
    const createUserAsync = async () => {
      try {
        await createUser();
      } catch (e) {
        console.error('Error during user creation:', e);
      }
    };

    createUserAsync();
  }, [createUser]);

  return {
    user: data?.createUser || null,
    loading,
    error,
  };
};
