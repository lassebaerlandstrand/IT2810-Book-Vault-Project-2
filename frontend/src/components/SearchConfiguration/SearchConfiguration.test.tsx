import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchConfiguration from './SearchConfiguration';
import { fetchAuthors, fetchGenres, fetchPublishers } from '@/api/dummyApi';
import { Mock } from 'vitest';

vi.mock('@/api/dummyApi');

describe('SearchConfiguration', () => {
  beforeEach(() => {
    (fetchGenres as Mock).mockReturnValue(['Fiction', 'Non-Fiction']);
    (fetchPublishers as Mock).mockReturnValue(['Publisher1', 'Publisher2']);
    (fetchAuthors as Mock).mockReturnValue(['Author1', 'Author2']);
  });

  test('renders sort by options', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration />
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
        <SearchConfiguration />
      </MemoryRouter>
    );

    expect(screen.getByText('Ascending')).toBeInTheDocument();
    expect(screen.getByText('Descending')).toBeInTheDocument();
  });

  test('renders genre options', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration />
      </MemoryRouter>
    );

    expect(screen.getByText('Genres')).toBeInTheDocument();
    expect(screen.getByText('Fiction')).toBeInTheDocument();
    expect(screen.getByText('Non-Fiction')).toBeInTheDocument();
  });

  test('renders publisher options', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration />
      </MemoryRouter>
    );

    expect(screen.getByText('Publisher')).toBeInTheDocument();
    expect(screen.getByText('Publisher1')).toBeInTheDocument();
    expect(screen.getByText('Publisher2')).toBeInTheDocument();
  });

  test('renders author options', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration />
      </MemoryRouter>
    );

    expect(screen.getByText('Authors')).toBeInTheDocument();
    expect(screen.getByText('Author1')).toBeInTheDocument();
    expect(screen.getByText('Author2')).toBeInTheDocument();
  });

  test('handles sort by change', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Author name'));
    expect(screen.getByText('Author name')).toHaveClass('mantine-SegmentedControl-active');
  });

  test('handles sort order change', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Descending'));
    expect(screen.getByText('Descending')).toHaveClass('mantine-SegmentedControl-active');
  });

  test('handles genre selection change', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Genres'));
    fireEvent.click(screen.getByText('Fiction'));
    expect(screen.getByText('Fiction')).toHaveClass('mantine-MultiSelect-value');
  });

  test('handles publisher selection change', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Publisher'));
    fireEvent.click(screen.getByText('Publisher1'));
    expect(screen.getByText('Publisher1')).toHaveClass('mantine-MultiSelect-value');
  });

  test('handles author selection change', () => {
    render(
      <MemoryRouter>
        <SearchConfiguration />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Authors'));
    fireEvent.click(screen.getByText('Author1'));
    expect(screen.getByText('Author1')).toHaveClass('mantine-MultiSelect-value');
  });
});