import { useEffect, useRef, useState } from 'react';
import { Button, Flex, Grid, Group, Rating, Skeleton, Stack, Text, Textarea } from '@mantine/core';
import { useUser } from '@/contexts/UserFunctions';
import { Book, Review as ReviewType } from '@/generated/graphql';
import { makeReview } from '@/hooks/makeReview';
import { updateReview } from '@/hooks/updateReview';
import { useBookReviews } from '@/hooks/useBookReviews';
import { useYourBookReview } from '@/hooks/useYourBookReview';
import ReviewStack from '../ReviewStack/ReviewStack';
import styles from './Reviews.module.css';

type ReviewProps = {
  book: Book;
};

const Reviews = ({ book }: ReviewProps) => {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');
  const [page, setPage] = useState(0);
  const [displayReviews, setReviews] = useState<ReviewType[]>([]);

  const limit: number = 3;

  const UUID: string = useUser().info.UUID;

  // Fetch other peoples reviews of the book (if there are any)
  const { reviews, pagination, total, loading, error } = useBookReviews({
    bookID: book.id,
    limit: limit,
    offset: page,
    userUUID: UUID,
  });

  // Fetch your review of the book (if it exists)
  const {
    review: yourReview,
    loading: yourLoading,
    error: yourError,
    refetch: refetchYourReview,
  } = useYourBookReview({
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
    if (yourReview) {
      setRating(yourReview.rating);
      setText(yourReview.description);
    }
    toggleReviewDisplay();
  };

  // Update review
  const update = () => {
    if (yourReview) {
      submitUpdate({
        reviewUUID: yourReview.UUID,
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
    if (reviews) {
      setReviews([...displayReviews, ...(reviews as ReviewType[])]);
    }
  }, [reviews]);

  // Refetch your review after either posting one or updating it
  useEffect(() => {
    if (success || newReview) refetchYourReview();
  }, [success, newReview]);

  // For updating reviews
  useEffect(() => {
    if (yourReview) {
      setRating(yourReview.rating);
      setText(yourReview.description);
    }
  }, [yourReview]);

  // For scrolling to top when reaching bottom
  const topOfReviews = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (topOfReviews.current)
      window.scrollTo({
        top: topOfReviews.current.offsetTop,
        behavior: 'smooth',
      });
  };

  return (
    <Group justify="left" gap="lg" ref={topOfReviews}>
      <Stack gap="sm" className={styles.gridWidth}>
        <Text size="xl" fw={700}>
          Reviews
        </Text>
        {!visible ? (
          <Grid justify="Space-between">
            <Grid.Col span="auto">
              <Button variant="filled" color="red" onClick={toggleReviewDisplay}>
                {!yourReview ? 'Give Review' : 'Edit Review'}
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
              {yourReview ? (
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

        {!visible && yourReview ? (
          <ReviewStack reviews={[yourReview] as ReviewType[]} type={'pfp'} />
        ) : (
          <></>
        )}

        <ReviewStack reviews={displayReviews as ReviewType[]} type={'pfp'} />

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

export default Reviews;
