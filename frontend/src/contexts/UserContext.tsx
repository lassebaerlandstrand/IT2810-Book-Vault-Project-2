import { createContext, ReactNode } from 'react';
import { Flex, Loader, Stack, Text } from '@mantine/core';
import { User } from '@/generated/graphql';
import { makeUser } from '@/hooks/makeUser';
import { useUserHook } from '@/hooks/useUserHook';
import styles from './userContext.module.css';

interface UserContextProps {
  info: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const userFunction = () => {
    const UUID = localStorage.getItem('userID');
    if (UUID) {
      const oldUser = useUserHook({ UUID });
      return oldUser;
    }
    const newUser = makeUser();
    if (newUser.user) {
      localStorage.setItem('userID', newUser.user.UUID);
    }
    return newUser;
  };

  const { user, loading, error } = userFunction();

  if (loading) {
    return (
      <Flex justify="center" align="center" className={styles.centeredOnPage}>
        <Stack align="center">
          <Text size="lg">Fetching user data</Text>
          <Loader />
        </Stack>
      </Flex>
    );
  }

  if (!user || error) {
    return (
      <Flex justify="center" align="center" className={styles.centeredOnPage}>
        <Stack align="center">
          <Text color="red" size="lg">
            Error fetching user data
          </Text>
        </Stack>
      </Flex>
    );
  }

  const setUser = () => {};

  return (
    <UserContext.Provider value={{ info: user as User, setUser }}>{children}</UserContext.Provider>
  );
};
