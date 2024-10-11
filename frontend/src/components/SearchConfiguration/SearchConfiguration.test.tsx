import { render, screen } from '@test-utils';
import { MemoryRouter } from 'react-router-dom';
import SearchConfiguration from './SearchConfiguration';

vi.mock('@/api/dummyApi');

describe('SearchConfiguration', () => {
  const genres = ['Fiction', 'Non-Fiction'];
  const publishers = ['Publisher1', 'Publisher2'];
  const authors = ['Author1', 'Author2'];

  test('renders SearchConfiguration', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <SearchConfiguration genres={[]} publishers={[]} authors={[]} />
      </MemoryRouter>
    );
    const attributesToRemove = document.body.querySelectorAll('div [id^="mantine"]'); // Because Mantine uses random ids which causes snapshots to fail
    attributesToRemove.forEach((element) => {
      element.removeAttribute('id');
      element.removeAttribute('aria-describedby');
    });
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders sort by options', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration genres={genres} publishers={publishers} authors={authors} />
      </MemoryRouter>
    );

    expect(screen.getByText('Sort by:')).toBeInTheDocument();
    expect(screen.getByText('Book name')).toBeInTheDocument();
    expect(screen.getByText('Author name')).toBeInTheDocument();
    expect(screen.getByText('Publisher name')).toBeInTheDocument();
  });

  test('renders sort order options', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration genres={genres} publishers={publishers} authors={authors} />
      </MemoryRouter>
    );

    expect(screen.getByText('Ascending')).toBeInTheDocument();
    expect(screen.getByText('Descending')).toBeInTheDocument();
  });

  test('renders genre options', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration genres={genres} publishers={publishers} authors={authors} />
      </MemoryRouter>
    );

    expect(screen.getByText('Genres')).toBeInTheDocument();
    expect(screen.getByText('Fiction')).toBeInTheDocument();
    expect(screen.getByText('Non-Fiction')).toBeInTheDocument();
  });

  test('renders publisher options', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration genres={genres} publishers={publishers} authors={authors} />
      </MemoryRouter>
    );

    expect(screen.getByText('Publisher')).toBeInTheDocument();
    expect(screen.getByText('Publisher1')).toBeInTheDocument();
    expect(screen.getByText('Publisher2')).toBeInTheDocument();
  });

  test('renders author options', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration genres={genres} publishers={publishers} authors={authors} />
      </MemoryRouter>
    );

    expect(screen.getByText('Authors')).toBeInTheDocument();
    expect(screen.getByText('Author1')).toBeInTheDocument();
    expect(screen.getByText('Author2')).toBeInTheDocument();
  });
});
