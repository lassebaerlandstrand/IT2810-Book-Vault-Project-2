import { render, screen } from '@test-utils';
import { dummyBook } from '../../../test-utils/testVars';
import InfoGrid from './InfoGrid';

const tableInfos = [
  { header: 'Title', description: dummyBook.title },
  { header: 'Author', description: dummyBook.authors.join(', ') },
  { header: 'Publisher', description: dummyBook.publisher },
  { header: 'Genres', description: dummyBook.genres.join(', ') },
  { header: 'Rating', description: dummyBook.rating },
  { header: 'Pages', description: dummyBook.pages },
  { header: 'Format', description: dummyBook.bookFormat },
  { header: 'Characters', description: dummyBook.characters },
  { header: 'ISBN', description: dummyBook.isbn },
  { header: 'Language', description: dummyBook.language },
];

describe('InfoGrid component', () => {
  test('renders the InfoGrid component properly based on input book', () => {
    render(<InfoGrid book={dummyBook} />);

    tableInfos.forEach((info) => {
      expect(screen.getByText(info.header)).toBeInTheDocument();
      expect(screen.getByText(String(info.description))).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<InfoGrid book={dummyBook} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
