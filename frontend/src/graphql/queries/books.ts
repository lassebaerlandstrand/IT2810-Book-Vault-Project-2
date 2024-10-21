// This file defines all queries related to books

import { gql } from '@apollo/client';

export const GET_BOOKS = gql(`
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
`);
