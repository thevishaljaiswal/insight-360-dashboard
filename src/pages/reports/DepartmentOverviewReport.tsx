
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Users, DollarSign, TrendingUp, UserCog } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const departmentData = [
  { 
    id: 1, 
    teamLead: "Emily Davis", 
    teamSize: 12, 
    customers: 120, 
    revenue: "$348,500", 
    performance: 92,
    growth: "+12%"
  },
  { 
    id: 2, 
    teamLead: "Frank Miller", 
    teamSize: 8, 
    customers: 95, 
    revenue: "$285,750", 
    performance: 87,
    growth: "+8%"
  },
  { 
    id: 3, 
    teamLead: "Grace Taylor", 
    teamSize: 10, 
    customers: 110, 
    revenue: "$325,000", 
    performance: 89,
    growth: "+10%"
  }
];

export default function DepartmentOverviewReport() {
  const navigate = useNavigate();
  const [teams] = useState(departmentData);
  
  // Calculate department totals
  const totalCustomers = teams.reduce((sum, team) => sum + team.customers, 0);
  const totalRevenue = teams.reduce((sum, team) => sum + parseInt(team.revenue.replace(/[^0-9]/g, '')), 0);
  const totalEmployees = teams.reduce((sum, team) => sum + team.teamSize, 0);
  
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
          <h1 className="text-2xl font-bold">Department Overview</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                <UserCog size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teams.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                <Users size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-100 text-amber-600">
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
                <DollarSign size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Team Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Lead</TableHead>
                  <TableHead>Team Size</TableHead>
                  <TableHead>Customers</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map(team => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">{team.teamLead}</TableCell>
                    <TableCell>{team.teamSize}</TableCell>
                    <TableCell>{team.customers}</TableCell>
                    <TableCell>{team.revenue}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={team.performance} className="h-2" />
                        <span className="text-sm">{team.performance}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-emerald-600">{team.growth}</TableCell>
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
