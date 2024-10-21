import React, { createContext, ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
  const [UUID, setUUID] = useState<string>(() => {
    const storedUUID = localStorage.getItem('user');
    if (!storedUUID) {
      const newUUID = uuidv4();
      localStorage.setItem('user', newUUID);
      return newUUID;
    }
    return storedUUID;
  });

  // Dummy data
  const name = 'Cool Monkey';
  const at = new Date();

  // WantToRead and haveRead to be implemented in other issues
  const wantToRead: string[] = ['7046495-lover-mine'];
  const haveRead: string[] = ['7046495-lover-mine'];

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
  return (
    <UserContext.Provider value={{ UUID, name, at, wantToRead, haveRead, ratings }}>
      {children}
    </UserContext.Provider>
  );
};
