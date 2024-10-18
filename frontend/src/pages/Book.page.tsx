import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Group, Text } from '@mantine/core';
import { fetchBook } from '@/api/dummyApi';
import BookInfo from '@/components/BookInfo/BookInfo';
import { Error404 } from '@/components/ErrorPage/ErrorPage';
import { Book as BookType } from '@/generated/graphql';

const Book = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<BookType | null>();
  useEffect(() => {
    if (bookId) {
      const fetchedBook = fetchBook(bookId);
      setBook(fetchedBook);
    }
  }, [bookId]);

  if (!book) {
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
