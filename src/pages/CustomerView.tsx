
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CustomerInfo from '@/components/dashboard/CustomerInfo';

export default function CustomerView() {
  const { customerId = '' } = useParams();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <CustomerInfo customerId={customerId} />
      </div>
    </DashboardLayout>
  );
}
