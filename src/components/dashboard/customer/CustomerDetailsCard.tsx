
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface CustomerDetailsProps {
  customer: {
    id: string;
    email: string;
    phone: string;
    relationshipManager: string;
  };
}

export default function CustomerDetailsCard({ customer }: CustomerDetailsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Customer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">ID:</span>
            <span>{customer.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span>{customer.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone:</span>
            <span>{customer.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Relationship Manager:</span>
            <span>{customer.relationshipManager}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
