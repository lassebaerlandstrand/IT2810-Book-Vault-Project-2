import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks($limit: Int, $offset: Int) {
    books(limit: $limit, offset: $offset) {
      id
      title
      authors
      publisher
      genres
      coverImg
    }
  }
`;
