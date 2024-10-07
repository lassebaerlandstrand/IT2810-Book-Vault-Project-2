import { Anchor, Flex, Image, Text, Title } from '@mantine/core';
import BookVaultLogo from '../../assets/BookVaultLogo.png';
import classes from './Welcome.module.css';
import { fetchBooks } from '@/api/dummyApi';
import { Book } from '@/generated/graphql';

export function Welcome() {
  
  // TODO: This is an example of how to fetch data
  const books = fetchBooks().slice(0, 10);

  return (
    <>
      <Flex mt={100} justify="center" align="center" gap="md">
        <Image src={BookVaultLogo} h={80} w={80} />
        <Title className={classes.title} ta="center">
          Welcome to the{' '}
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Book Vault
          </Text>
        </Title>
      </Flex>

      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Vite project includes a minimal setup, if you want to learn more on Mantine +
        Vite integration follow{' '}
        <Anchor href="https://mantine.dev/guides/vite/" size="lg">
          this guide
        </Anchor>
        . To get started edit pages/Home.page.tsx file.
      </Text>

      {/* Here are the books we fetched: */}
      <ul>
        {books.map((book: Book) => (
          <li key={book.id}>
            {book.title} by {book.authors.map((author) => author.name).join(', ')}
            <Image src={book.coverImg} alt={`Cover of ${book.title}`} h={100} w={100} />
          </li>
        ))}
      </ul>
    </>
  );
}
