
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';
import { 
  Users, Search, Home, CreditCard, FileText, 
  FileCheck, Clock, BarChart3, Settings, Menu, X 
} from 'lucide-react';

const SidebarLink = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive, 
  isCollapsed 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  isActive: boolean; 
  isCollapsed: boolean;
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-all duration-200",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-secondary text-foreground/70 hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && (
        <span className="animate-fade-in font-medium">{label}</span>
      )}
    </Link>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { role } = useUser();
  const location = useLocation();
  
  const sidebarLinks = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/search', icon: Search, label: 'Customer Search' },
    { to: '/customers', icon: Users, label: 'Customers' },
    { to: '/payments', icon: CreditCard, label: 'Payments' },
    { to: '/invoices', icon: FileText, label: 'Invoices' },
    { to: '/deviations', icon: FileCheck, label: 'Deviations' },
    { to: '/schedules', icon: Clock, label: 'Schedules' },
    ...(role !== 'relationship_manager' ? [{ to: '/reports', icon: BarChart3, label: 'Reports' }] : []),
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div 
      className={cn(
        "h-screen sticky top-0 bg-sidebar transition-all duration-300 border-r border-border flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <h1 className="font-medium text-lg animate-fade-in">
            Customer 360
          </h1>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-secondary transition-all"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <div className="flex flex-col py-4 overflow-y-auto flex-1">
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            isActive={location.pathname === link.to}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
              {useUser().userName.slice(0, 1)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{useUser().userName}</span>
              <span className="text-xs text-muted-foreground">
                {role === 'relationship_manager' && 'Relationship Manager'}
                {role === 'team_lead' && 'Team Lead'}
                {role === 'head_of_department' && 'Head of Department'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
