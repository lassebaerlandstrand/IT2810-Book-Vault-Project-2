import { Container, Flex, Grid, Group, Image, Paper, Rating, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import styles from './BookInfo.module.css';

type BookInfoProps = {
  book: Book;
};

const BookInfo = ({ book }: BookInfoProps) => {
  console.log(book);

  const tableInfos = [
    { header: 'Title', description: book.title },
    { header: 'Author', description: book.authors.join(', ') },
    { header: 'Publisher', description: book.publisher },
    { header: 'Genres', description: book.genres.join(', ') },
    { header: 'Rating', description: book.rating },
    { header: 'Pages', description: book.pages },
    { header: 'Format', description: book.bookFormat },
    { header: 'Characters', description: book.characters },
    { header: 'ISBN', description: book.isbn },
    { header: 'Language', description: book.language },
  ];

  if (book.series) {
    tableInfos.push({ header: 'Series', description: book.series });
  }

  return (
    <Group justify="center" gap="lg">
      <Container p="xs">
        <Text size="lg" fw={700} component="h1">
          {book.title}
        </Text>
        <Text size="md" c="dimmed">
          {book.authors[0]} {book.authors.length > 1 ? 'et al.' : ''}
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

            <Flex justify="center">
              <Rating value={Math.round(book.rating * 2) / 2} fractions={2} readOnly />
              <Text>{Math.round(book.rating * 10) / 10}</Text>
            </Flex>
          </Container>

          <Text>{book.description}</Text>
        </Flex>

        <Paper shadow="xs" radius="md" className={styles.bgc} p="lg">
          <Grid grow>
            {tableInfos.map((info, index) => (
              <Grid.Col key={index} span={6}>
                <Text c="dimmed" fw={700}>
                  {info.header}
                </Text>
                <Text c="dimmed">{info.description}</Text>
              </Grid.Col>
            ))}
          </Grid>
        </Paper>
      </Flex>
    </Group>
  );
};

export default BookInfo;
