import { createContext, ReactNode } from 'react';
import { Button, Flex, Loader, Stack, Text } from '@mantine/core';
import { User } from '@/generated/graphql';
import { makeUser } from '@/hooks/makeUser';
import { useUserHook } from '@/hooks/useUserHook';
import styles from './userContext.module.css';

interface UserContextProps {
  info: User;
  secret: string;
  setUser: (user: User) => void;
}

const genNewUser = () => {
  localStorage.removeItem('userID');
  window.location.reload();
};

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const userFunction = () => {
    const UUID = localStorage.getItem('userID');
    if (UUID) {
      const data = useUserHook({ UUID });

      // useUserHook returns user without secret
      // so it has to be added to complete the user
      return data;
    }
    const newUser = makeUser();

    // Check that it was successfull
    if (newUser.user && newUser.user.secret) {
      localStorage.setItem('userID', newUser.user.UUID);
      localStorage.setItem('secret', newUser.user.secret);
    }

    // secret is returned for first time user,
    // so we dont have to add it
    return newUser;
  };

  const { user, loading, error } = userFunction();
  const secret = localStorage.getItem('secret');

  if (loading) {
    return (
      <Flex justify="center" align="center" className={styles.centeredOnPage}>
        <Stack align="center">
          <Text size="lg" component="h1">
            Fetching user data
          </Text>
          <Loader />
        </Stack>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" className={styles.centeredOnPage}>
        <Stack align="center">
          <Text c="red" size="lg">
            Error fetching user data
          </Text>
        </Stack>
      </Flex>
    );
  }

  if (!user) {
    return (
      <Flex justify="center" align="center" className={styles.centeredOnPage}>
        <Stack align="center">
          <Text c="red" size="lg">
            Error fetching user data
          </Text>
          <Flex w="30rem">
            <Text size="lg" ta="center">
              This error may be caused by the user your userId reference having been removed from
              the database. Would you like to create a new user?
            </Text>
          </Flex>
          <Button onClick={genNewUser}>New user</Button>
        </Stack>
      </Flex>
    );
  }

  if (!secret) {
    return (
      <Flex justify="center" align="center" className={styles.centeredOnPage}>
        <Stack align="center">
          <Text c="red" size="lg">
            Missing credentials
          </Text>
          <Flex w="30rem">
            <Text size="lg" ta="center">
              You have missing credentials. Would you like to create a new user?
            </Text>
          </Flex>
          <Button onClick={genNewUser}>New user</Button>
        </Stack>
      </Flex>
    );
  }

  const setUser = () => {};

  return (
    <UserContext.Provider value={{ info: user as User, secret: secret, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
