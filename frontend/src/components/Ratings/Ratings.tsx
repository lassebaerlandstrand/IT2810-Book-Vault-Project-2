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

  const limit: number = 3;
  const UUID: string = useUser().info.UUID;

  const { ratings, pagination, total, loading, error } = useBookRatings({
    bookID: book.id,
    limit: limit,
    offset: page,
    userUUID: UUID,
  });

  const {
    rating: yourRating,
    loading: yourLoading,
    error: yourError,
    refetch: refetchYourRating,
  } = useYourBookRating({
    bookID: book.id,
    userUUID: UUID,
  });

  const [reviews, setReviews] = useState<RatingType[]>([]);

  useEffect(() => {
    if (ratings) {
      setReviews([...reviews, ...(ratings as RatingType[])]);
    }
  }, [ratings]);

  const {
    submitReview,
    review: newReview,
    loading: reviewLoading,
    error: reviewError,
  } = makeReview();

  const { submitUpdate, success: success, loading: l, error: e } = updateReview();

  const toggleTextbox = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    if (yourRating) {
      setRating(yourRating.rating);
      setText(yourRating.description);
    }
  }, [yourRating]);

  const upPage = () => {
    setPage(page + 1);
  };

  const cancel = () => {
    if (yourRating) {
      setRating(yourRating.rating);
      setText(yourRating.description);
    }
    toggleTextbox();
  };
  const update = () => {
    if (yourRating) {
      submitUpdate({
        reviewUUID: yourRating.UUID,
        description: text,
        rating: rating,
      });
      toggleTextbox();
      setRating(1);
      setText('');
    }
    refetchYourRating();
  };

  const submit = () => {
    setVisible(false);
    submitReview({
      userUUID: UUID,
      bookID: book.id,
      description: text,
      rating: rating,
    });
    refetchYourRating();
    setRating(1);
    setText('');
  };

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
              <Button variant="filled" color="red" onClick={toggleTextbox}>
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
