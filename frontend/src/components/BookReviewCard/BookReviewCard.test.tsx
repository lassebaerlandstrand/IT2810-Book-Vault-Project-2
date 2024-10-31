import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { theme } from '@/theme';
import { dummyBook } from '../../../test-utils/testVars';
import BookReviewCard from './BookReviewCard';

const dummyReview = {
  UUID: 'review-1',
  rating: 2,
  description: 'Great book!',
  at: '2023-10-30T12:00:00Z',
};

describe('BookReviewCard Component', () => {
  test('shows error when missing book', async () => {
    render(
      <MantineProvider theme={theme}>
        <BookReviewCard review={dummyReview} />
      </MantineProvider>
    );
    expect(
      screen.getByText('Type of ReviewCard is set to bookReview, but user not set')
    ).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <MantineProvider theme={theme}>
        <BookReviewCard review={{ ...dummyReview, book: dummyBook }} />
      </MantineProvider>
    );

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
