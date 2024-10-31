import { useQuery } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { useUser } from '@/contexts/UserFunctions';
import { makeReview } from '@/hooks/makeReview';
import { updateReview } from '@/hooks/updateReview';
import { useYourBookReview } from '@/hooks/useYourBookReview';
import { theme } from '@/theme';
import { dummyBook } from '../../../test-utils/testVars';
import Reviews from './Reviews';

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
          <Reviews book={dummyBook} updateAvgRating={vi.fn()} />
        </MemoryRouter>
      </MantineProvider>
    </MockedProvider>
  );
};

describe('Reviews Component', () => {
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
