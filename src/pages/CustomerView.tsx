
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CustomerInfo from '@/components/dashboard/CustomerInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import CustomerReport from '@/components/dashboard/CustomerReport';
import { 
  Users, 
  Clock, 
  CreditCard, 
  FileText, 
  FileCheck 
} from 'lucide-react';

export default function CustomerView() {
  const { customerId = '' } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const reportTabs = [
    { id: 'overview', label: 'Overview', icon: Users, dataType: 'customer' },
    { id: 'schedules', label: 'Schedules', icon: Clock, dataType: 'schedules' },
    { id: 'payments', label: 'Payments', icon: CreditCard, dataType: 'payments' },
    { id: 'invoices', label: 'Invoices', icon: FileText, dataType: 'invoices' },
    { id: 'deviations', label: 'Deviations', icon: FileCheck, dataType: 'deviations' },
  ];

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
            <TabsList className="grid grid-cols-5 mb-6">
              {reportTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 py-3"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            
            {reportTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                {tab.id === 'overview' ? (
                  <div className="text-center p-6">
                    <h3 className="text-lg font-medium mb-2">Customer Overview</h3>
                    <p className="text-muted-foreground">
                      View detailed customer information above and explore specific data using the tabs.
                    </p>
                  </div>
                ) : (
                  <CustomerReport 
                    customerId={customerId}
                    reportType={tab.dataType}
                    title={`${tab.label} Report`}
                  />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>
    </DashboardLayout>
  );
}
