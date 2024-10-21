import { ApolloError, useQuery } from '@apollo/client';
import { Book } from '@/generated/graphql';

type UseBooksArgs = {
  limit: number;
  page: number;
};

type UseBooksResult = {
  books: Book[] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

export const useBooks = ({ limit, page }: UseBooksArgs): UseBooksResult => {
  const { data, loading, error } = useQuery(
    gql(`
    query GetBooks($limit: Int, $offset: Int) {
      books(limit: $limit, offset: $offset) {
        books {
          id
          title
          coverImg
          rating
          numRatings
        }
      }
    }
  `),
    {
      variables: { limit, offset: page - 1 },
    }
  );

  return {
    books: data?.books,
    loading,
    error,
  };
};
