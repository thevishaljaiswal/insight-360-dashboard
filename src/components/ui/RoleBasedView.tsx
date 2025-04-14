
import { ReactNode } from 'react';
import { useUser, UserRole } from '@/contexts/UserContext';

interface RoleBasedViewProps {
  roles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
  exact?: boolean; // New property to determine exact role matching
}

export default function RoleBasedView({
  roles,
  children,
  fallback = null,
  exact = false,
}: RoleBasedViewProps) {
  const { role } = useUser();

  if (exact) {
    // Match exact role
    if (roles.includes(role)) {
      return <>{children}</>;
    }
  } else {
    // Original behavior - include if role is in roles array
    if (roles.includes(role)) {
      return <>{children}</>;
    }
  }

  return <>{fallback}</>;
}
