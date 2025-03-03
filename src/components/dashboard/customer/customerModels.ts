
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  contractStart: string;
  contractEnd: string;
  totalValue: number;
  relationshipManager: string;
}

export const getMockCustomer = (customerId: string): Customer => {
  // Mock customer data
  return {
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
};
