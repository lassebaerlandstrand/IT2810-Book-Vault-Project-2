import { IconBookOff } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Grid, Group, Text } from '@mantine/core';
import { Book } from '@/generated/graphql';
import BookCard from '../BookCard/BookCard';
import RatingCard from '../RatingCard/RatingCard';
import styles from './RatingGrid.module.css';

type BookRating = {
  id: string;
  rating: number;
};
type BookCardGridProps = {
  books: Book[];
  ratings?: BookRating[];
};

const RatingGrid = (props: BookCardGridProps) => {
  if (props.books.length === 0) {
    return (
      <Group justify="center" align="center" className={styles.noResultWrapper}>
        <IconBookOff />
        <Text size="xl" fw={700} my="xl">
          No books found
        </Text>
      </Group>
    );
  }

  return (
    <>
      <Grid my="xl" gutter="md">
        {props.books.map((book, index) => (
          <Grid.Col key={book.id} span={{ base: 12 }}>
            <Link to={`/book/${book.id}`} className={styles.link}>
              {props.ratings ? (
                <RatingCard
                  book={book}
                  rating={props.ratings[index].rating}
                  review={
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at ante et leo vulputate feugiat vel vitae neque. Fusce scelerisque orci sit amet ultricies consectetur. Nullam egestas volutpat ligula, a fringilla lacus posuere eget. Curabitur efficitur placerat enim non faucibus. Nam luctus facilisis mauris at bibendum. Quisque sit amet nisl aliquet, mattis orci sed, ullamcorper lectus. Vivamus sit amet suscipit metus. In hendrerit massa vitae sapien aliquet, et sagittis odio viverra. Suspendisse vestibulum mi quis purus euismod, non suscipit nisi hendrerit. Quisque placerat vitae elit a sagittis. Phasellus ac erat lobortis dolor volutpat feugiat. Donec vel ultrices turpis.'
                  }
                  at={new Date()}
                />
              ) : (
                <BookCard book={book} />
              )}
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default RatingGrid;
