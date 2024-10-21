import { Container, Flex, Group, Image, Rating, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import InfoGrid from '../InfoGrid/InfoGrid';

type BookInfoProps = {
  book: Book;
};

const BookInfo = ({ book }: BookInfoProps) => {
  return (
    <Group justify="center" gap="lg">
      <Container p="xs">
        <Text size="lg" fw={700} component="h1">
          {book.title}
        </Text>
        <Text size="md" c="dimmed">
          {book.authors[0].name} {book.authors.length > 1 ? 'et al.' : ''}
        </Text>
      </Container>
      <Flex gap="sm" justify="center" align="center" direction="row" wrap="wrap">
        <Image
          src={book.coverImg}
          alt={`Cover image for ${book.title}`}
          fit="contain"
          fallbackSrc="https://placehold.co/200x300?text=Cover%20image%20for%20book"
          radius="lg"
          sizes="xs"
        />
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

          <Text>{book.description}</Text>
        </Flex>

        <InfoGrid book={book} />
      </Flex>
    </Group>
  );
};

export default BookInfo;
