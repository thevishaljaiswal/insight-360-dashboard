
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import DataTable from './DataTable';
import { Button } from '@/components/ui/button';
import { 
  Calendar,
  Receipt, 
  FileCheck, 
  AlertCircle, 
  ArrowDown, 
  ArrowUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  BarChart3,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';
import RoleBasedView from '../ui/RoleBasedView';

// Mock data
const paymentScheduleData = [
  { id: 'SCH001', dueDate: '2023-07-15', amount: 5000, status: 'paid' },
  { id: 'SCH002', dueDate: '2023-08-15', amount: 5000, status: 'paid' },
  { id: 'SCH003', dueDate: '2023-09-15', amount: 5000, status: 'upcoming' },
  { id: 'SCH004', dueDate: '2023-10-15', amount: 5000, status: 'upcoming' },
  { id: 'SCH005', dueDate: '2023-11-15', amount: 5000, status: 'upcoming' },
];

const invoiceData = [
  { id: 'INV001', date: '2023-06-01', amount: 5000, status: 'paid', dueDate: '2023-07-01' },
  { id: 'INV002', date: '2023-07-01', amount: 5000, status: 'paid', dueDate: '2023-08-01' },
  { id: 'INV003', date: '2023-08-01', amount: 5000, status: 'pending', dueDate: '2023-09-01' },
];

const paymentReceiptData = [
  { id: 'RCPT001', date: '2023-07-10', amount: 5000, method: 'credit_card' },
  { id: 'RCPT002', date: '2023-08-10', amount: 5000, method: 'bank_transfer' },
];

const deviationRequestData = [
  { id: 'DEV001', date: '2023-07-05', type: 'payment_extension', status: 'approved', requestedBy: 'John Doe' },
  { id: 'DEV002', date: '2023-08-20', type: 'discount_request', status: 'pending', requestedBy: 'John Doe' },
];

const accountStatementData = [
  { id: 'TRX001', date: '2023-06-01', description: 'Invoice #INV001', amount: -5000, balance: -5000 },
  { id: 'TRX002', date: '2023-07-10', description: 'Payment #RCPT001', amount: 5000, balance: 0 },
  { id: 'TRX003', date: '2023-07-01', description: 'Invoice #INV002', amount: -5000, balance: -5000 },
  { id: 'TRX004', date: '2023-08-10', description: 'Payment #RCPT002', amount: 5000, balance: 0 },
  { id: 'TRX005', date: '2023-08-01', description: 'Invoice #INV003', amount: -5000, balance: -5000 },
];

interface CustomerInfoProps {
  customerId: string;
}

export default function CustomerInfo({ customerId }: CustomerInfoProps) {
  const [activeTab, setActiveTab] = useState('payment_schedule');
  const navigate = useNavigate();
  const { role } = useUser();
  
  // Mock customer data
  const customer = {
    id: customerId,
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100, New York, NY 10001',
    status: 'active',
    contractStart: '2023-01-01',
    contractEnd: '2024-01-01',
    totalValue: 60000,
    relationshipManager: 'John Doe'
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-4"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={16} className="mr-1" />
          Back
        </Button>
        <h2 className="text-2xl font-semibold">{customer.name}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID:</span>
                <span>{customer.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>{customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span>{customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Relationship Manager:</span>
                <span>{customer.relationshipManager}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Contract Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start Date:</span>
                <span>{new Date(customer.contractStart).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">End Date:</span>
                <span>{new Date(customer.contractEnd).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Value:</span>
                <span className="font-medium">{formatCurrency(customer.totalValue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={cn(
                  "capitalize",
                  customer.status === 'active' ? "text-emerald-600" : "text-gray-500"
                )}>
                  {customer.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <RoleBasedView roles={['team_lead', 'head_of_department']}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-semibold">
                  {formatCurrency(15000)}
                </div>
                <div className="flex items-center text-emerald-600">
                  <ArrowUp size={14} className="mr-1" />
                  <span>15%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded mb-2 overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '75%' }}></div>
              </div>
              <div className="text-xs text-muted-foreground">
                75% of yearly target achieved
              </div>
            </CardContent>
          </Card>
        </RoleBasedView>
        
        <RoleBasedView roles={['relationship_manager']}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Next Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <Clock size={16} className="mt-0.5 mr-2 text-primary" />
                  <div>
                    <div className="font-medium">Payment #SCH003 due soon</div>
                    <div className="text-muted-foreground">Sep 15, 2023</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertCircle size={16} className="mt-0.5 mr-2 text-amber-500" />
                  <div>
                    <div className="font-medium">Review pending deviation request</div>
                    <div className="text-muted-foreground">Reference #DEV002</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </RoleBasedView>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/40 p-1">
          <TabsTrigger 
            value="payment_schedule"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Calendar size={16} className="mr-2" />
            Payment Schedule
          </TabsTrigger>
          <TabsTrigger 
            value="invoices"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Receipt size={16} className="mr-2" />
            Invoices
          </TabsTrigger>
          <TabsTrigger 
            value="payment_receipts"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <FileCheck size={16} className="mr-2" />
            Payment Receipts
          </TabsTrigger>
          <TabsTrigger 
            value="deviation_requests"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <AlertCircle size={16} className="mr-2" />
            Deviation Requests
          </TabsTrigger>
          <TabsTrigger 
            value="account_statement"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <BarChart3 size={16} className="mr-2" />
            Account Statement
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment_schedule" className="animate-fade-in">
          <DataTable
            title="Payment Schedule"
            data={paymentScheduleData}
            columns={[
              { header: 'Schedule ID', accessorKey: 'id' },
              { 
                header: 'Due Date', 
                accessorKey: 'dueDate',
                cell: (item) => new Date(item.dueDate).toLocaleDateString()
              },
              { 
                header: 'Amount', 
                accessorKey: 'amount',
                cell: (item) => formatCurrency(item.amount)
              },
              { 
                header: 'Status', 
                accessorKey: 'status',
                cell: (item) => (
                  <div className={cn(
                    "flex items-center capitalize",
                    item.status === 'paid' ? "text-emerald-600" : 
                    item.status === 'upcoming' ? "text-amber-500" : ""
                  )}>
                    {item.status === 'paid' ? <CheckCircle size={16} className="mr-1.5" /> : 
                     item.status === 'upcoming' ? <Clock size={16} className="mr-1.5" /> : null}
                    {item.status}
                  </div>
                )
              },
            ]}
          />
        </TabsContent>
        
        <TabsContent value="invoices" className="animate-fade-in">
          <DataTable
            title="Invoices"
            data={invoiceData}
            columns={[
              { header: 'Invoice ID', accessorKey: 'id' },
              { 
                header: 'Date', 
                accessorKey: 'date',
                cell: (item) => new Date(item.date).toLocaleDateString()
              },
              { 
                header: 'Due Date', 
                accessorKey: 'dueDate',
                cell: (item) => new Date(item.dueDate).toLocaleDateString()
              },
              { 
                header: 'Amount', 
                accessorKey: 'amount',
                cell: (item) => formatCurrency(item.amount)
              },
              { 
                header: 'Status', 
                accessorKey: 'status',
                cell: (item) => (
                  <div className={cn(
                    "flex items-center capitalize",
                    item.status === 'paid' ? "text-emerald-600" : 
                    item.status === 'pending' ? "text-amber-500" : 
                    "text-destructive"
                  )}>
                    {item.status === 'paid' ? <CheckCircle size={16} className="mr-1.5" /> : 
                     item.status === 'pending' ? <Clock size={16} className="mr-1.5" /> : 
                     <XCircle size={16} className="mr-1.5" />}
                    {item.status}
                  </div>
                )
              },
            ]}
          />
        </TabsContent>
        
        <TabsContent value="payment_receipts" className="animate-fade-in">
          <DataTable
            title="Payment Receipts"
            data={paymentReceiptData}
            columns={[
              { header: 'Receipt ID', accessorKey: 'id' },
              { 
                header: 'Date', 
                accessorKey: 'date',
                cell: (item) => new Date(item.date).toLocaleDateString()
              },
              { 
                header: 'Amount', 
                accessorKey: 'amount',
                cell: (item) => formatCurrency(item.amount)
              },
              { 
                header: 'Payment Method', 
                accessorKey: 'method',
                cell: (item) => (
                  <span className="capitalize">{item.method.replace('_', ' ')}</span>
                )
              },
            ]}
          />
        </TabsContent>
        
        <TabsContent value="deviation_requests" className="animate-fade-in">
          <DataTable
            title="Deviation Approval Requests"
            data={deviationRequestData}
            columns={[
              { header: 'Request ID', accessorKey: 'id' },
              { 
                header: 'Date', 
                accessorKey: 'date',
                cell: (item) => new Date(item.date).toLocaleDateString()
              },
              { 
                header: 'Type', 
                accessorKey: 'type',
                cell: (item) => (
                  <span className="capitalize">{item.type.replace('_', ' ')}</span>
                )
              },
              { header: 'Requested By', accessorKey: 'requestedBy' },
              { 
                header: 'Status', 
                accessorKey: 'status',
                cell: (item) => (
                  <div className={cn(
                    "flex items-center capitalize",
                    item.status === 'approved' ? "text-emerald-600" : 
                    item.status === 'pending' ? "text-amber-500" : 
                    "text-destructive"
                  )}>
                    {item.status === 'approved' ? <CheckCircle size={16} className="mr-1.5" /> : 
                     item.status === 'pending' ? <Clock size={16} className="mr-1.5" /> : 
                     <XCircle size={16} className="mr-1.5" />}
                    {item.status}
                  </div>
                )
              },
            ]}
          />
        </TabsContent>
        
        <TabsContent value="account_statement" className="animate-fade-in">
          <DataTable
            title="Account Statement"
            data={accountStatementData}
            columns={[
              { header: 'Transaction ID', accessorKey: 'id' },
              { 
                header: 'Date', 
                accessorKey: 'date',
                cell: (item) => new Date(item.date).toLocaleDateString()
              },
              { header: 'Description', accessorKey: 'description' },
              { 
                header: 'Amount', 
                accessorKey: 'amount',
                cell: (item) => (
                  <span className={cn(
                    item.amount > 0 ? "text-emerald-600" : "text-gray-600"
                  )}>
                    {formatCurrency(item.amount)}
                  </span>
                )
              },
              { 
                header: 'Balance', 
                accessorKey: 'balance',
                cell: (item) => formatCurrency(item.balance)
              },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
