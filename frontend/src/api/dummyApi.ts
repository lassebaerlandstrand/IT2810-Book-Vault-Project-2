// import { Book } from '@/generated/graphql';
// import { SortBy, SortOrder } from '@/utils/filters';
// import booksData from './books.json';

// const data = booksData as Book[];

// const fetchAllBooksWithFilters = (
//   sortBy: SortBy,
//   sortOrder: SortOrder,
//   genres: string[],
//   publishers: string[],
//   authors: string[],
//   search: string
// ) => {
//   const allBooks = data as Book[];
//   let newBooks = [] as Book[];

//   allBooks.forEach((book) => {
//     if (!book.title.toLowerCase().includes(search.toLowerCase())) {
//       return;
//     }
//     if (authors.length > 0 && !authors.some((author) => book.authors.includes(author))) {
//       return;
//     }
//     if (genres.length > 0 && !genres.some((genre) => book.genres.includes(genre))) {
//       return;
//     }
//     if (publishers.length > 0 && !publishers.some((publisher) => book.publisher === publisher)) {
//       return;
//     }

//     newBooks.push(book);
//   });

//   newBooks = newBooks.sort((a, b) => {
//     let c = a;
//     let d = b;
//     if (sortOrder === SortOrder.Descending) {
//       [c, d] = [b, a];
//     }
//     if (sortBy === 'book') {
//       return c.title.localeCompare(d.title);
//     }
//     if (sortBy === 'author') {
//       return c.authors[0].localeCompare(d.authors[0]);
//     }
//     if (sortBy === 'publisher') {
//       return c.publisher.localeCompare(d.publisher);
//     }
//     return 0;
//   });

//   return newBooks;
// };

// export const fetchBooks = (
//   page: number,
//   limit: number,
//   ...args: Parameters<typeof fetchAllBooksWithFilters>
// ) => {
//   return fetchAllBooksWithFilters(...args).slice((page - 1) * limit, page * limit);
// };

// export const fetchAuthors = () => {
//   const uniqueAuthors = Array.from(new Set(data.flatMap((item) => item.authors)));
//   return uniqueAuthors;
// };

// export const fetchPublishers = () => {
//   const publishers = Array.from(new Set(data.map((item) => item.publisher)));
//   return publishers;
// };

// export const fetchGenres = () => {
//   const genres = Array.from(new Set(data.flatMap((item) => item.genres)));
//   return genres;
// };

// export const fetchBook = (id: string) => {
//   const book = data.find((book) => book.id === id);
//   return book;
// };

// export const fetchTotalBooksWithFilters = (
//   ...args: Parameters<typeof fetchAllBooksWithFilters>
// ) => {
//   return fetchAllBooksWithFilters(...args).length;
// };
