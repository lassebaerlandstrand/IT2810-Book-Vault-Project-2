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
        <BookCardGrid books={dummyBooks} loading={false} error={undefined} />
      </MemoryRouter>
    );
    const attributesToRemove = [
      ...document.body.querySelectorAll('div [id^="mantine"]'),
      ...document.body.querySelectorAll('div [for^="mantine"]'),
    ]; // Because Mantine uses random ids which causes snapshots to fail
    attributesToRemove.forEach((element) => {
      element.removeAttribute('for');
      element.removeAttribute('id');
      element.removeAttribute('class');
      element.removeAttribute('aria-describedby');
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
