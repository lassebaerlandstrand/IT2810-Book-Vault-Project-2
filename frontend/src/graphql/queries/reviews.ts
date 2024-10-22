// This file defines all queries related to reviews

import { gql } from '@/generated';

export const GET_BOOKS_RATINGS = gql(`
  query GetBooksRatings($bookId: String!) {
    bookRatings(id: $bookId) {
      UUID
      description
      rating
      at
      user {
        UUID
        name
        wantToRead
        haveRead
      }
      book {
        id
        title
        series
        numberInSeries
        language
        isbn
        coverImg
        rating
        numRatings
        characters
        bookFormat
        pages
        publishDate
        awards
        setting
        publisher {
          name
        }
        genres {
          name
        }
        authors {
          name
        }
        description
      }
    }
  }
`);
