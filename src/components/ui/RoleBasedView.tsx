
import { ReactNode } from 'react';
import { useUser, UserRole } from '@/contexts/UserContext';

interface RoleBasedViewProps {
  roles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export default function RoleBasedView({
  roles,
  children,
  fallback = null,
}: RoleBasedViewProps) {
  const { role } = useUser();

  if (roles.includes(role)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
