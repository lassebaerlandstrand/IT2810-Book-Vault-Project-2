import { render, screen } from '@test-utils';
import { MemoryRouter } from 'react-router-dom';
import PopularGenres from './PopularGenres';

describe('PopularGenres component', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <PopularGenres />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the correct category names', () => {
    render(
      <MemoryRouter>
        <PopularGenres />
      </MemoryRouter>
    );

    const categories = [
      'Drama',
      'Historical',
      'Geography',
      'Fantasy/Fiction',
      'Action/Adventure',
      'Literature',
    ];

    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('has the correct links for each category', () => {
    render(
      <MemoryRouter>
        <PopularGenres />
      </MemoryRouter>
    );

    const categories = [
      { name: 'Drama', link: '/books' },
      { name: 'Historical', link: '/books' },
      { name: 'Geography', link: '/books' },
      { name: 'Fantasy/Fiction', link: '/books' },
      { name: 'Action/Adventure', link: '/books' },
      { name: 'Literature', link: '/books' },
    ];

    categories.forEach((category) => {
      const linkElement = screen.getByText(category.name).closest('a');
      expect(linkElement).toHaveAttribute('href', category.link);
    });
  });
});
