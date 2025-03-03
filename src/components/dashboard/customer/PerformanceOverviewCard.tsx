
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

interface PerformanceOverviewProps {
  formatCurrency: (amount: number) => string;
}

export default function PerformanceOverviewCard({ formatCurrency }: PerformanceOverviewProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-semibold">
            {formatCurrency(15000)}
          </div>
          <div className="flex items-center text-emerald-600">
            <ArrowUp size={14} className="mr-1" />
            <span>15%</span>
          </div>
        </div>
        <div className="h-2 bg-gray-100 rounded mb-2 overflow-hidden">
          <div className="h-full bg-primary" style={{ width: '75%' }}></div>
        </div>
        <div className="text-xs text-muted-foreground">
          75% of yearly target achieved
        </div>
      </CardContent>
    </Card>
  );
}
