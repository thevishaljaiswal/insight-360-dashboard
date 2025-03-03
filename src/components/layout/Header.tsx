
import { useUser, UserRole } from '@/contexts/UserContext';
import { Bell, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { role, setRole } = useUser();
  
  const roleOptions: { value: UserRole; label: string }[] = [
    { value: 'relationship_manager', label: 'Relationship Manager' },
    { value: 'team_lead', label: 'Team Lead' },
    { value: 'head_of_department', label: 'Head of Department' },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-white subtle-shadow sticky top-0 z-10">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-all">
            <span className={cn(
              "text-sm",
              role === 'relationship_manager' && "text-blue-600",
              role === 'team_lead' && "text-purple-600",
              role === 'head_of_department' && "text-emerald-600"
            )}>
              {roleOptions.find(r => r.value === role)?.label}
            </span>
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {roleOptions.map((option) => (
              <DropdownMenuItem 
                key={option.value}
                onClick={() => setRole(option.value)}
                className={cn(
                  "cursor-pointer",
                  role === option.value && "bg-secondary"
                )}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <button className="p-2 rounded-full hover:bg-secondary transition-all relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
