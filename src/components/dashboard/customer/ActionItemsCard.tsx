
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";

export default function ActionItemsCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Next Action Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex items-start">
            <Clock size={16} className="mt-0.5 mr-2 text-primary" />
            <div>
              <div className="font-medium">Payment #SCH003 due soon</div>
              <div className="text-muted-foreground">Sep 15, 2023</div>
            </div>
          </div>
          <div className="flex items-start">
            <AlertCircle size={16} className="mt-0.5 mr-2 text-amber-500" />
            <div>
              <div className="font-medium">Review pending deviation request</div>
              <div className="text-muted-foreground">Reference #DEV002</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
