import { render } from '@test-utils';
import { dummyBook } from '../../../test-utils/testVars';
import BookCard from './BookCard';

describe('Bookcard component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<BookCard book={dummyBook} />);
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
