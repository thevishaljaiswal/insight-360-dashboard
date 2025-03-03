
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContractInfoProps {
  customer: {
    contractStart: string;
    contractEnd: string;
    totalValue: number;
    status: string;
  };
  formatCurrency: (amount: number) => string;
}

export default function ContractInfoCard({ customer, formatCurrency }: ContractInfoProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Contract Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Start Date:</span>
            <span>{new Date(customer.contractStart).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">End Date:</span>
            <span>{new Date(customer.contractEnd).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Value:</span>
            <span className="font-medium">{formatCurrency(customer.totalValue)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span className={cn(
              "capitalize",
              customer.status === 'active' ? "text-emerald-600" : "text-gray-500"
            )}>
              {customer.status}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
