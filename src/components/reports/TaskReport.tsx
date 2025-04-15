
import { useState, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  SlidersHorizontal, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  CalendarDays,
  ArrowUpDown,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Mock data for tasks
const mockTasks = [
  {
    id: '1',
    text: 'Client follow-up: Contract renewal',
    completed: false,
    createdAt: new Date(2025, 3, 8),
    dueDate: new Date(2025, 3, 18),
    priority: 'high',
    assignee: 'Alice Johnson',
    assigneeRole: 'relationship_manager',
    team: 'Team Alpha'
  },
  {
    id: '2',
    text: 'Complete performance review for team members',
    completed: true,
    createdAt: new Date(2025, 3, 5),
    dueDate: new Date(2025, 3, 12),
    priority: 'medium',
    assignee: 'Frank Miller',
    assigneeRole: 'team_lead',
    team: 'Team Beta'
  },
  {
    id: '3',
    text: 'Prepare monthly revenue report',
    completed: false,
    createdAt: new Date(2025, 3, 1),
    dueDate: new Date(2025, 3, 15),
    priority: 'high',
    assignee: 'Grace Taylor',
    assigneeRole: 'team_lead',
    team: 'Team Gamma'
  },
  {
    id: '4',
    text: 'Client onboarding: New corporate account',
    completed: false,
    createdAt: new Date(2025, 3, 10),
    dueDate: new Date(2025, 3, 20),
    priority: 'medium',
    assignee: 'Bob Smith',
    assigneeRole: 'relationship_manager',
    team: 'Team Alpha'
  },
  {
    id: '5',
    text: 'Quarterly strategy meeting preparation',
    completed: false,
    createdAt: new Date(2025, 3, 7),
    dueDate: new Date(2025, 3, 14),
    priority: 'high',
    assignee: 'Carol Williams',
    assigneeRole: 'relationship_manager',
    team: 'Team Beta'
  },
  {
    id: '6',
    text: 'Review customer satisfaction metrics',
    completed: true,
    createdAt: new Date(2025, 3, 2),
    dueDate: new Date(2025, 3, 9),
    priority: 'low',
    assignee: 'David Brown',
    assigneeRole: 'relationship_manager',
    team: 'Team Gamma'
  },
  {
    id: '7',
    text: 'Update risk assessment documentation',
    completed: false,
    createdAt: new Date(2025, 3, 9),
    dueDate: new Date(2025, 3, 16),
    priority: 'medium',
    assignee: 'Emily Davis',
    assigneeRole: 'team_lead',
    team: 'Team Alpha'
  },
];

type TaskType = typeof mockTasks[0];

export default function TaskReport() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [priorityFilter, setPriorityFilter] = useState<string | undefined>(undefined);
  const [teamFilter, setTeamFilter] = useState<string | undefined>(undefined);
  const [sortConfig, setSortConfig] = useState<{ key: keyof TaskType; direction: 'asc' | 'desc' } | null>(null);
  
  // Get unique teams for filter
  const teams = useMemo(() => {
    return Array.from(new Set(mockTasks.map(task => task.team)));
  }, []);
  
  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let result = [...mockTasks];
    
    // Apply search filter
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.text.toLowerCase().includes(lowercasedQuery) ||
        task.assignee.toLowerCase().includes(lowercasedQuery)
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(task => {
        if (statusFilter === 'completed') return task.completed;
        if (statusFilter === 'active') return !task.completed;
        return true;
      });
    }
    
    // Apply priority filter
    if (priorityFilter) {
      result = result.filter(task => task.priority === priorityFilter);
    }
    
    // Apply team filter
    if (teamFilter) {
      result = result.filter(task => task.team === teamFilter);
    }
    
    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return result;
  }, [mockTasks, searchQuery, statusFilter, priorityFilter, teamFilter, sortConfig]);
  
  // Handle sort
  const handleSort = (key: keyof TaskType) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ key, direction });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter(undefined);
    setPriorityFilter(undefined);
    setTeamFilter(undefined);
  };
  
  // Get statistics
  const stats = useMemo(() => {
    const total = mockTasks.length;
    const completed = mockTasks.filter(task => task.completed).length;
    const active = total - completed;
    const highPriority = mockTasks.filter(task => task.priority === 'high').length;
    
    const overdueCount = mockTasks.filter(task => {
      if (task.completed) return false;
      if (!task.dueDate) return false;
      return new Date(task.dueDate) < new Date();
    }).length;
    
    return { total, completed, active, highPriority, overdueCount };
  }, [mockTasks]);
  
  // Priority badge styling
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Task Management Report</h2>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.active}</div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.overdueCount}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <ClipboardList className="mr-2 h-5 w-5" />
            Task List
          </CardTitle>
          <CardDescription>
            Manage and track all tasks across teams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tasks or assignees..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                    <DropdownMenuRadioItem value={undefined}>All</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="completed">Completed</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>All Teams</SelectItem>
                  {teams.map(team => (
                    <SelectItem key={team} value={team}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {(searchQuery || statusFilter || priorityFilter || teamFilter) && (
                <Button variant="ghost" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          {/* Task Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Status</TableHead>
                  <TableHead className="max-w-[300px]">
                    <Button 
                      variant="ghost" 
                      className="flex items-center p-0 hover:bg-transparent"
                      onClick={() => handleSort('text')}
                    >
                      Task
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      className="flex items-center p-0 hover:bg-transparent"
                      onClick={() => handleSort('assignee')}
                    >
                      Assignee
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>
                    <Button 
                      variant="ghost" 
                      className="flex items-center p-0 hover:bg-transparent"
                      onClick={() => handleSort('dueDate')}
                    >
                      Due Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No tasks found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id} className={cn(
                      task.completed && "bg-muted/30"
                    )}>
                      <TableCell>
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-muted-foreground/40" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium max-w-[300px]">
                        <div className={cn(
                          "truncate", 
                          task.completed && "line-through text-muted-foreground"
                        )}>
                          {task.text}
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell>{task.team}</TableCell>
                      <TableCell>
                        {task.dueDate ? (
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span className={cn(
                              "text-sm",
                              new Date(task.dueDate) < new Date() && !task.completed && "text-destructive font-medium"
                            )}>
                              {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No due date</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
