import { useQuery } from '@apollo/client';
import { GET_BOOK } from '@/graphql/queries/books';

type UseBookArgs = {
  id: string;
};

export const useBooks = ({ id }: UseBookArgs) => {
  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { id },
  });

  return {
    books: data?.books.books,
    loading,
    error,
  };
};
