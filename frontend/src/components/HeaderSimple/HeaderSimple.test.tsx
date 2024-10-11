import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HeaderSimple } from './HeaderSimple';

describe('HeaderSimple Component', () => {
  test('renders all the links', () => {
    render(
      <MemoryRouter>
        <HeaderSimple />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/HOME/i);
    const booksLink = screen.getByText(/BOOKS/i);

    expect(homeLink).toBeInTheDocument();
    expect(booksLink).toBeInTheDocument();
  });

  test('changes active link on click', () => {
    render(
      <MemoryRouter>
        <HeaderSimple />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(/HOME/i);
    const booksLink = screen.getByText(/BOOKS/i);

    expect(homeLink).toHaveClass('active');
    expect(booksLink).not.toHaveClass('active');

    fireEvent.click(booksLink);

    expect(booksLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
  });

  test('toggles mobile menu on burger icon click', () => {
    render(
      <MemoryRouter>
        <HeaderSimple />
      </MemoryRouter>
    );

    const mobileMenu = screen.queryByText(/HOME/i);
    expect(mobileMenu).not.toBeVisible();

    const burgerIcon = screen.getByRole('button');
    fireEvent.click(burgerIcon);

    const openedMenu = screen.getByText(/HOME/i);
    expect(openedMenu).toBeVisible();

    fireEvent.click(burgerIcon);
    const closedMenu = screen.queryByText(/HOME/i);
    expect(closedMenu).not.toBeVisible();
  });
});
