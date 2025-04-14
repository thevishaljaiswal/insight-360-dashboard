
import { useUser, UserRole } from '@/contexts/UserContext';
import { Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for relationship managers and team leads
// In a real application, this would come from an API
const relationshipManagers = [
  { id: 'rm1', name: 'Alice Johnson', role: 'relationship_manager' as UserRole },
  { id: 'rm2', name: 'Bob Smith', role: 'relationship_manager' as UserRole },
  { id: 'rm3', name: 'Carol Williams', role: 'relationship_manager' as UserRole },
  { id: 'rm4', name: 'David Brown', role: 'relationship_manager' as UserRole },
];

const teamLeads = [
  { id: 'tl1', name: 'Emily Davis', role: 'team_lead' as UserRole, members: ['rm1', 'rm2'] },
  { id: 'tl2', name: 'Frank Miller', role: 'team_lead' as UserRole, members: ['rm3'] },
  { id: 'tl3', name: 'Grace Taylor', role: 'team_lead' as UserRole, members: ['rm4'] },
];

export default function TeamMemberSelector() {
  const { role, selectedTeamMemberId, setSelectedTeamMemberId } = useUser();
  
  // Only show for relationship_manager or team_lead roles
  if (role === 'head_of_department') {
    return null;
  }
  
  const teamMembers = role === 'relationship_manager' ? relationshipManagers : teamLeads;
  const roleLabel = role === 'relationship_manager' ? 'Relationship Manager' : 'Team Lead';
  
  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 animate-fade-in">
      <h3 className="text-sm font-medium text-muted-foreground">Select {roleLabel}</h3>
      <Select 
        value={selectedTeamMemberId || undefined} 
        onValueChange={(value) => setSelectedTeamMemberId(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select a ${roleLabel}`} />
        </SelectTrigger>
        <SelectContent>
          {teamMembers.map((member) => (
            <SelectItem key={member.id} value={member.id}>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{member.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
