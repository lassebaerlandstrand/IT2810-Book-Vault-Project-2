import { render, screen } from '@test-utils';
import { removeMantineRandomAttributes } from '@/utils/tests';
import { dummyBook } from '../../../test-utils/testVars';
import BookInfo from './BookInfo';

describe('BookInfo component', () => {
  test('renders the rating properly', () => {
    render(<BookInfo book={dummyBook} />);

    expect(screen.getAllByText(dummyBook.rating.toFixed(1))).toHaveLength(2);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<BookInfo book={dummyBook} />);
    removeMantineRandomAttributes();
    expect(asFragment()).toMatchSnapshot();
  });
});
