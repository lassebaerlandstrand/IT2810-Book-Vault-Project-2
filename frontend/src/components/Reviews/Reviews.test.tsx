import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/theme';
import { dummyBook } from '../../../test-utils/testVars';
import Reviews from './Reviews';

const customRender = () => {
  return render(
    <MockedProvider addTypename={false}>
      <MantineProvider theme={theme}>
        <MemoryRouter>
          <Reviews book={dummyBook} updateAvgRating={vi.fn()} />
        </MemoryRouter>
      </MantineProvider>
    </MockedProvider>
  );
};

describe('Reviews Component', () => {
  beforeEach(() => {
    // Mocking BookReviews and YourReviewHandler as these have their own tests

    vi.mock('@/components/BookReviews/BookReviews', () => ({
      default: () => {
        return <div>BookReview mock</div>;
      },
    }));

    vi.mock('@/components/YourReviewHandler/YourReviewHandler', () => ({
      default: () => {
        return <div>YourReviewHandler mock</div>;
      },
    }));
  });

  test('header and average rating renders properly', async () => {
    customRender();

    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText(dummyBook.rating.toFixed(1))).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = customRender();

    const attributesToRemove = [
      ...document.body.querySelectorAll('div [id^="mantine"]'),
      ...document.body.querySelectorAll('div [for^="mantine"]'),
    ]; // Because Mantine uses random ids which causes snapshots to fail
    attributesToRemove.forEach((element) => {
      element.removeAttribute('for');
      element.removeAttribute('id');
      element.removeAttribute('class');
      element.removeAttribute('aria-describedby');
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
