import BookCardGrid from '@/components/BookCardGrid/BookCardGrid';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export type BookContent = {
  title: string;
  author: string;
  coverImg: string;
};

// Dummy type, to be removed
export type Books = {
  [key: string]: BookContent;
};

const dummyBook: Books = {
  '1': {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    coverImg:
      'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586722975l/2767052.jpg',
  },
};

// Clone dummyBook x times in an object but change the key
const books: Books = {};
for (let i = 1; i <= 10; i++) {
  books[i.toString()] = { ...dummyBook['1'] };
}

console.log(books);

export function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <BookCardGrid books={books} />
    </>
  );
}
