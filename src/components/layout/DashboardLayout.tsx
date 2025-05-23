
import { ReactNode } from 'react';
import Header from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-1 p-6 overflow-auto animate-fade-in">
        {children}
      </main>
    </div>
  );
}
