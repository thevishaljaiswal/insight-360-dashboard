
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const teamPerformanceData = [
  { id: 1, name: "Alice Johnson", customers: 42, tasks: 28, tasksCompleted: 24, revenue: "$128,500", performance: 92 },
  { id: 2, name: "Bob Smith", customers: 37, tasks: 32, tasksCompleted: 25, revenue: "$115,750", performance: 85 },
  { id: 3, name: "Carol Williams", customers: 45, tasks: 35, tasksCompleted: 31, revenue: "$132,800", performance: 88 },
  { id: 4, name: "David Brown", customers: 33, tasks: 27, tasksCompleted: 25, revenue: "$105,200", performance: 94 },
  { id: 5, name: "Eva Davis", customers: 39, tasks: 30, tasksCompleted: 26, revenue: "$118,600", performance: 87 },
];

export default function TeamPerformanceReport() {
  const navigate = useNavigate();
  const [teamMembers] = useState(teamPerformanceData);
  
  // Calculate team totals and averages
  const totalCustomers = teamMembers.reduce((sum, member) => sum + member.customers, 0);
  const totalRevenue = teamMembers.reduce((sum, member) => sum + parseInt(member.revenue.replace(/[^0-9]/g, '')), 0);
  const averagePerformance = Math.round(teamMembers.reduce((sum, member) => sum + member.performance, 0) / teamMembers.length);
  
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            className="mr-4"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} className="mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Team Performance Report</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                <Users size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCustomers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-100 text-emerald-600">
                <ArrowUpRight size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                <TrendingUp size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averagePerformance}%</div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Member Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Member</TableHead>
                  <TableHead>Customers</TableHead>
                  <TableHead>Tasks Completed</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map(member => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.customers}</TableCell>
                    <TableCell>{member.tasksCompleted}/{member.tasks}</TableCell>
                    <TableCell>{member.revenue}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={member.performance} className="h-2" />
                        <span className="text-sm">{member.performance}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
