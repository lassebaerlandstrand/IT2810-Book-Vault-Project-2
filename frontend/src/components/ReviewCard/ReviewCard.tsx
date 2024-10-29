import { Avatar, Card, Flex, Grid, Image, Rating, Stack, Text } from '@mantine/core';
import { Review as ReviewType } from '@/generated/graphql';
import styles from './ReviewCard.module.css';

type ReviewProps = {
  review: ReviewType;
  type: 'pfp' | 'book' | 'you';
};

const ReviewCard = ({ review, type }: ReviewProps) => {
  if (type == 'book' && !review.book) return <>Type is book but book is not set</>;
  if (type == 'pfp' && !review.user) return <>Type is pfp but user is not set</>;
  if (type == 'you' && !review.user) return <>Type is you but user is not set</>;

  return (
    <>
      <Card p={30} radius="lg" className={styles.card} m="auto">
        <Grid>
          {type == 'book' && review.book ? (
            <Grid.Col span="content" h={200} className={styles.img}>
              <Image
                src={review.book.coverImg}
                alt={`Cover image for ${review.book.title}`}
                fallbackSrc="https://placehold.co/200x300?text=Cover%20image%20for%20book"
                radius="lg"
                fit="contain"
                w="fit-content"
                maw="100%"
                mah="100%"
                m="auto"
              />
            </Grid.Col>
          ) : (
            <></>
          )}
          <Grid.Col span="auto">
            <Grid justify="flex-start">
              {type == 'pfp' && review.user ? (
                <Grid.Col span="content">
                  <Avatar color="blue">
                    {review.user.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')}
                  </Avatar>
                </Grid.Col>
              ) : (
                <></>
              )}
              <Grid.Col span="content">
                <Stack gap={0}>
                  <Text fw={600} component="h4" lineClamp={2} className={styles.bookTitle}>
                    {type == 'book' && review.book
                      ? 'Review of ' + review.book.title
                      : review.user
                        ? review.user.name
                        : '???'}
                  </Text>
                  <Text fw={500} size="sm" fs="italic" lineClamp={2}>
                    {new Date(review.at).toDateString()}
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span="content">
                <Flex justify="center" align="center" gap={7} mt="xs">
                  <Rating value={review.rating} fractions={2} readOnly />
                  <Text fw={500}>{review.rating.toFixed(1)}</Text>
                </Flex>
              </Grid.Col>
              {review.description && review.description != '' ? (
                <Grid.Col span={12}>
                  {type == 'book' ? (
                    <Text lineClamp={5}>{review.description}</Text>
                  ) : (
                    <Text>{review.description}</Text>
                  )}
                </Grid.Col>
              ) : (
                <></>
              )}
            </Grid>
          </Grid.Col>
        </Grid>
      </Card>
    </>
  );
};

export default ReviewCard;
