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
  { header: 'Characters', description: dummyBook.characters }, // Only object in JSON
  { header: 'ISBN', description: dummyBook.isbn },
  { header: 'Language', description: dummyBook.language },
];

describe('InfoGrid component', () => {
  test('renders the InfoGrid component properly based on input book', () => {
    render(<InfoGrid book={dummyBook} />);

    tableInfos.forEach((info) => {
      const description =
        info.header === 'Characters'
          ? JSON.parse(dummyBook.characters.replace(/'/g, '"')).join(', ') // TODO: Temporary till when characters has array type
          : info.description;
      expect(screen.getByText(info.header)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<InfoGrid book={dummyBook} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
