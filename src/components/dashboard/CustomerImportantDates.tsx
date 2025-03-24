
import { useState, useEffect } from 'react';
import { Calendar, Cake, Gift } from 'lucide-react';
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from "@/components/ui/table";
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
  
  // Filter dates by type and for today only
  const birthdaysToday = dates.filter(date => date.type === 'birthday' && date.daysUntil === 0);
  const childrenBirthdaysToday = dates.filter(date => date.type === 'childBirthday' && date.daysUntil === 0);
  const anniversariesToday = dates.filter(date => date.type === 'anniversary' && date.daysUntil === 0);

  return (
    <div className="grid grid-cols-1 gap-6 animate-fade-in">
      {/* Customer Birthdays Today */}
      <DateTable 
        title="Today's Customer Birthdays"
        icon={<Cake className="h-5 w-5 text-blue-500" />}
        dates={birthdaysToday}
        emptyMessage="No customer birthdays today"
        bgColor="bg-blue-50"
        textColor="text-blue-700"
      />

      {/* Children Birthdays Today */}
      <DateTable 
        title="Today's Children Birthdays"
        icon={<Cake className="h-5 w-5 text-purple-500" />}
        dates={childrenBirthdaysToday}
        emptyMessage="No children birthdays today"
        bgColor="bg-purple-50"
        textColor="text-purple-700"
      />

      {/* Anniversaries Today */}
      <DateTable 
        title="Today's Anniversaries"
        icon={<Gift className="h-5 w-5 text-pink-500" />}
        dates={anniversariesToday}
        emptyMessage="No anniversaries today"
        bgColor="bg-pink-50"
        textColor="text-pink-700"
      />
    </div>
  );
}

// Reusable table component for each date type
function DateTable({ 
  title, 
  icon, 
  dates, 
  emptyMessage,
  bgColor,
  textColor
}: { 
  title: string; 
  icon: React.ReactNode; 
  dates: DateItem[];
  emptyMessage: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <Card className={cn("overflow-hidden hover-scale transition-all", bgColor)}>
      <CardHeader className={`pb-3 ${textColor}`}>
        <CardTitle className="text-md font-medium flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[60%]">Name</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center text-muted-foreground py-6">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              dates.map((item, index) => (
                <TableRow 
                  key={item.id}
                  className={cn(
                    "animate-fade-in",
                    { "animate-delay-100": index % 3 === 0 },
                    { "animate-delay-200": index % 3 === 1 },
                    { "animate-delay-300": index % 3 === 2 }
                  )}
                >
                  <TableCell className="py-2 font-medium">{item.name}</TableCell>
                  <TableCell className="py-2">{item.date}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
