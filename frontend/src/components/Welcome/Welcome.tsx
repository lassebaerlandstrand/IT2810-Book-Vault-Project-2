import { useQuery } from '@apollo/client';
import { Anchor, Flex, Image, Text, Title } from '@mantine/core';
import { GET_BOOKS } from '../../graphql/queries';
import BookVaultLogo from '../../assets/BookVaultLogo.png';
import classes from './Welcome.module.css';

export function Welcome() {
  // TODO: This is an example of how to fetch data
  // limit=10 and offset=0 are the only values we have working mocks for
  // You can make your own query or check out the ones in /src/graphql/queries.ts

  const limit = 10;
  const offset = 0;

  const { data, loading, error } = useQuery(GET_BOOKS, {
    variables: { limit, offset },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
        {data?.books.map((book: any) => (
          <li key={book.id}>
            {book.title} by {book.author}
            <Image src={book.coverImg} alt={`Cover of ${book.title}`} h={100} w={100} />
          </li>
        ))}
      </ul>
    </>
  );
}
