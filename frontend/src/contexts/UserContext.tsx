import React, { createContext, ReactNode } from 'react';
import { Text } from '@mantine/core';
import { makeUser } from '@/hooks/makeUser';
import { useUserHook } from '@/hooks/useUserHook';

type BookRating = {
  id: string;
  rating: number;
  description: string;
  at: Date;
};

interface UserContextProps {
  UUID: string;
  name: string;
  at: Date;
  wantToRead: string[];
  haveRead: string[];
  ratings: BookRating[];
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userFunction = () => {
    const UUID = localStorage.getItem('userID');
    if (UUID) {
      const oldUser = useUserHook({ UUID });
      console.log(oldUser);
      return oldUser;
    } else {
      const newUser = makeUser();
      if (newUser.user) localStorage.setItem('userID', newUser.user.UUID);
      console.log(newUser);
      return newUser;
    }
  };
  const { user, loading, error } = userFunction();

  const ratings: BookRating[] = [
    {
      id: '7046495-lover-mine',
      rating: 5,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at ante et leo vulputate feugiat vel vitae neque. Fusce scelerisque orci sit amet ultricies consectetur. Nullam egestas volutpat ligula, a fringilla lacus posuere eget. Curabitur efficitur placerat enim non faucibus. Nam luctus facilisis mauris at bibendum. Quisque sit amet nisl aliquet, mattis orci sed, ullamcorper lectus. Vivamus sit amet suscipit metus. In hendrerit massa vitae sapien aliquet, et sagittis odio viverra. Suspendisse vestibulum mi quis purus euismod, non suscipit nisi hendrerit. Quisque placerat vitae elit a sagittis. Phasellus ac erat lobortis dolor volutpat feugiat. Donec vel ultrices turpis.',
      at: new Date(),
    },
    {
      id: '6917952-burned',
      rating: 4.5,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at ante et leo vulputate feugiat vel vitae neque. Fusce scelerisque orci sit amet ultricies consectetur. Nullam egestas volutpat ligula, a fringilla lacus posuere eget. Curabitur efficitur placerat enim non faucibus. Nam luctus facilisis mauris at bibendum. Quisque sit amet nisl aliquet, mattis orci sed, ullamcorper lectus. Vivamus sit amet suscipit metus. In hendrerit massa vitae sapien aliquet, et sagittis odio viverra. Suspendisse vestibulum mi quis purus euismod, non suscipit nisi hendrerit. Quisque placerat vitae elit a sagittis. Phasellus ac erat lobortis dolor volutpat feugiat. Donec vel ultrices turpis.',
      at: new Date(),
    },
  ];

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (user)
    return (
      <UserContext.Provider
        value={{
          UUID: user.UUID,
          name: user.name,
          at: user.at,
          wantToRead: user.wantToRead,
          haveRead: user.haveRead,
          ratings,
        }}
      >
        {children}
      </UserContext.Provider>
    );
};
