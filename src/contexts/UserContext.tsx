
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'relationship_manager' | 'team_lead' | 'head_of_department';

// Types for team members
export interface TeamMember {
  id: string;
  name: string;
  role: UserRole;
}

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
  setUserName: (name: string) => void;
  selectedTeamMemberId: string | null;
  setSelectedTeamMemberId: (id: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>('relationship_manager');
  const [userName, setUserName] = useState('John Doe');
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState<string | null>(null);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setSelectedTeamMemberId(null); // Reset selected team member when role changes
  };

  return (
    <UserContext.Provider value={{ 
      role, 
      setRole: handleRoleChange, 
      userName, 
      setUserName,
      selectedTeamMemberId,
      setSelectedTeamMemberId
    }}>
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
