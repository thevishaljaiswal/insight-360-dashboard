
import { useUser, UserRole } from '@/contexts/UserContext';
import { Users, UserCog, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const RoleCard = ({ 
  role, 
  title, 
  description, 
  icon: Icon, 
  isActive, 
  onClick 
}: { 
  role: UserRole; 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  isActive: boolean; 
  onClick: () => void; 
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-6 rounded-xl border transition-all duration-200 hover-scale cursor-pointer subtle-shadow",
        isActive 
          ? "bg-primary/5 border-primary" 
          : "bg-white border-border hover:border-primary/30"
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center",
          isActive ? "bg-primary text-white" : "bg-secondary text-primary"
        )}>
          <Icon size={24} />
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default function RoleSelector() {
  const { role, setRole } = useUser();

  const roles = [
    {
      role: 'relationship_manager' as UserRole,
      title: 'Relationship Manager',
      description: 'Manage customer details, payments, schedules and requests',
      icon: Users,
    },
    {
      role: 'team_lead' as UserRole,
      title: 'Team Lead',
      description: 'Oversee team performance and customer approvals',
      icon: UserCog,
    },
    {
      role: 'head_of_department' as UserRole,
      title: 'Head of Department',
      description: 'Department-wide analytics and strategic management',
      icon: BarChart3,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Select Dashboard View</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((roleItem) => (
          <RoleCard
            key={roleItem.role}
            role={roleItem.role}
            title={roleItem.title}
            description={roleItem.description}
            icon={roleItem.icon}
            isActive={role === roleItem.role}
            onClick={() => setRole(roleItem.role)}
          />
        ))}
      </div>
    </div>
  );
}
