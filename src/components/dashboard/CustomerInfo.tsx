
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import RoleBasedView from '../ui/RoleBasedView';
import CustomerDetailsCard from './customer/CustomerDetailsCard';
import ContractInfoCard from './customer/ContractInfoCard';
import PerformanceOverviewCard from './customer/PerformanceOverviewCard';
import ActionItemsCard from './customer/ActionItemsCard';
import CustomerInfoTabs from './customer/CustomerInfoTabs';
import { Customer, getMockCustomer } from './customer/customerModels';

interface CustomerInfoProps {
  customerId: string;
}

export default function CustomerInfo({ customerId }: CustomerInfoProps) {
  const navigate = useNavigate();
  const { role } = useUser();
  
  // Get customer data
  const customer: Customer = getMockCustomer(customerId);

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
        <CustomerDetailsCard customer={customer} />
        <ContractInfoCard customer={customer} formatCurrency={formatCurrency} />
        
        <RoleBasedView roles={['team_lead', 'head_of_department']}>
          <PerformanceOverviewCard formatCurrency={formatCurrency} />
        </RoleBasedView>
        
        <RoleBasedView roles={['relationship_manager']}>
          <ActionItemsCard />
        </RoleBasedView>
      </div>
      
      <CustomerInfoTabs formatCurrency={formatCurrency} />
    </div>
  );
}
