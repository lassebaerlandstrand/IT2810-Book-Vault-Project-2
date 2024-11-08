import { ApolloError } from '@apollo/client';
import { IconBookOff } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Grid, Group, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import BookCard from '../BookCard/BookCard';
import Loading from '../Loading/Loading';
import styles from './BookCardGrid.module.css';

type BookCardGridProps = {
  books:
    | Pick<Book, 'id' | 'title' | 'coverImg' | 'rating' | 'authors' | 'numRatings'>[]
    | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

const BookCardGrid = ({ books, loading, error }: BookCardGridProps) => {
  if (loading) {
    return <Loading />;
  }

  if (error || !books) {
    return (
      <Group justify="center" align="flex-start" className={styles.noResultWrapper}>
        <Group align="center">
          <IconBookOff />
          <Text size="xl" fw={500} my="xl">
            Error fetching books
          </Text>
        </Group>
      </Group>
    );
  }

  if (books.length === 0) {
    return (
      <Group justify="center" align="flex-start" className={styles.noResultWrapper}>
        <Group align="center">
          <IconBookOff />
          <Text size="xl" fw={500} my="xl">
            No books found
          </Text>
        </Group>
      </Group>
    );
  }

  return (
    <>
      <Grid my="xl" gutter="md">
        {books.map((book) => (
          <Grid.Col key={book.id} span={{ base: 12, xxs: 6, xs: 4, sm: 3, md: 3 }}>
            <Link to={`/book/${book.id}`} className={styles.link}>
              <BookCard book={book} />
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default BookCardGrid;
