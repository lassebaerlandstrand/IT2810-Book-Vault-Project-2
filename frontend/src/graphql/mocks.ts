import { fetchAuthors, fetchBooks, fetchGenres, fetchPublishers } from '../api/dummyApi';
import { GET_AUTHORS, GET_BOOKS, GET_GENRES, GET_PUBLISHERS } from './queries';

export const mocks = [
  {
    request: {
      query: GET_BOOKS,
      variables: {
        limit: 10,
        offset: 0,
      },
    },
    result: {
      data: {
        books: fetchBooks().slice(0, 10),
      },
    },
  },
  {
    request: {
      query: GET_AUTHORS,
      variables: {
        limit: 10,
        offset: 0,
      },
    },
    result: {
      data: {
        authors: fetchAuthors().slice(0, 10),
      },
    },
  },
  {
    request: {
      query: GET_PUBLISHERS,
      variables: {
        limit: 10,
        offset: 0,
      },
    },
    result: {
      data: {
        publishers: fetchPublishers().slice(0, 10),
      },
    },
  },
  {
    request: {
      query: GET_GENRES,
      variables: {
        limit: 10,
        offset: 0,
      },
    },
    result: {
      data: {
        genres: fetchGenres().slice(0, 10),
      },
    },
  },
];
