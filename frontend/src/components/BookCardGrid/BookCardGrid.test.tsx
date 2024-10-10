import { render } from '@test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Book } from '@/generated/graphql';
import { dummyBook } from '../../../test-utils/testVars';
import BookCardGrid from './BookCardGrid';

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
