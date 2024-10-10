import { render, screen } from '@test-utils';
import { dummyBook } from '../../../test-utils/testVars';
import BookInfo from './BookInfo';

describe('BookInfo component', () => {
  test('renders the rating properly', () => {
    render(<BookInfo book={dummyBook} />);

    expect(screen.getByText(Math.round(dummyBook.rating * 10) / 10)).toBeInTheDocument();
  });

  it('matches snapshot', async () => {
    const { asFragment } = await render(<BookInfo book={dummyBook} />);
    const attributesToRemove = document.body.querySelectorAll('div [id^="mantine"]'); // Because Mantine uses random ids which causes snapshots to fail
    attributesToRemove.forEach((element) => {
      element.removeAttribute('id');
      element.removeAttribute('aria-describedby');
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
