import { render } from '@test-utils';
import { Book } from '@/generated/graphql';
import BookCard from './BookCard';

const dummyBook: Book = {
  __typename: 'Book',
  authors: ['Author'],
  coverImg: 'https://placehold.co/200x300?text=Cover%20image%20for%20book',
  genres: ['Genre'],
  id: '1',
  publisher: 'Publisher',
  title: 'Title',
};

describe('Bookcard component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<BookCard book={dummyBook} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
