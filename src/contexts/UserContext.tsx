
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'relationship_manager' | 'team_lead' | 'head_of_department';

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
  setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>('relationship_manager');
  const [userName, setUserName] = useState('John Doe');

  return (
    <UserContext.Provider value={{ role, setRole, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
