import { Author, Book, Genre, Publisher } from '@/generated/graphql';
import booksData from './books.json';

const data = (booksData as Book[]);

const fetchBooks = () => {
  const books = data as Book[];
  return books;
};

const fetchAuthors = () => {
  let authors = (data as Book[]).map((book: Book) => book.authors).flat();

  console.log(authors);

  authors = authors.filter(
    (author: Author, index: number, self: Author[]) =>
      self.findIndex((a) => a.name === author.name) === index
  );
  return authors;
};

const fetchPublishers = () => {
  const publishers = (data as Book[])
    .map((book: Book) => book.publisher)
    .filter(
      (publisher: Publisher, index: number, self: Publisher[]) => self.indexOf(publisher) === index
    );
  return publishers;
};

const fetchGenres = () => {
  const genres = (data as Book[])
    .map((book: Book) => book.genres)
    .flat()
    .filter((genre: Genre, index: number, self: Genre[]) => self.indexOf(genre) === index);
  return genres;
};

export { fetchAuthors, fetchBooks, fetchGenres, fetchPublishers };
