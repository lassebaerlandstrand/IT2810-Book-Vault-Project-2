import { Reference, useMutation } from '@apollo/client';
import { UpdateUserLibraryInput } from '@/generated/graphql';
import { UPDATE_USERLIBARY } from '@/graphql/mutations/users';

export const updateUserLibrary = () => {
  const [UpdateUserLibrary, { data, loading, error }] = useMutation(UPDATE_USERLIBARY, {
    update: (cache, {}) => {},
  });

  const submitUpdate = async (input: UpdateUserLibraryInput) => {
    try {
      await UpdateUserLibrary({
        variables: { input },
        update: (cache) => {
          cache.modify({
            id: cache.identify({ __typename: 'User', UUID: input.UUID }),
            fields: {
              wantToRead(existing = [], { toReference, readField }) {
                const filtered = existing.filter(
                  (bookRef: Reference) =>
                    readField('id', bookRef) !== input.haveRead &&
                    readField('id', bookRef) !== input.removeFromLibrary
                );

                if (input.wantToRead) {
                  const newBookRef = toReference({ __typename: 'Book', id: input.wantToRead });
                  return [...filtered, newBookRef];
                }

                return filtered;
              },
              haveRead(existing = [], { toReference, readField }) {
                const filtered = existing.filter(
                  (bookRef: Reference) =>
                    readField('id', bookRef) !== input.wantToRead &&
                    readField('id', bookRef) !== input.removeFromLibrary
                );

                if (input.haveRead) {
                  const newBookRef = toReference({ __typename: 'Book', id: input.haveRead });
                  return [...filtered, newBookRef];
                }

                return filtered;
              },
            },
          });
        },
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
