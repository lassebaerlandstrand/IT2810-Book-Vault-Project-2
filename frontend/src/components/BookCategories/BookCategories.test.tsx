import { render, screen } from '@test-utils';
import { MemoryRouter } from 'react-router-dom';
import BookCategories from './BookCategories';

const categories = [
  { name: 'Drama', icon: <svg />, link: '/books/drama' },
  { name: 'Fantasy', icon: <svg />, link: '/books/fantasy' },
  { name: 'Science Fiction', icon: <svg />, link: '/books/scifi' },
];

describe('BookCategories component', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <BookCategories categories={categories} typeOfCategory="Genres" />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('displays the correct category names', () => {
    render(
      <MemoryRouter>
        <BookCategories categories={categories} typeOfCategory="Genres" />
      </MemoryRouter>
    );

    categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
    });
  });

  it('has the correct links for each category', () => {
    render(
      <MemoryRouter>
        <BookCategories categories={categories} typeOfCategory="Genres" />
      </MemoryRouter>
    );

    categories.forEach((category) => {
      const linkElement = screen.getByText(category.name).closest('a');
      expect(linkElement).toHaveAttribute('href', category.link);
    });
  });
});
