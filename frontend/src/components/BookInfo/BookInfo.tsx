import { Container, Flex, Grid, Group, Image, Rating, Spoiler, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import InfoGrid from '../InfoGrid/InfoGrid';
import styles from './BookInfo.module.css';

type BookInfoProps = {
  book: Book;
};

const BookInfo = ({ book }: BookInfoProps) => {
  return (
    <Group justify="center" gap="lg">
      <Container p="xs" className={styles.titleContainer}>
        <Text size="lg" fw={700} component="h1">
          {book.title}
        </Text>
        <Text size="md" c="dimmed">
          {book.authors[0]} {book.authors.length > 1 ? 'et al.' : ''}
        </Text>
      </Container>
      <Grid justify="left" align="top">
        <Grid.Col span={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4 }} h={400}>
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
            <Container p="xs" size="sm">
              <Text>
                {book.genres.slice(0, 3).join(', ')}
                {book.genres.length > 3 ? '...' : null}
              </Text>

              <Flex justify="center" align="center" gap={7} mt="xs">
                <Rating value={Math.round(book.rating * 2) / 2} fractions={2} readOnly />
                <Text fw={500}>{book.rating.toFixed(1)}</Text>
              </Flex>
            </Container>

            <Spoiler maxHeight={250} hideLabel={'Show less'} showLabel={'Show more'}>
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
