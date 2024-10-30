import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Flex, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import EntriesController from '@/components/EntriesController/EntriesController';
import { Error404 } from '@/components/ErrorPage/ErrorPage';
import LoadingCircle from '@/components/Loading/Loading';
import PaginationController from '@/components/PaginationController/PaginationController';
import ReviewStack from '@/components/ReviewStack/ReviewStack';
import { useUser } from '@/contexts/UserFunctions';
import { Review } from '@/generated/graphql';
import { useYourBookReviews } from '@/hooks/useYourBookReviews';
import { getPaginationParams } from '@/utils/pagination';
import { isValidUrlParams } from '@/utils/validateUrlParams';

const formatNumberWithSpaces = (number: string) => number.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

export function ReviewsList() {
  const [searchParams] = useSearchParams();
  const theme = useMantineTheme();
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

  const { page, limit } = getPaginationParams(searchParams);

  const userUUID = useUser().info.UUID;

  const {
    reviews,
    totalReviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useYourBookReviews({
    limit,
    page,
    userUUID,
  });

  const formattedTotalReviews =
    totalReviews != null ? formatNumberWithSpaces(totalReviews.toString()) : '';

  useEffect(() => {
    close();
  }, [isDesktop]);

  if (!isValidUrlParams(searchParams)) {
    return (
      <Error404
        title="Invalid search parameters"
        description="It looks like the search parameters in the URL are incorrect. Please check and try again."
        link="/books"
      />
    );
  }

  if (reviewsError) {
    return (
      <Error404
        title="Error fetching reviews"
        description="Something went wrong fetching reviews."
        link="/books"
      />
    );
  }

  if (isDesktop == null || reviewsLoading) {
    return <LoadingCircle />;
  }

  return (
    <>
      <Flex justify="space-between" align="flex-end" gap="md">
        <Text>{reviewsLoading ? 'Loading...' : `${formattedTotalReviews} results`}</Text>
        <EntriesController />
      </Flex>

      <Flex gap="lg" my="lg">
        <Container flex={1} px={0}>
          <ReviewStack reviews={reviews as Review[]} type="bookReview" />
        </Container>
      </Flex>

      <PaginationController totalBooks={totalReviews} />
    </>
  );
}
