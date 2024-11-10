import { useMutation } from '@apollo/client';
import { UpdateUserInput } from '@/generated/graphql';
import { UPDATE_USER } from '@/graphql/mutations/users';

export const updateUser = () => {
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);

  const submitUpdate = async (input: UpdateUserInput) => {
    try {
      await updateUser({
        variables: { input },
      });
    } catch (e) {
      console.error('Error during user update:', e);
    }
  };

  return {
    submitUpdate,
    success: data?.updateUser.success,
    message: data?.updateUser.message,
    loading,
    error,
  };
};
