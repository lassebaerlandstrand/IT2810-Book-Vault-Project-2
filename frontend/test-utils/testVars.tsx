import { Book } from '@/generated/graphql';

export const dummyBook: Book = {
  __typename: 'Book',
  authors: ['An author'],
  coverImg: 'https://placehold.co/200x300?text=Cover%20image%20for%20book',
  genres: ['A genre'],
  id: '1',
  publisher: 'A company',
  title: 'A name',
  bookFormat: 'Paper',
  characters: 'A swedish person that is dumb',
  description: 'A deep book about deep topics',
  isbn: '999999999',
  language: 'Swedish',
  pages: '1000',
  publishDate: '03/03/03',
  rating: 3.555,
  series: 'Title #1',
};
