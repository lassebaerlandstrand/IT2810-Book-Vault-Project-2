import { Link } from 'react-router-dom';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import { Illustration404 } from './Illustration404';
import styles from './ErrorPage.module.css';

type ErrorPageProps = {
  title?: string;
  description?: string;
  link?: string;
};

// From ui.mantine.dev
export function ErrorPage({
  title = 'Nothing to see here',
  description = 'Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL.',
  link = '/',
}: ErrorPageProps) {
  return (
    <Container className={styles.container}>
      <Illustration404 className={styles.image} />
      <Container className={styles.content}>
        <Title className={styles.title}>{title}</Title>
        <Text c="dimmed" size="lg" ta="center" className={styles.description}>
          {description}
        </Text>
        <Group justify="center">
          <Link to={link}>
            <Button size="md">Take me back to safe ground</Button>
          </Link>
        </Group>
      </Container>
    </Container>
  );
}
