import { SortBy, SortOrder } from '@/components/SearchConfiguration/SearchConfiguration';
import { Book } from '@/generated/graphql';
import booksData from './books.json';

const data = booksData as Book[];

const fetchAllBooksWithFilters = (searchParams: URLSearchParams) => {
  const allBooks = data as Book[];
  let newBooks = [] as Book[];

  allBooks.forEach((book) => {
    if (!book.title.toLowerCase().includes(searchParams.get('search')?.toLowerCase() || '')) {
      return;
    }
    if (
      searchParams.has('authors') &&
      !searchParams.getAll('authors').some((author) => book.authors.includes(author))
    ) {
      return;
    }
    if (
      searchParams.has('genres') &&
      !searchParams.getAll('genres').some((genre) => book.genres.includes(genre))
    ) {
      return;
    }
    if (
      searchParams.has('publishers') &&
      !searchParams.getAll('publishers').some((publisher) => book.publisher === publisher)
    ) {
      return;
    }

    newBooks.push(book);
  });

  const sortBy = searchParams.get('sortBy') || SortBy.Book;
  const sortOrder = searchParams.get('sortOrder') || SortOrder.Ascending;

  newBooks = newBooks.sort((a, b) => {
    let c = a;
    let d = b;
    if (sortOrder === SortOrder.Descending) {
      [c, d] = [b, a];
    }
    if (sortBy === 'book') {
      return c.title.localeCompare(d.title);
    }
    if (sortBy === 'author') {
      return c.authors[0].localeCompare(d.authors[0]);
    }
    if (sortBy === 'publisher') {
      return c.publisher.localeCompare(d.publisher);
    }
    return 0;
  });

  return newBooks;
};

export const fetchBooks = (page: number, limit: number, searchParams: URLSearchParams) => {
  return fetchAllBooksWithFilters(searchParams).slice((page - 1) * limit, page * limit);
};

export const fetchAuthors = () => {
  const authors = (data as Book[])
    .map((book: Book) => book.authors)
    .flat()
    .filter(
      (author: string, index: number, self: string[]) =>
        self.findIndex((a) => a === author) === index
    );
  return authors;
};

export const fetchPublishers = () => {
  const publishers = (data as Book[])
    .map((book: Book) => book.publisher)
    .filter(
      (publisher: string, index: number, self: string[]) => self.indexOf(publisher) === index
    );
  return publishers;
};

export const fetchGenres = () => {
  const genres = (data as Book[])
    .map((book: Book) => book.genres)
    .flat()
    .filter((genre: string, index: number, self: string[]) => self.indexOf(genre) === index);
  return genres;
};

export const fetchTotalBooksWithFilters = (searchParams: URLSearchParams) => {
  return fetchAllBooksWithFilters(searchParams).length;
};
