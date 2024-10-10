import { render } from '@test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Book } from '@/generated/graphql';
import BookCardGrid from './BookCardGrid';

const dummyBook: Book = {
  __typename: 'Book',
  authors: ['Author'],
  coverImg: 'https://placehold.co/200x300?text=Cover%20image%20for%20book',
  genres: ['Genre'],
  id: '1',
  publisher: 'Publisher',
  title: 'Title',
  bookFormat: '',
  characters: [],
  description: '',
  isbn: '',
  language: '',
  pages: 0,
  publishDate: '',
  rating: 0,
  series: '',
};

const dummyBooks: Book[] = Array.from({ length: 10 }, (_, index) => ({
  ...dummyBook,
  id: (index + 1).toString(),
}));

describe('Bookcard component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <BookCardGrid books={dummyBooks} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
