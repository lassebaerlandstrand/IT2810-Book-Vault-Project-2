import { Card, Image, Text } from '@mantine/core';
import { BookContent } from '@/pages/Home.page';

type BookCardProps = {
  book: BookContent;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <>
      <Card p="xl" radius="lg">
        <Card.Section>
          <Image
            src={book.coverImg}
            alt={`Cover image for ${book.title}`}
            fit="contain"
            fallbackSrc="https://placehold.co/200x300?text=Cover%20image%20for%20book"
            radius="lg"
          />
        </Card.Section>
        <Card.Section mt="xs">
          <Text fw={600} component="h4">
            {book.title}
          </Text>
          <Text size="sm" c="dimmed">
            {book.author}
          </Text>
        </Card.Section>
      </Card>
    </>
  );
};

export default BookCard;
