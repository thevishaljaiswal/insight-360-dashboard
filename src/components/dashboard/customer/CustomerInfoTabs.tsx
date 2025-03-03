
import { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import DataTable from '../DataTable';
import { cn } from '@/lib/utils';
import { 
  Calendar,
  Receipt, 
  FileCheck, 
  AlertCircle, 
  BarChart3,
  CheckCircle, 
  XCircle, 
  Clock
} from 'lucide-react';

interface CustomerInfoTabsProps {
  formatCurrency: (amount: number) => string;
}

export default function CustomerInfoTabs({ formatCurrency }: CustomerInfoTabsProps) {
  const [activeTab, setActiveTab] = useState('payment_schedule');

  // Mock data (kept the same as in original file)
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

  return (
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
  );
}
