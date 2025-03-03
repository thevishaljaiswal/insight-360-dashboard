
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CustomerInfo from '@/components/dashboard/CustomerInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import CustomerReport from '@/components/dashboard/CustomerReport';
import { 
  BarChart3, 
  Clock, 
  CreditCard, 
  FileText, 
  FileCheck,
  Calendar,
  AlertCircle,
  Activity
} from 'lucide-react';

// Sample data for each tab
const dashboardStats = [
  { title: 'Total Invoices', value: '$12,340.00', change: '+12%', status: 'up' },
  { title: 'Pending Payments', value: '$2,450.00', change: '-5%', status: 'down' },
  { title: 'Active Contracts', value: '3', change: '+1', status: 'up' },
  { title: 'Deviations', value: '2', change: '0', status: 'neutral' },
];

const activities = [
  { id: 1, date: '2023-06-15', event: 'Contract renewal', status: 'upcoming', description: 'Annual contract renewal discussion' },
  { id: 2, date: '2023-05-10', event: 'Payment received', status: 'completed', description: 'Invoice #INV-2023-05 paid in full' },
  { id: 3, date: '2023-04-22', event: 'Service upgrade', status: 'completed', description: 'Customer upgraded to premium tier' },
  { id: 4, date: '2023-04-01', event: 'Support ticket', status: 'resolved', description: 'Issue with billing statement resolved' },
];

export default function CustomerView() {
  const { customerId = '' } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const dashboardTabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'schedules', label: 'Schedules', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'deviations', label: 'Deviations', icon: AlertCircle },
    { id: 'activity', label: 'Activity Log', icon: Clock },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'documents', label: 'Documents', icon: FileCheck },
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <CustomerInfo customerId={customerId} />
        
        <Card className="p-6">
          <Tabs 
            defaultValue="overview" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6">
              {dashboardTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 py-3"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Dashboard Overview</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {dashboardStats.map((stat, index) => (
                    <div key={index} className="bg-card rounded-lg border p-4">
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-2xl font-semibold">{stat.value}</p>
                        <span className={`text-xs px-2 py-1 rounded-full flex items-center ${
                          stat.status === 'up' ? 'bg-emerald-100 text-emerald-800' : 
                          stat.status === 'down' ? 'bg-rose-100 text-rose-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-card rounded-lg border p-4">
                    <h4 className="font-medium mb-4">Recent Activities</h4>
                    <div className="space-y-4">
                      {activities.slice(0, 3).map((activity) => (
                        <div key={activity.id} className="flex items-start border-b pb-3 last:border-0">
                          <div className="flex-1">
                            <p className="font-medium">{activity.event}</p>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">{new Date(activity.date).toLocaleDateString()}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            activity.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 
                            activity.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg border p-4">
                    <h4 className="font-medium mb-4">Payment Summary</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Paid (YTD)</p>
                        <p className="text-xl font-semibold mt-1">$24,500.00</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Outstanding</p>
                        <p className="text-xl font-semibold mt-1">$3,750.00</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Payment</p>
                        <p className="text-xl font-semibold mt-1">$1,250.00</p>
                        <p className="text-xs text-muted-foreground">Due: Jul 15, 2023</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Reliability</p>
                        <p className="text-xl font-semibold mt-1">98%</p>
                        <div className="w-full h-2 bg-gray-100 rounded mt-2">
                          <div className="h-full bg-emerald-500 rounded" style={{ width: '98%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Activity Log</h3>
                <div className="bg-card rounded-lg border divide-y">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{activity.event}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            activity.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 
                            activity.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="documents">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Documents</h3>
                <div className="bg-card rounded-lg border divide-y">
                  {[
                    { name: 'Contract Agreement.pdf', type: 'PDF', size: '2.4 MB', date: '2023-01-15' },
                    { name: 'Service Level Agreement.docx', type: 'DOCX', size: '1.8 MB', date: '2023-01-15' },
                    { name: 'Payment Terms.pdf', type: 'PDF', size: '1.2 MB', date: '2023-01-20' },
                    { name: 'Implementation Schedule.xlsx', type: 'XLSX', size: '0.9 MB', date: '2023-02-05' }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center p-4">
                      <div className="flex-1">
                        <p className="font-medium">{doc.name}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs bg-muted px-2 py-1 rounded">{doc.type}</span>
                          <span className="text-xs text-muted-foreground">{doc.size}</span>
                          <span className="text-xs text-muted-foreground">Uploaded: {new Date(doc.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <button className="text-sm text-primary hover:underline">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: 'Payment History', description: 'Complete payment transaction history', icon: CreditCard },
                    { title: 'Invoice Summary', description: 'Summary of all invoices and their statuses', icon: FileText },
                    { title: 'Contract Performance', description: 'Analysis of contract performance metrics', icon: Activity },
                    { title: 'Service Usage', description: 'Detailed service usage analytics', icon: BarChart3 },
                    { title: 'Deviation Report', description: 'Summary of all contract deviations', icon: AlertCircle },
                    { title: 'Financial Projection', description: 'Future revenue projections', icon: BarChart3 }
                  ].map((report, index) => {
                    const Icon = report.icon;
                    return (
                      <div key={index} className="bg-card rounded-lg border p-4 hover:border-primary transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-medium">{report.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="schedules">
              <CustomerReport 
                customerId={customerId}
                reportType="schedules"
                title="Payment Schedules"
              />
            </TabsContent>
            
            <TabsContent value="payments">
              <CustomerReport 
                customerId={customerId}
                reportType="payments"
                title="Payment History"
              />
            </TabsContent>
            
            <TabsContent value="invoices">
              <CustomerReport 
                customerId={customerId}
                reportType="invoices"
                title="Invoice History"
              />
            </TabsContent>
            
            <TabsContent value="deviations">
              <CustomerReport 
                customerId={customerId}
                reportType="deviations"
                title="Deviation Requests"
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
}
