import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Group, Text } from '@mantine/core';
import { fetchBook } from '@/api/dummyApi';
import BookInfo from '@/components/BookInfo/BookInfo';
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
    return <Text>Error</Text>;
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
