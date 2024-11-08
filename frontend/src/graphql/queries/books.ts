// This file defines all queries related to books

import { gql } from '@/generated';

export const GET_BOOKS = gql(`
  query GetBooks($limit: Int, $offset: Int, $input: FilterInput) {
    books(limit: $limit, offset: $offset, input: $input) {
      books {
        id
        title
        coverImg
        rating
        numRatings
        description
        genres {
          name
        }
        authors {
          name
        }
      }
      summary {
        totalBooks
      }
    }
  }
`);

export const GET_BOOK = gql(`
  query GetBook($bookId: String!) {
    book(id: $bookId) {
      id
      title
      series
      numberInSeries
      language
      isbn
      coverImg
      numRatings
      rating
      ratingsByStars
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
`);

export const GET_RANDOM_BOOK = gql(`
  query GetRandomBook {
    randomBook {
      id
    }
  }
`);

export const GET_BOOK_RATING = gql(`
  query GetBookRating($bookId: String!) {
    book(id: $bookId) {
      id
      rating
    }
  }
`);

// TODO: Update with only authors on books satisfying the filters
export const GET_AUTHORS = gql(`
  query GetAuthors {
    authors {
      name
    }
  }
`);

// TODO: Update with only genres on books satisfying the filters
export const GET_GENRES = gql(`
  query GetGenres {
    genres {
      name
    }
  }
`);

// TODO: Update with only genres on books satisfying the filters
export const GET_PUBLISHERS = gql(`
  query GetPublishers {
    publishers {
      name
    }
  }
`);

export const GET_FILTER_COUNT = gql(`
  query GetFilterCount($input: FilterInput) {
    filterCount(input: $input) {
      authors {
        name
        count
      }
      genres {
        name
        count
      }
      publishers {
        name
        count
      }
      ratings {
        rating
        count
      }
    }
  }
`);

export const GET_DATE_SPAN = gql(`
  query GetDateSpan {
    dateSpan {
      earliest
      latest
    }
  }
`);

export const GET_PAGE_SPAN = gql(`
  query GetPageSpan {
    pageSpan {
      least
      most
    }
  }
`);
