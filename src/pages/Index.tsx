import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RoleSelector from '@/components/dashboard/RoleSelector';
import TeamMemberSelector from '@/components/dashboard/TeamMemberSelector';
import CustomerSearch from '@/components/dashboard/CustomerSearch';
import CustomerList from '@/components/dashboard/CustomerList';
import CustomerImportantDates from '@/components/dashboard/CustomerImportantDates';
import TodoCard from '@/components/dashboard/TodoCard';
import ReportsSection from '@/components/dashboard/ReportsSection';
import { useUser, UserRole } from '@/contexts/UserContext';
import RoleBasedView from '@/components/ui/RoleBasedView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Users, AlertCircle, CheckCircle, UserCog, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const { role, selectedTeamMemberId } = useUser();
  const navigate = useNavigate();
  const [teamMemberData, setTeamMemberData] = useState<any>(null);

  useEffect(() => {
    if (!selectedTeamMemberId) {
      setTeamMemberData(null);
      return;
    }

    const data = {
      relationship_manager: {
        rm1: {
          activeCustomers: '42',
          pendingPayments: '12',
          completedPayments: '128',
          pendingApprovals: '5'
        },
        rm2: {
          activeCustomers: '37',
          pendingPayments: '9',
          completedPayments: '115',
          pendingApprovals: '3'
        },
        rm3: {
          activeCustomers: '45',
          pendingPayments: '14',
          completedPayments: '132',
          pendingApprovals: '7'
        },
        rm4: {
          activeCustomers: '33',
          pendingPayments: '8',
          completedPayments: '105',
          pendingApprovals: '2'
        }
      },
      team_lead: {
        tl1: {
          totalCustomers: '120',
          revenue: '$348,500',
          pendingApprovals: '8',
          teamMembers: '12'
        },
        tl2: {
          totalCustomers: '95',
          revenue: '$285,750',
          pendingApprovals: '6',
          teamMembers: '8'
        },
        tl3: {
          totalCustomers: '110',
          revenue: '$325,000',
          pendingApprovals: '7',
          teamMembers: '10'
        }
      }
    };

    setTeamMemberData(data[role]?.[selectedTeamMemberId] || null);
  }, [role, selectedTeamMemberId]);

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

  const getRelationshipManagersForTeamLead = (teamLeadId: string) => {
    const teamLead = [
      { id: 'tl1', members: ['rm1', 'rm2'] },
      { id: 'tl2', members: ['rm3'] },
      { id: 'tl3', members: ['rm4'] },
    ].find(tl => tl.id === teamLeadId);
    
    if (!teamLead) return [];
    
    return [
      { id: 'rm1', name: 'Alice Johnson' },
      { id: 'rm2', name: 'Bob Smith' },
      { id: 'rm3', name: 'Carol Williams' },
      { id: 'rm4', name: 'David Brown' },
    ].filter(rm => teamLead.members.includes(rm.id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 max-w-7xl mx-auto">
        <RoleSelector />
        
        {(role === 'relationship_manager' || role === 'team_lead') && (
          <div className="mt-6">
            <TeamMemberSelector />
          </div>
        )}
        
        {/* Reports Section - For all roles */}
        <section>
          <ReportsSection />
        </section>
        
        <RoleBasedView roles={['relationship_manager']} exact>
          <div className="space-y-6">
            {selectedTeamMemberId && teamMemberData ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard 
                    title="Active Customers" 
                    value={teamMemberData.activeCustomers} 
                    trend="up" 
                    trendValue="8% from last month" 
                    icon={Users}
                  />
                  <StatCard 
                    title="Pending Payments" 
                    value={teamMemberData.pendingPayments} 
                    trend="down" 
                    trendValue="3% from last month" 
                    icon={AlertCircle}
                    iconColor="bg-amber-100 text-amber-600"
                  />
                  <StatCard 
                    title="Completed Payments" 
                    value={teamMemberData.completedPayments} 
                    trend="up" 
                    trendValue="12% from last month" 
                    icon={CheckCircle}
                    iconColor="bg-emerald-100 text-emerald-600"
                  />
                  <StatCard 
                    title="Pending Approvals" 
                    value={teamMemberData.pendingApprovals} 
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
                  <div className="md:col-span-1 space-y-6">
                    <TodoCard />
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
        
        <RoleBasedView roles={['team_lead']} exact>
          <div className="space-y-6">
            {selectedTeamMemberId && teamMemberData ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard 
                    title="Total Customers" 
                    value={teamMemberData.totalCustomers} 
                    trend="up" 
                    trendValue="5% from last month" 
                    icon={Users}
                  />
                  <StatCard 
                    title="Revenue" 
                    value={teamMemberData.revenue} 
                    trend="up" 
                    trendValue="12% from last month" 
                    icon={CheckCircle}
                    iconColor="bg-emerald-100 text-emerald-600"
                  />
                  <StatCard 
                    title="Pending Approvals" 
                    value={teamMemberData.pendingApprovals} 
                    trend="down" 
                    trendValue="2% from last month" 
                    icon={AlertCircle}
                    iconColor="bg-amber-100 text-amber-600"
                  />
                  <StatCard 
                    title="Team Members" 
                    value={teamMemberData.teamMembers} 
                    trend="neutral" 
                    trendValue="Same as last month" 
                    icon={UserCog}
                    iconColor="bg-blue-100 text-blue-600"
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Relationship Managers</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {getRelationshipManagersForTeamLead(selectedTeamMemberId).map(rm => (
                      <Card key={rm.id} className="hover-scale">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md font-medium flex items-center">
                            <Users className="h-5 w-5 mr-2 text-blue-500" />
                            <span>{rm.name}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <div className="text-muted-foreground">Customers</div>
                              <div className="font-medium">{Math.floor(Math.random() * 20) + 10}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Tasks</div>
                              <div className="font-medium">{Math.floor(Math.random() * 10) + 5}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Revenue</div>
                              <div className="font-medium">${Math.floor(Math.random() * 50000) + 20000}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Performance</div>
                              <div className="font-medium">{Math.floor(Math.random() * 30) + 70}%</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
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
                  <div className="md:col-span-1 space-y-6">
                    <TodoCard />
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
        
        <RoleBasedView roles={['head_of_department']} exact>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard 
                title="Total Customers" 
                value="350" 
                trend="up" 
                trendValue="8% from last month" 
                icon={Users}
              />
              <StatCard 
                title="Total Revenue" 
                value="$982,500" 
                trend="up" 
                trendValue="15% from last month" 
                icon={CheckCircle}
                iconColor="bg-emerald-100 text-emerald-600"
              />
              <StatCard 
                title="Pending Approvals" 
                value="21" 
                trend="down" 
                trendValue="5% from last month" 
                icon={AlertCircle}
                iconColor="bg-amber-100 text-amber-600"
              />
              <StatCard 
                title="Team Leads" 
                value="3" 
                trend="neutral" 
                trendValue="Same as last month" 
                icon={UserCog}
                iconColor="bg-blue-100 text-blue-600"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Team Leads</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'tl1', name: 'Emily Davis', customers: 120, revenue: '$348,500', performance: '92%' },
                  { id: 'tl2', name: 'Frank Miller', customers: 95, revenue: '$285,750', performance: '87%' },
                  { id: 'tl3', name: 'Grace Taylor', customers: 110, revenue: '$325,000', performance: '89%' }
                ].map(tl => (
                  <Card key={tl.id} className="hover-scale">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md font-medium flex items-center">
                        <UserCog className="h-5 w-5 mr-2 text-purple-500" />
                        <span>{tl.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <div className="text-muted-foreground">Total Customers</div>
                          <div className="font-medium">{tl.customers}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Team Size</div>
                          <div className="font-medium">{getRelationshipManagersForTeamLead(tl.id).length}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Revenue</div>
                          <div className="font-medium">{tl.revenue}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Performance</div>
                          <div className="font-medium">{tl.performance}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
              <div className="md:col-span-1 space-y-6">
                <TodoCard />
                <CustomerImportantDates />
              </div>
            </div>
          </div>
        </RoleBasedView>
      </div>
    </DashboardLayout>
  );
}
