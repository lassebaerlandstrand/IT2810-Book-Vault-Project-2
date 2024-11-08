import { Flex, Grid, Group, Image, Spoiler, Stack, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import InfoGrid from '../InfoGrid/InfoGrid';
import { Ratings } from '../Ratings/Ratings';

type BookInfoProps = {
  book: Book;
};

/**
 * Displays detailed information about a book including cover image, title, authors, and metadata.
 */
const BookInfo = ({ book }: BookInfoProps) => {
  return (
    <Group justify="center" gap="lg">
      <Grid justify="left" align="top">
        <Grid.Col span={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }} mah={400}>
          <Image
            src={book.coverImg}
            alt={`Cover image for ${book.title}`}
            fit="contain"
            fallbackSrc="https://placehold.co/200x300?text=Cover%20image%20for%20book"
            radius="lg"
            sizes="xs"
            w="fit-content"
            maw="100%"
            mah="100%"
            m="auto"
          />
        </Grid.Col>
        <Grid.Col span="auto">
          <Flex gap="sm" justify="center" align="center" direction="row" wrap="wrap">
            <Stack align="center" gap={4}>
              <Text size="lg" fw={700} component="h1">
                {book.title}
              </Text>
              <Text size="md" c="dimmed">
                {book.authors.length > 0 && book.authors[0].name}{' '}
                {book.authors.length > 1 ? 'et al.' : ''}
              </Text>
              <Text ta="center">
                {book.genres
                  .map((genre) => genre.name)
                  .slice(0, 3)
                  .join(', ')}
                {book.genres.length > 3 ? '...' : null}
              </Text>

              <Ratings book={book} justify="center" mt={0} />
            </Stack>

            <Spoiler maxHeight={250} hideLabel="Show less" showLabel="Show more">
              <Text>{book.description}</Text>
            </Spoiler>
          </Flex>
        </Grid.Col>

        <InfoGrid book={book} />
      </Grid>
    </Group>
  );
};

export default BookInfo;
