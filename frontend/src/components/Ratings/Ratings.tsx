import { useEffect, useRef, useState } from 'react';
import { Button, Flex, Grid, Group, Rating, Skeleton, Stack, Text, Textarea } from '@mantine/core';
import { useUser } from '@/contexts/UserFunctions';
import { Book, Rating as RatingType } from '@/generated/graphql';
import { makeReview } from '@/hooks/makeReview';
import { updateReview } from '@/hooks/updateReview';
import { useBookRatings } from '@/hooks/useBookRatings';
import { useYourBookRating } from '@/hooks/useYourBookRating';
import RatingGrid from '../RatingGrid/RatingGrid';
import styles from './Ratings.module.css';

type RatingsProps = {
  book: Book;
};

const Ratings = ({ book }: RatingsProps) => {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');
  const [page, setPage] = useState(0);
  const [reviews, setReviews] = useState<RatingType[]>([]);

  const limit: number = 3;

  const UUID: string = useUser().info.UUID;

  // Fetch other peoples reviews of the book (if there are any)
  const { ratings, pagination, total, loading, error } = useBookRatings({
    bookID: book.id,
    limit: limit,
    offset: page,
    userUUID: UUID,
  });

  // Fetch your review of the book (if it exists)
  const {
    rating: yourRating,
    loading: yourLoading,
    error: yourError,
    refetch: refetchYourRating,
  } = useYourBookRating({
    bookID: book.id,
    userUUID: UUID,
  });

  // For submitting a review
  const {
    submitReview,
    review: newReview,
    loading: reviewLoading,
    error: reviewError,
  } = makeReview();

  // For updating reviews
  const { submitUpdate, success: success, loading: l, error: e } = updateReview();

  // Toggle the review
  const toggleReviewDisplay = () => {
    setVisible((prev) => !prev);
  };

  // Increase pagination page when clicking "load more"
  const upPage = () => {
    setPage(page + 1);
  };

  // Cancel update to review
  const cancel = () => {
    if (yourRating) {
      setRating(yourRating.rating);
      setText(yourRating.description);
    }
    toggleReviewDisplay();
  };

  // Update review
  const update = () => {
    if (yourRating) {
      submitUpdate({
        reviewUUID: yourRating.UUID,
        description: text,
        rating: rating,
      });
      toggleReviewDisplay();
      setRating(1);
      setText('');
    }
  };

  // Submit review
  const submit = () => {
    setVisible(false);
    submitReview({
      userUUID: UUID,
      bookID: book.id,
      description: text,
      rating: rating,
    });
    setRating(1);
    setText('');
  };

  // Whenever you get more reviews, add them
  useEffect(() => {
    if (ratings) {
      setReviews([...reviews, ...(ratings as RatingType[])]);
    }
  }, [ratings]);

  // Refetch your review after either posting one or updating it
  useEffect(() => {
    refetchYourRating();
  }, [success, newReview]);

  // For updating reviews
  useEffect(() => {
    if (yourRating) {
      setRating(yourRating.rating);
      setText(yourRating.description);
    }
  }, [yourRating]);

  // For scrolling to top when reaching bottom
  const topOfRating = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (topOfRating.current)
      window.scrollTo({
        top: topOfRating.current.offsetTop,
        behavior: 'smooth',
      });
  };

  return (
    <Group justify="left" gap="lg" ref={topOfRating}>
      <Stack gap="sm" className={styles.gridWidth}>
        <Text size="xl" fw={700}>
          Reviews
        </Text>
        {!visible ? (
          <Grid justify="Space-between">
            <Grid.Col span="auto">
              <Button variant="filled" color="red" onClick={toggleReviewDisplay}>
                {!yourRating ? 'Give Review' : 'Edit Review'}
              </Button>
            </Grid.Col>
            <Grid.Col span="auto">
              <Flex justify="right" align="center" gap={7} mt="xs">
                <Rating value={Math.round(book.rating * 2) / 2} fractions={2} readOnly />
                <Text fw={500}>{book.rating.toFixed(1)}</Text>
              </Flex>
            </Grid.Col>
          </Grid>
        ) : (
          <></>
        )}

        {visible ? (
          <>
            <Rating size="xl" value={rating} onChange={setRating} />

            <Textarea
              value={text}
              onChange={(event) => setText(event.currentTarget.value)}
              label="Your review"
            />

            <Flex justify="Right" gap="lg">
              <Button variant="filled" color="gray" onClick={cancel}>
                Cancel
              </Button>
              {yourRating ? (
                <Button variant="filled" color="red" onClick={update}>
                  Update Review
                </Button>
              ) : (
                <Button variant="filled" color="red" onClick={submit}>
                  Submit Review
                </Button>
              )}
            </Flex>
          </>
        ) : (
          <></>
        )}

        {reviewLoading ? <Skeleton height={100} mt={6} radius="xl" /> : <></>}
        {loading ? (
          <>
            <Skeleton height={100} mt={6} radius="xl" />
            <Skeleton height={100} mt={6} radius="xl" />
            <Skeleton height={100} mt={6} radius="xl" />
          </>
        ) : (
          <></>
        )}

        {!visible && yourRating ? (
          <RatingGrid reviews={[yourRating] as RatingType[]} type={'pfp'} />
        ) : (
          <></>
        )}

        <RatingGrid reviews={reviews as RatingType[]} type={'pfp'} />

        {!pagination?.isLastPage ? (
          <Flex justify="center" align="center">
            <Button variant="filled" color="red" onClick={upPage}>
              Load more
            </Button>
          </Flex>
        ) : (
          <Flex justify="center" align="center">
            <Button variant="filled" color="red" onClick={scrollToTop}>
              Scroll to top
            </Button>
          </Flex>
        )}
      </Stack>
    </Group>
  );
};

export default Ratings;
