import { useEffect, useState } from 'react';
import { Button, Divider, Flex, Grid, Rating, Text, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useUser } from '@/contexts/UserFunctions';
import { Book } from '@/generated/graphql';
import { makeReview } from '@/hooks/makeReview';
import { updateReview } from '@/hooks/updateReview';
import { useYourBookReview } from '@/hooks/useYourBookReview';
import ReviewStack from '../ReviewStack/ReviewStack';

type ReviewProps = {
  book: Book;
};

const YourReviewHandler = ({ book }: ReviewProps) => {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');

  const UUID: string = useUser().info.UUID;
  const secret: string = useUser().secret;

  // Fetch your review of the book (if it exists)
  const { review: yourReview, refetch: refetchYourReview } = useYourBookReview({
    bookID: book.id,
    userUUID: UUID,
  });

  // For submitting a review (NR = new review)
  const {
    submitReview,
    success: createReviewSuccess,
    message: createReviewMessage,
    loading: yourReviewLoading,
  } = makeReview();

  // For updating reviews (UR = updated review)
  const {
    submitUpdate,
    success: updateReviewSuccess,
    message: updateReviewMessage,
    loading: loadingUpdateReview,
  } = updateReview();

  // Toggle the review
  const toggleReviewDisplay = () => {
    setVisible((prev) => !prev);
  };

  // Cancel update to review
  const cancel = () => {
    if (yourReview) {
      setRating(yourReview.rating);
      setText(yourReview.description);
    }
    setVisible(false);
  };

  // Update review
  const update = () => {
    if (yourReview) {
      setVisible(false);

      submitUpdate({
        reviewUUID: yourReview.UUID,
        description: text,
        secret: secret,
        rating,
      });
    }
  };

  // Submit review
  const submit = () => {
    setVisible(false);
    submitReview({
      userUUID: UUID,
      bookID: book.id,
      description: text,
      secret: secret,
      rating,
    });
  };

  useEffect(() => {
    if (!yourReviewLoading && !loadingUpdateReview) {
      refetchYourReview();
    }
  }, [yourReviewLoading, loadingUpdateReview]);

  useEffect(() => {
    notifications.show({
      title: 'Default notification',
      message: 'Do not forget to star Mantine on GitHub! 🌟',
    });
  });

  // For updating reviews
  useEffect(() => {
    if (yourReview) {
      setRating(yourReview.rating);
      setText(yourReview.description);
    }
  }, [yourReview]);

  return (
    <>
      {!visible && !yourReviewLoading && !loadingUpdateReview ? (
        <Grid data-testid="your-review">
          <Grid.Col span="auto">
            <Button
              variant="filled"
              onClick={toggleReviewDisplay}
              aria-label={!yourReview ? 'Give Review' : 'Edit Review'}
            >
              {!yourReview ? 'Give Review' : 'Edit Review'}
            </Button>
          </Grid.Col>
        </Grid>
      ) : (
        <></>
      )}

      {visible ? (
        <>
          <Text size="sm">Your rating</Text>
          <Rating size="xl" value={rating} onChange={setRating} />

          <Text size="sm">Your review</Text>

          <Textarea value={text} onChange={(event) => setText(event.currentTarget.value)} />

          <Flex justify="Right" gap="lg">
            <Button variant="filled" color="gray" onClick={cancel} aria-label="Cancel Review">
              Cancel
            </Button>
            {yourReview ? (
              <Button variant="filled" onClick={update} aria-label="Update Review">
                Update Review
              </Button>
            ) : (
              <Button variant="filled" onClick={submit} aria-label="Submit Review">
                Submit Review
              </Button>
            )}
          </Flex>
        </>
      ) : (
        <></>
      )}

      {!visible && yourReview ? (
        <>
          <ReviewStack
            reviews={[
              {
                UUID: yourReview.UUID,
                at: yourReview.at,
                rating: yourReview.rating,
                description: yourReview.description,
                user: {
                  name: 'Your review',
                  UUID,
                },
              },
            ]}
            type="yourReview"
          />
          <Divider size="xs" label="Other reviews" labelPosition="center" />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default YourReviewHandler;
