
import { useNavigate } from 'react-router-dom';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, FileText, Users, TrendingUp, 
  DollarSign, Clock, AlertCircle, CheckCircle, Heart, ChevronRight
} from 'lucide-react';

interface ReportLink {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color?: string;
}

const ReportSection = () => {
  const { role } = useUser();
  const navigate = useNavigate();
  
  const rmReports = [
    {
      title: "Task Report",
      description: "View and manage your outstanding tasks and activities",
      icon: <Clock size={20} />,
      path: "/tasks",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Customer Status",
      description: "Overview of your customer accounts and their statuses",
      icon: <Users size={20} />,
      path: "/reports/customer-status",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Payment Summary",
      description: "Summary of all payments received and pending",
      icon: <DollarSign size={20} />,
      path: "/reports/payment-summary",
      color: "bg-emerald-100 text-emerald-600"
    }
  ];
  
  const tlReports = [
    {
      title: "Team Performance",
      description: "Performance metrics for your team members",
      icon: <TrendingUp size={20} />,
      path: "/reports/team-performance",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Revenue Analysis",
      description: "Analysis of revenue by team member and product",
      icon: <BarChart3 size={20} />,
      path: "/reports/revenue-analysis",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "Customer Feedback",
      description: "Customer feedback and satisfaction scores",
      icon: <Heart size={20} />,
      path: "/reports/customer-feedback",
      color: "bg-pink-100 text-pink-600"
    },
    {
      title: "Task Report",
      description: "View and manage your outstanding tasks and activities",
      icon: <Clock size={20} />,
      path: "/tasks",
      color: "bg-amber-100 text-amber-600"
    }
  ];
  
  const hodReports = [
    {
      title: "Department Overview",
      description: "High-level metrics for the entire department",
      icon: <BarChart3 size={20} />,
      path: "/reports/department-overview",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Team Lead Performance",
      description: "Performance comparison of all team leads",
      icon: <TrendingUp size={20} />,
      path: "/reports/team-lead-performance",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Revenue Forecast",
      description: "Revenue forecasts and historical trends",
      icon: <DollarSign size={20} />,
      path: "/reports/revenue-forecast",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      title: "Risk Assessment",
      description: "Customer risk assessment and mitigation strategies",
      icon: <AlertCircle size={20} />,
      path: "/reports/risk-assessment",
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Task Report",
      description: "View and manage your outstanding tasks and activities",
      icon: <Clock size={20} />,
      path: "/tasks",
      color: "bg-amber-100 text-amber-600"
    }
  ];
  
  const getReportsByRole = (userRole: UserRole) => {
    switch(userRole) {
      case 'relationship_manager':
        return rmReports;
      case 'team_lead':
        return tlReports;
      case 'head_of_department':
        return hodReports;
      default:
        return [];
    }
  };
  
  const reports = getReportsByRole(role);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-2">
        <FileText className="mr-2 h-6 w-6" />
        <h2 className="text-2xl font-bold">Reports Dashboard</h2>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {reports.map((report, index) => (
              <li 
                key={index}
                className="flex items-center justify-between p-4 hover:bg-muted cursor-pointer"
                onClick={() => navigate(report.path)}
              >
                <div className="flex items-center">
                  <div className={`mr-4 w-10 h-10 rounded-lg flex items-center justify-center ${report.color}`}>
                    {report.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportSection;
