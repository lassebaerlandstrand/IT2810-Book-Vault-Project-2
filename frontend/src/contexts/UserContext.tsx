import React, { createContext, ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface UserContextProps {
  UUID: string;
  name: string;
  at: Date;
  wantToRead: string[];
  haveRead: string[];
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

  const name = 'fdsds';
  const at = new Date();
  const wantToRead: string[] = [];
  const haveRead: string[] = [];

  return (
    <UserContext.Provider value={{ UUID, name, at, wantToRead, haveRead }}>
      {children}
    </UserContext.Provider>
  );
};
