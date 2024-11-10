import { useMutation } from '@apollo/client';
import { UpdateUserLibraryInput } from '@/generated/graphql';
import { UPDATE_USERLIBARY } from '@/graphql/mutations/users';

export const updateUserLibrary = () => {
  const [UpdateUserLibrary, { data, loading, error }] = useMutation(UPDATE_USERLIBARY);

  const submitUpdate = async (input: UpdateUserLibraryInput) => {
    try {
      await UpdateUserLibrary({
        variables: { input },
      });
    } catch (e) {
      console.error('Error during user update:', e);
    }
  };

  return {
    submitUpdate,
    success: data?.updateUserLibrary.success ?? !error,
    message: data?.updateUserLibrary.message ?? (error && 'Error updating user. Try again later.'),
    loading,
    error,
  };
};
