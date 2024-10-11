import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HeaderSimple } from './HeaderSimple';

describe('HeaderSimple Component', () => {
  test('renders all the links', () => {
    render(
      <Router>
        <HeaderSimple />
      </Router>
    );

    const homeLink = screen.getByText(/HOME/i);
    const booksLink = screen.getByText(/BOOKS/i);

    expect(homeLink).toBeInTheDocument();
    expect(booksLink).toBeInTheDocument();
  });

  test('changes active link on click', () => {
    render(
      <Router>
        <HeaderSimple />
      </Router>
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
      <Router>
        <HeaderSimple />
      </Router>
    );

    const mobileMenu = screen.queryByRole('menu');
    expect(mobileMenu).not.toBeInTheDocument();

    const burgerIcon = screen.getByRole('button');
    fireEvent.click(burgerIcon);

    const openedMenu = screen.getByRole('menu');
    expect(openedMenu).toBeInTheDocument();

    fireEvent.click(burgerIcon);
    const closedMenu = screen.queryByRole('menu');
    expect(closedMenu).not.toBeInTheDocument();
  });
});
