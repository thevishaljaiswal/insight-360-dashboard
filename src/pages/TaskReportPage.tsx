
import DashboardLayout from '@/components/layout/DashboardLayout';
import TaskReport from '@/components/reports/TaskReport';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function TaskReportPage() {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            className="mr-4"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} className="mr-1" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Task Reports</h1>
        </div>
        
        <TaskReport />
      </div>
    </DashboardLayout>
  );
}
