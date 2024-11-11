import { NavLink, useParams } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Flex, Text } from '@mantine/core';
import { useBook } from '@/hooks/useBook';
import styles from './Breadcrumbs.module.css';

const DynamicBookBreadcrumb = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const book = useBook({ bookId });

  return <Text lineClamp={1}>{book.book?.title}</Text>;
};

const routes = [{ path: '/books/:bookId', breadcrumb: DynamicBookBreadcrumb }];

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <Flex justify="left" w="100%" pb={20}>
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <>
          <NavLink to={match.pathname} className={styles.link}>
            {breadcrumb}
          </NavLink>
          {index < breadcrumbs.length - 1 && (
            <Text mx={5} c="dimmed">
              /
            </Text>
          )}
        </>
      ))}
    </Flex>
  );
};
