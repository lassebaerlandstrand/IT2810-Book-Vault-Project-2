import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query GetAuthors($limit: Int, $offset: Int) {
    authors(limit: $limit, offset: $offset) {
      name
    }
  }
`;

export const GET_PUBLISHERS = gql`
  query GetPublishers($limit: Int, $offset: Int) {
    publishers(limit: $limit, offset: $offset) {
      name
    }
  }
`;

export const GET_GENRES = gql`
  query GetGenres($limit: Int, $offset: Int) {
    genres(limit: $limit, offset: $offset) {
      name
    }
  }
`;

export const GET_BOOKS = gql`
  query GetBooks($limit: Int, $offset: Int) {
    books(limit: $limit, offset: $offset) {
      id
      title
      authors {
        name
      }
      publisher {
        name
      }
      genres {
        name
      }
      coverImg
    }
  }
`;
