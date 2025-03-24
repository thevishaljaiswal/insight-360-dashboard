
import { useState, useEffect } from 'react';
import { Calendar, Cake, Gift } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DateItem {
  id: string;
  name: string;
  date: string;
  type: 'birthday' | 'childBirthday' | 'anniversary';
  daysUntil: number;
}

// Mock data - in a real app this would come from an API
const getImportantDates = (): DateItem[] => {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // Function to calculate days until next occurrence
  const calculateDaysUntil = (dateString: string): number => {
    const [month, day] = dateString.split('/').map(Number);
    let nextDate = new Date(currentYear, month - 1, day);
    
    // If the date has passed this year, use next year's date
    if (nextDate < today) {
      nextDate = new Date(currentYear + 1, month - 1, day);
    }
    
    const diffTime = nextDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const mockDates: DateItem[] = [
    { id: '1', name: 'John Smith', date: '05/15', type: 'birthday', daysUntil: 0 },
    { id: '2', name: 'Emma Smith (daughter)', date: '07/22', type: 'childBirthday', daysUntil: 0 },
    { id: '3', name: 'Sarah Johnson', date: '06/10', type: 'birthday', daysUntil: 0 },
    { id: '4', name: 'William Johnson (son)', date: '08/30', type: 'childBirthday', daysUntil: 0 },
    { id: '5', name: 'The Smiths', date: '09/18', type: 'anniversary', daysUntil: 0 },
    { id: '6', name: 'The Johnsons', date: '04/05', type: 'anniversary', daysUntil: 0 },
  ];
  
  // Calculate days until for each date
  return mockDates.map(item => ({
    ...item,
    daysUntil: calculateDaysUntil(item.date)
  })).sort((a, b) => a.daysUntil - b.daysUntil); // Sort by closest date
};

export default function CustomerImportantDates() {
  const [dates, setDates] = useState<DateItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulating data loading
    const timer = setTimeout(() => {
      setDates(getImportantDates());
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getIcon = (type: DateItem['type']) => {
    switch (type) {
      case 'birthday':
        return <Cake className="h-4 w-4 text-blue-500" />;
      case 'childBirthday':
        return <Cake className="h-4 w-4 text-purple-500" />;
      case 'anniversary':
        return <Gift className="h-4 w-4 text-pink-500" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };
  
  const getTypeLabel = (type: DateItem['type']) => {
    switch (type) {
      case 'birthday':
        return 'Birthday';
      case 'childBirthday':
        return 'Child Birthday';
      case 'anniversary':
        return 'Anniversary';
      default:
        return 'Event';
    }
  };
  
  const getRowColor = (daysUntil: number) => {
    if (daysUntil <= 7) return "bg-red-50";
    if (daysUntil <= 30) return "bg-yellow-50";
    return "";
  };
  
  return (
    <Card className={cn("overflow-hidden", isLoaded ? "animate-fade-in" : "opacity-0")}>
      <CardHeader className="pb-3">
        <CardTitle className="text-md font-medium flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Upcoming Important Dates
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-60 overflow-auto">
          <Table>
            <TableBody>
              {dates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
                    No upcoming dates
                  </TableCell>
                </TableRow>
              ) : (
                dates.map((item, index) => (
                  <TableRow 
                    key={item.id} 
                    className={cn(
                      "hover-scale transition-all",
                      getRowColor(item.daysUntil),
                      "animate-fade-in",
                      { "animate-delay-100": index % 3 === 0 },
                      { "animate-delay-200": index % 3 === 1 },
                      { "animate-delay-300": index % 3 === 2 }
                    )}
                  >
                    <TableCell className="py-2">
                      <div className="flex items-center">
                        {getIcon(item.type)}
                        <span className="ml-2 font-medium">{item.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground ml-6">
                        {getTypeLabel(item.type)}
                      </div>
                    </TableCell>
                    <TableCell className="py-2">{item.date}</TableCell>
                    <TableCell className="py-2 text-right">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        daysUntilColor(item.daysUntil)
                      )}>
                        {item.daysUntil === 0 ? 'Today!' : 
                         item.daysUntil === 1 ? 'Tomorrow!' : 
                         `In ${item.daysUntil} days`}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function daysUntilColor(days: number): string {
  if (days === 0) return "bg-red-100 text-red-800";
  if (days <= 7) return "bg-orange-100 text-orange-800";
  if (days <= 30) return "bg-yellow-100 text-yellow-800";
  return "bg-blue-50 text-blue-700";
}
