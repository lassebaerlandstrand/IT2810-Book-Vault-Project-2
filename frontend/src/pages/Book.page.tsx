import { useParams } from 'react-router-dom';
import { Container, Group } from '@mantine/core';
import BookInfo from '@/components/BookInfo/BookInfo';
import { Error404 } from '@/components/ErrorPage/ErrorPage';
import Loading from '@/components/Loading/Loading';
import { useBook } from '@/hooks/useBook';

const Book = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { book, loading, error } = useBook({ bookId });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error404
        title="An error occurred"
        description="An error occurred while trying to load the book."
      />
    );
  }

  if (!bookId || !book) {
    return (
      <Error404
        title="Not a valid book"
        description="The book you are looking for does not exist."
        link="/books"
      />
    );
  }

  return (
    <Group justify="center">
      <Container>
        <BookInfo book={book} />
      </Container>
    </Group>
  );
};

export default Book;