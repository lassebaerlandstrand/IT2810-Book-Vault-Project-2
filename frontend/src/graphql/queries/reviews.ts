// This file defines all queries related to reviews

import { gql } from '@/generated';

export const GET_BOOKS_RATINGS = gql(`
  query GetBooksRatings($bookID: String!, $limit: Int!, $offset: Int!, $userUUID: String!) {
    bookRatings(bookID: $bookID, limit: $limit, offset: $offset, userUUID: $userUUID) {
      ratings {
        UUID
        description
        rating
        at
        user {
          UUID
          name
          at
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
      pagination 
      {
        totalPages
        currentPage
        isLastPage
      }
      summary 
      {
        total
      }
    }
  }
`);

export const GET_YOUR_BOOK_RATING = gql(`
  query GetYourBookRating($bookID: String!, $userUUID: String!) {
    getYourBookRating(bookID: $bookID, userUUID: $userUUID) {
      UUID
      description
      rating
      at
      user {
        UUID
        name
        at
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
