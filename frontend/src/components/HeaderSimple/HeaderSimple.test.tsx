import { fireEvent, render, screen } from '@test-utils';
import { MemoryRouter } from 'react-router-dom';
import { HeaderSimple } from '@/components/HeaderSimple/HeaderSimple';
import classes from './HeaderSimple.module.css';

describe('HeaderSimple Component', () => {
  test('renders navigation links correctly', () => {
    render(
      <MemoryRouter>
        <HeaderSimple />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/home/i);
    const booksLink = screen.getByText(/books/i);

    expect(homeLink).toBeInTheDocument();
    expect(booksLink).toBeInTheDocument();
  });

  test('updates active link on click', () => {
    render(
      <MemoryRouter>
        <HeaderSimple />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/home/i);
    const booksLink = screen.getByText(/books/i);

    expect(homeLink).toHaveClass(classes.active);
    expect(booksLink).not.toHaveClass(classes.active);

    fireEvent.click(booksLink);

    expect(booksLink).toHaveClass(classes.active);
    expect(homeLink).not.toHaveClass(classes.active);
  });
});
