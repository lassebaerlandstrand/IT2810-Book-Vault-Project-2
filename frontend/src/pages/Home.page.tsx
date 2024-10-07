import { fetchBooks } from '@/api/dummyApi';
import BookCardGrid from '@/components/BookCardGrid/BookCardGrid';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export function HomePage() {
  const books = fetchBooks().slice(0, 10);

  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <BookCardGrid books={books} />
    </>
  );
}
