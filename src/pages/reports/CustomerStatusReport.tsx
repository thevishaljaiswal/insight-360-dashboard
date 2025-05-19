
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const customerStatusData = [
  { id: 1, name: "Alice Johnson", status: "Active", lastContact: "2025-05-15", contract: "Premium", risk: "Low", lifetime: "$45,300" },
  { id: 2, name: "Bob Smith", status: "At Risk", lastContact: "2025-04-22", contract: "Standard", risk: "High", lifetime: "$12,850" },
  { id: 3, name: "Carol White", status: "Active", lastContact: "2025-05-17", contract: "Premium", risk: "Low", lifetime: "$38,600" },
  { id: 4, name: "David Brown", status: "Inactive", lastContact: "2025-03-10", contract: "Basic", risk: "Medium", lifetime: "$8,200" },
  { id: 5, name: "Eva Green", status: "Active", lastContact: "2025-05-12", contract: "Premium", risk: "Low", lifetime: "$52,100" },
  { id: 6, name: "Frank Miller", status: "At Risk", lastContact: "2025-04-05", contract: "Standard", risk: "High", lifetime: "$15,750" },
  { id: 7, name: "Grace Lee", status: "Active", lastContact: "2025-05-10", contract: "Premium", risk: "Low", lifetime: "$41,200" },
];

export default function CustomerStatusReport() {
  const navigate = useNavigate();
  const [customers] = useState(customerStatusData);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active':
        return <Badge className="bg-green-500">{status}</Badge>;
      case 'At Risk':
        return <Badge className="bg-red-500">{status}</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
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
          <h1 className="text-2xl font-bold">Customer Status Report</h1>
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
              <div className="text-2xl font-bold">{customers.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">At Risk</CardTitle>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 text-red-600">
                <AlertCircle size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => c.status === 'At Risk').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-100 text-green-600">
                <CheckCircle size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => c.status === 'Active').length}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer Status Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Contract Type</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Lifetime Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map(customer => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>{customer.lastContact}</TableCell>
                    <TableCell>{customer.contract}</TableCell>
                    <TableCell>{customer.risk}</TableCell>
                    <TableCell>{customer.lifetime}</TableCell>
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
