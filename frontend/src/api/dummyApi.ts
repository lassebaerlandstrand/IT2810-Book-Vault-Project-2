import { Book } from '@/generated/graphql';
import booksData from './books.json';

const data = booksData as Book[];

const fetchBooks = () => {
  const books = data as Book[];
  return books;
};

const fetchAuthors = () => {
  let authors = (data as Book[]).map((book: Book) => book.authors).flat();

  console.log(authors);

  authors = authors.filter(
    (author: String, index: number, self: String[]) =>
      self.findIndex((a) => a === author) === index
  );
  return authors;
};

const fetchPublishers = () => {
  const publishers = (data as Book[])
    .map((book: Book) => book.publisher)
    .filter(
      (publisher: String, index: number, self: String[]) => self.indexOf(publisher) === index
    );
  return publishers;
};

const fetchGenres = () => {
  const genres = (data as Book[])
    .map((book: Book) => book.genres)
    .flat()
    .filter((genre: String, index: number, self: String[]) => self.indexOf(genre) === index);
  return genres;
};

export { fetchAuthors, fetchBooks, fetchGenres, fetchPublishers };
