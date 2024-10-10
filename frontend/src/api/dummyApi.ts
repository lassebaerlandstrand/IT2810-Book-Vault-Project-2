import { Book } from '@/generated/graphql';
import booksData from './books.json';

const data = booksData as Book[];

export const fetchBooks = (page: number, limit: number) => {
  const books = data as Book[];
  return books.slice((page - 1) * limit, page * limit);
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

export const fetchBook = (id: String) => {
  const book = data.find((book) => book.id == id);
  return book;
};

export const fetchTotalBooksWithFilters = () => {
  return data.length; // Temporary, currently have no filters
};
