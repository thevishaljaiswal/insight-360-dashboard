
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { ChevronRight, CircleDot } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for customer list
const mockCustomers = [
  { id: '1001', name: 'Acme Corporation', email: 'contact@acme.com', status: 'active', overdue: false, products: 3, lastContact: '2023-05-15' },
  { id: '1002', name: 'TechNova Solutions', email: 'info@technova.com', status: 'active', overdue: true, products: 5, lastContact: '2023-06-20' },
  { id: '1003', name: 'Global Industries', email: 'support@globalind.com', status: 'inactive', overdue: false, products: 2, lastContact: '2023-04-10' },
  { id: '1004', name: 'Bright Future Inc', email: 'hello@brightfuture.org', status: 'active', overdue: false, products: 1, lastContact: '2023-07-01' },
  { id: '1005', name: 'Elite Services', email: 'services@elite.co', status: 'active', overdue: false, products: 4, lastContact: '2023-06-15' },
];

interface CustomerListProps {
  searchQuery?: string;
}

export default function CustomerList({ searchQuery = '' }: CustomerListProps) {
  const navigate = useNavigate();
  const { role } = useUser();
  
  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return mockCustomers;
    
    const query = searchQuery.toLowerCase();
    return mockCustomers.filter(
      customer => 
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.id.includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden subtle-shadow">
      <div className="grid grid-cols-12 px-6 py-4 border-b border-border bg-muted/30">
        <div className="col-span-4 font-medium">Customer</div>
        <div className="col-span-2 font-medium">Status</div>
        <div className="col-span-2 font-medium">Products</div>
        <div className="col-span-3 font-medium">Last Contact</div>
        <div className="col-span-1"></div>
      </div>
      
      {filteredCustomers.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          No customers found matching "{searchQuery}"
        </div>
      ) : (
        <div className="divide-y divide-border">
          {filteredCustomers.map((customer) => (
            <div 
              key={customer.id}
              className="grid grid-cols-12 px-6 py-4 hover:bg-muted/20 transition-colors cursor-pointer"
              onClick={() => navigate(`/customer/${customer.id}`)}
            >
              <div className="col-span-4">
                <div className="font-medium">{customer.name}</div>
                <div className="text-sm text-muted-foreground">{customer.email}</div>
              </div>
              <div className="col-span-2 flex items-center">
                <span className={cn(
                  "flex items-center",
                  customer.status === 'active' ? "text-emerald-600" : "text-gray-400"
                )}>
                  <CircleDot size={16} className="mr-1.5" />
                  <span className="capitalize">{customer.status}</span>
                </span>
              </div>
              <div className="col-span-2 flex items-center">
                {customer.products}
              </div>
              <div className="col-span-3 flex items-center text-muted-foreground">
                {new Date(customer.lastContact).toLocaleDateString()}
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <ChevronRight size={18} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
