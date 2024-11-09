import { useEffect, useState } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Button, Divider, Flex, Grid, Notification, Rating, Text, Textarea } from '@mantine/core';
import { useUser } from '@/contexts/UserFunctions';
import { Book } from '@/generated/graphql';
import { makeReview } from '@/hooks/makeReview';
import { updateReview } from '@/hooks/updateReview';
import { useYourBookReview } from '@/hooks/useYourBookReview';
import ReviewStack from '../ReviewStack/ReviewStack';

type ReviewProps = {
  book: Book;
};

type Notice = {
  message: string;
  success: boolean;
};

/**
 * Handles the creation, display, and updating of a user's review for a specific book.
 * Provides interface for rating, writing, editing and submitting reviews.
 */
const YourReviewHandler = ({ book }: ReviewProps) => {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(1);
  const [text, setText] = useState('');
  const [notifications, setNotifications] = useState<Notice[]>([]);
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
        secret,
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
      secret,
      rating,
    });
  };

  useEffect(() => {
    if (!yourReviewLoading && !loadingUpdateReview) {
      refetchYourReview();
    }
  }, [yourReviewLoading, loadingUpdateReview]);

  useEffect(() => {
    if (!yourReviewLoading && createReviewMessage && typeof createReviewSuccess === 'boolean') {
      setNotifications((prev) => [
        ...prev,
        { message: createReviewMessage, success: createReviewSuccess },
      ]);
    }
  }, [createReviewMessage, createReviewSuccess, yourReviewLoading]);

  useEffect(() => {
    if (!loadingUpdateReview && updateReviewMessage && typeof updateReviewSuccess === 'boolean') {
      setNotifications((prev) => [
        ...prev,
        { message: updateReviewMessage, success: updateReviewSuccess },
      ]);
    }
  }, [loadingUpdateReview, updateReviewSuccess, yourReviewLoading]);

  // For updating reviews
  useEffect(() => {
    if (yourReview) {
      setRating(yourReview.rating);
      setText(yourReview.description);
    }
  }, [yourReview]);

  const removeNotification = (index: number) => {
    setNotifications((prevNotifications) => prevNotifications.filter((_, i) => i !== index));
  };

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
        </>
      ) : (
        <></>
      )}

      {notifications.map((notification, index) =>
        notification.success ? (
          <Notification
            key={index}
            title="Success!"
            color="teal"
            icon={<IconCheck />}
            onClose={() => removeNotification(index)}
          >
            {notification.message}
          </Notification>
        ) : (
          <Notification
            key={index}
            title="Error!"
            color="red"
            icon={<IconX />}
            onClose={() => removeNotification(index)}
          >
            {notification.message}
          </Notification>
        )
      )}

      {!visible && yourReview ? (
        <Divider size="xs" label="Other reviews" labelPosition="center" />
      ) : (
        <></>
      )}
    </>
  );
};

export default YourReviewHandler;
