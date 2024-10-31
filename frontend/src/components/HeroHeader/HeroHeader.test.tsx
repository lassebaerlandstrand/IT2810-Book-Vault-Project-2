import { render, screen } from '@test-utils';
import { MemoryRouter } from 'react-router-dom';
import { useRandomBook } from '@/hooks/useRandomBook';
import { HeroHeader } from './HeroHeader';

vi.mock('@/hooks/useRandomBook');

describe('HeroHeader component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    (useRandomBook as jest.Mock).mockReturnValue({ id: '1', loading: false, error: null });

    const { asFragment } = render(
      <MemoryRouter>
        <HeroHeader />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('shows loading state correctly', () => {
    (useRandomBook as jest.Mock).mockReturnValue({ id: null, loading: true, error: null });

    render(
      <MemoryRouter>
        <HeroHeader />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('button', { name: /try your luck with a random book/i })
    ).toBeDisabled();
  });

  it('handles error state correctly', () => {
    (useRandomBook as jest.Mock).mockReturnValue({
      id: null,
      loading: false,
      error: new Error('Error'),
    });

    render(
      <MemoryRouter>
        <HeroHeader />
      </MemoryRouter>
    );

    expect(
      screen.queryByRole('button', { name: /try your luck with a random book/i })
    ).not.toBeInTheDocument();
  });

  it('links to the correct URL when a book ID is present', () => {
    (useRandomBook as jest.Mock).mockReturnValue({ id: '1', loading: false, error: null });

    render(
      <MemoryRouter>
        <HeroHeader />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /try your luck with a random book/i });
    expect(link).toHaveAttribute('href', '/book/1');
  });

  it('links to the home page when no book ID is present', () => {
    (useRandomBook as jest.Mock).mockReturnValue({ id: null, loading: false, error: null });

    render(
      <MemoryRouter>
        <HeroHeader />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /try your luck with a random book/i });
    expect(link).toHaveAttribute('href', '/');
  });
});
