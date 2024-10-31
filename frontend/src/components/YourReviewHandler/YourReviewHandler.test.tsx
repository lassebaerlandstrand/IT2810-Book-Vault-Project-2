import { useQuery } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { useUser } from '@/contexts/UserFunctions';
import { makeReview } from '@/hooks/makeReview';
import { updateReview } from '@/hooks/updateReview';
import { useYourBookReview } from '@/hooks/useYourBookReview';
import { theme } from '@/theme';
import { dummyBook } from '../../../test-utils/testVars';
import YourReviewHandler from './YourReviewHandler';

vi.mock('@/contexts/UserFunctions', () => ({
  useUser: vi.fn(),
}));

vi.mock('@apollo/client', () => ({
  ...vi.importActual('@apollo/client'),
  useQuery: vi.fn(),
}));

vi.mock('@/hooks/makeReview', () => ({
  makeReview: vi.fn(),
}));

vi.mock('@/hooks/updateReview', () => ({
  updateReview: vi.fn(),
}));

vi.mock('@/hooks/useYourBookReview', () => ({
  useYourBookReview: vi.fn(),
}));

const dummyUser = {
  info: {
    name: 'You',
    UUID: 'UUID1',
  },
};

const dummyReview = {
  UUID: 'review-1',
  rating: 2,
  description: 'Great book!',
  at: '2023-10-30T12:00:00Z',
};

const mockData = {
  bookReviews: {
    reviews: undefined,
    pagination: {
      isLastPage: false,
    },
  },
};

const customRender = () => {
  return render(
    <MockedProvider addTypename={false}>
      <MantineProvider theme={theme}>
        <MemoryRouter>
          <YourReviewHandler book={dummyBook} updateAvgRating={vi.fn()} />
        </MemoryRouter>
      </MantineProvider>
    </MockedProvider>
  );
};

describe('YourReviewHandler Component', () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue(dummyUser);
    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      fetchMore: vi.fn(),
    });
    (makeReview as jest.Mock).mockReturnValue({
      submitReview: vi.fn(),
      updatedRating: undefined,
      loading: false,
    });
    (updateReview as jest.Mock).mockReturnValue({
      submitUpdate: vi.fn(),
      updatedRating: undefined,
      loading: false,
      error: null,
    });
    (useYourBookReview as jest.Mock).mockReturnValue({
      review: undefined,
      refetch: vi.fn(),
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('that "Give Review" and "Cancel" buttons work', async () => {
    customRender();

    // Check that clicking the Give Review and cancel works properly
    expect(screen.getByText('Give Review')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Give Review'));

    expect(screen.getByText('Submit Review')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Your rating')).toBeInTheDocument();
    expect(screen.getByText('Your review')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getByText('Give Review')).toBeInTheDocument();
  });

  test('"Edit Review" option shows up when you have made a review', async () => {
    (useYourBookReview as jest.Mock).mockReturnValue({
      review: dummyReview,
      refetch: vi.fn(),
      loading: false,
      error: undefined,
    });

    customRender();

    expect(screen.getByText('Edit Review')).toBeInTheDocument();
  });

  test('"Cancel" reverts changes you made', async () => {
    (useYourBookReview as jest.Mock).mockReturnValue({
      review: dummyReview,
      refetch: vi.fn(),
      loading: false,
      error: undefined,
    });

    customRender();

    expect(screen.getByText('Edit Review')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Edit Review'));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Updated review text' } });

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getByText(dummyReview.description)).toBeInTheDocument();
  });

  test('submits a new review', async () => {
    const submitReviewMock = vi.fn();
    (makeReview as jest.Mock).mockReturnValue({ submitReview: submitReviewMock, loading: false });

    customRender();

    fireEvent.click(screen.getByText('Give Review'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'A great one!' } });
    fireEvent.click(screen.getByText('Submit Review'));

    await waitFor(() => {
      expect(submitReviewMock).toHaveBeenCalledWith({
        userUUID: dummyUser.info.UUID,
        bookID: dummyBook.id,
        description: 'A great one!',
        rating: 1,
      });
    });
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
