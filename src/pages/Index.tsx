import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RoleSelector from '@/components/dashboard/RoleSelector';
import TeamMemberSelector from '@/components/dashboard/TeamMemberSelector';
import CustomerSearch from '@/components/dashboard/CustomerSearch';
import CustomerList from '@/components/dashboard/CustomerList';
import CustomerImportantDates from '@/components/dashboard/CustomerImportantDates';
import { useUser } from '@/contexts/UserContext';
import RoleBasedView from '@/components/ui/RoleBasedView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Users, AlertCircle, CheckCircle, UserCog } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const { role, selectedTeamMemberId } = useUser();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCustomerSelect = (customerId: string) => {
    navigate(`/customer/${customerId}`);
  };

  const StatCard = ({ 
    title, 
    value, 
    trend, 
    trendValue, 
    icon: Icon,
    iconColor = "bg-primary/10 text-primary" 
  }: { 
    title: string; 
    value: string; 
    trend: 'up' | 'down' | 'neutral'; 
    trendValue: string; 
    icon: React.ElementType;
    iconColor?: string;
  }) => (
    <Card className="hover-scale">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", iconColor)}>
          <Icon size={18} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="flex items-center text-xs">
          {trend === 'up' && (
            <div className="text-emerald-600 flex items-center">
              <ArrowUp size={14} className="mr-1" />
              {trendValue}
            </div>
          )}
          {trend === 'down' && (
            <div className="text-destructive flex items-center">
              <ArrowDown size={14} className="mr-1" />
              {trendValue}
            </div>
          )}
          {trend === 'neutral' && (
            <div className="text-muted-foreground">
              {trendValue}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-10 max-w-7xl mx-auto">
        <RoleSelector />
        
        {(role === 'relationship_manager' || role === 'team_lead') && (
          <div className="mt-6">
            <TeamMemberSelector />
          </div>
        )}
        
        <RoleBasedView roles={['relationship_manager']}>
          <div className="space-y-6">
            {selectedTeamMemberId ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard 
                    title="Active Customers" 
                    value="42" 
                    trend="up" 
                    trendValue="8% from last month" 
                    icon={Users}
                  />
                  <StatCard 
                    title="Pending Payments" 
                    value="12" 
                    trend="down" 
                    trendValue="3% from last month" 
                    icon={AlertCircle}
                    iconColor="bg-amber-100 text-amber-600"
                  />
                  <StatCard 
                    title="Completed Payments" 
                    value="128" 
                    trend="up" 
                    trendValue="12% from last month" 
                    icon={CheckCircle}
                    iconColor="bg-emerald-100 text-emerald-600"
                  />
                  <StatCard 
                    title="Pending Approvals" 
                    value="5" 
                    trend="neutral" 
                    trendValue="Same as last month" 
                    icon={UserCog}
                    iconColor="bg-blue-100 text-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Find Customer</h2>
                      <CustomerSearch onSearch={handleSearch} />
                      {searchQuery && (
                        <div className="animate-fade-in">
                          <h3 className="text-lg font-medium mb-4">Search Results</h3>
                          <CustomerList searchQuery={searchQuery} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <CustomerImportantDates />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center p-8 bg-muted/30 rounded-lg border border-dashed">
                <Users className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Select a Relationship Manager</h3>
                <p className="text-muted-foreground mt-1">Choose a relationship manager to view their dashboard</p>
              </div>
            )}
          </div>
        </RoleBasedView>
        
        <RoleBasedView roles={['team_lead']}>
          <div className="space-y-6">
            {selectedTeamMemberId ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard 
                    title="Total Customers" 
                    value="120" 
                    trend="up" 
                    trendValue="5% from last month" 
                    icon={Users}
                  />
                  <StatCard 
                    title="Revenue" 
                    value="$348,500" 
                    trend="up" 
                    trendValue="12% from last month" 
                    icon={CheckCircle}
                    iconColor="bg-emerald-100 text-emerald-600"
                  />
                  <StatCard 
                    title="Pending Approvals" 
                    value="8" 
                    trend="down" 
                    trendValue="2% from last month" 
                    icon={AlertCircle}
                    iconColor="bg-amber-100 text-amber-600"
                  />
                  <StatCard 
                    title="Team Members" 
                    value="12" 
                    trend="neutral" 
                    trendValue="Same as last month" 
                    icon={UserCog}
                    iconColor="bg-blue-100 text-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Find Customer</h2>
                      <CustomerSearch onSearch={handleSearch} />
                      {searchQuery && (
                        <div className="animate-fade-in">
                          <h3 className="text-lg font-medium mb-4">Search Results</h3>
                          <CustomerList searchQuery={searchQuery} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <CustomerImportantDates />
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center p-8 bg-muted/30 rounded-lg border border-dashed">
                <UserCog className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Select a Team Lead</h3>
                <p className="text-muted-foreground mt-1">Choose a team lead to view their dashboard</p>
              </div>
            )}
          </div>
        </RoleBasedView>
        
        <RoleBasedView roles={['head_of_department']}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard 
                title="Total Customers" 
                value="120" 
                trend="up" 
                trendValue="5% from last month" 
                icon={Users}
              />
              <StatCard 
                title="Revenue" 
                value="$348,500" 
                trend="up" 
                trendValue="12% from last month" 
                icon={CheckCircle}
                iconColor="bg-emerald-100 text-emerald-600"
              />
              <StatCard 
                title="Pending Approvals" 
                value="8" 
                trend="down" 
                trendValue="2% from last month" 
                icon={AlertCircle}
                iconColor="bg-amber-100 text-amber-600"
              />
              <StatCard 
                title="Team Members" 
                value="12" 
                trend="neutral" 
                trendValue="Same as last month" 
                icon={UserCog}
                iconColor="bg-blue-100 text-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Find Customer</h2>
                  <CustomerSearch onSearch={handleSearch} />
                  {searchQuery && (
                    <div className="animate-fade-in">
                      <h3 className="text-lg font-medium mb-4">Search Results</h3>
                      <CustomerList searchQuery={searchQuery} />
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-1">
                <CustomerImportantDates />
              </div>
            </div>
          </div>
        </RoleBasedView>
      </div>
    </DashboardLayout>
  );
}
