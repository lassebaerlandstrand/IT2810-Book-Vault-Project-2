import React, { createContext, ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type BookRating = {
  id: string;
  rating: number;
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
    { id: '7046495-lover-mine', rating: 5 },
    { id: '6917952-burned', rating: 4.5 },
  ];
  return (
    <UserContext.Provider value={{ UUID, name, at, wantToRead, haveRead, ratings }}>
      {children}
    </UserContext.Provider>
  );
};
