// This file defines all queries related to books

import { gql } from '@/generated';

export const GET_BOOKS = gql(`
  query GetBooks($limit: Int, $offset: Int) {
    books(limit: $limit, offset: $offset) {
      books {
        id
        title
        coverImg
        rating
      }
    }
  }
`);

export const GET_BOOK = gql(`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      coverImg
      rating
      description
    }
  }
`);
