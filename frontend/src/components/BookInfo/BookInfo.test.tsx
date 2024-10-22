import { render, screen } from '@test-utils';
import { dummyBook } from '../../../test-utils/testVars';
import BookInfo from './BookInfo';

describe('BookInfo component', () => {
  test('renders the rating properly', () => {
    render(<BookInfo book={dummyBook} />);

    expect(screen.getAllByText(dummyBook.rating.toFixed(1))).toHaveLength(2);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<BookInfo book={dummyBook} />);
    const attributesToRemove = [
      ...document.body.querySelectorAll('div [id^="mantine"]'),
      ...document.body.querySelectorAll('div [for^="mantine"]'),
    ]; // Because Mantine uses random ids which causes snapshots to fail
    attributesToRemove.forEach((element) => {
      element.removeAttribute('for');
      element.removeAttribute('id');
      element.removeAttribute('aria-describedby');
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
