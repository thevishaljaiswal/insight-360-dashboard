import { useState, useMemo } from 'react';
import DataTable from '@/components/dashboard/DataTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X, Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Define data types for different report types
interface BaseReportData {
  id: string;
  date: string;
  status: string;
  amount: number;
}

interface ScheduleData extends BaseReportData {
  description: string;
}

interface PaymentData extends BaseReportData {
  method: string;
}

interface InvoiceData extends BaseReportData {
  dueDate: string;
}

interface DeviationData extends BaseReportData {
  requestType: string;
}

// Union type for all report data
type ReportData = ScheduleData | PaymentData | InvoiceData | DeviationData;

// Mock data for different report types - now using a common return type
const generateMockData = (type: string, count: number = 15): ReportData[] => {
  const today = new Date();
  
  switch (type) {
    case 'schedules':
      return Array.from({ length: count }, (_, i) => ({
        id: `SCH-${(1000 + i).toString()}`,
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i * 3).toISOString().split('T')[0],
        description: `Payment Schedule ${i + 1}`,
        status: ['Upcoming', 'Completed', 'Pending'][Math.floor(Math.random() * 3)],
        amount: Math.floor(Math.random() * 10000) / 100,
      })) as ScheduleData[];
      
    case 'payments':
      return Array.from({ length: count }, (_, i) => ({
        id: `PAY-${(2000 + i).toString()}`,
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - i * 5).toISOString().split('T')[0],
        method: ['Credit Card', 'Bank Transfer', 'Cash', 'Check'][Math.floor(Math.random() * 4)],
        status: ['Completed', 'Pending', 'Failed'][Math.floor(Math.random() * 3)],
        amount: Math.floor(Math.random() * 100000) / 100,
      })) as PaymentData[];
      
    case 'invoices':
      return Array.from({ length: count }, (_, i) => ({
        id: `INV-${(3000 + i).toString()}`,
        date: new Date(today.getFullYear(), today.getMonth() - Math.floor(i/3), today.getDate() - (i % 28)).toISOString().split('T')[0],
        dueDate: new Date(today.getFullYear(), today.getMonth() - Math.floor(i/3) + 1, today.getDate() - (i % 28)).toISOString().split('T')[0],
        status: ['Paid', 'Unpaid', 'Overdue'][Math.floor(Math.random() * 3)],
        amount: Math.floor(Math.random() * 200000) / 100,
      })) as InvoiceData[];
      
    case 'deviations':
      return Array.from({ length: count }, (_, i) => ({
        id: `DEV-${(4000 + i).toString()}`,
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - i * 7).toISOString().split('T')[0],
        requestType: ['Payment Extension', 'Fee Waiver', 'Rate Change', 'Restructure'][Math.floor(Math.random() * 4)],
        status: ['Approved', 'Pending', 'Rejected'][Math.floor(Math.random() * 3)],
        amount: Math.floor(Math.random() * 50000) / 100,
      })) as DeviationData[];
      
    default:
      return [];
  }
};

// Column definitions for different report types
const getColumnDefinitions = (type: string) => {
  switch (type) {
    case 'schedules':
      return [
        { header: 'Schedule ID', accessorKey: 'id' },
        { header: 'Schedule Date', accessorKey: 'date' },
        { header: 'Description', accessorKey: 'description' },
        { 
          header: 'Status', 
          accessorKey: 'status',
          cell: (item: any) => (
            <Badge 
              variant={
                item.status === 'Completed' ? 'success' : 
                item.status === 'Upcoming' ? 'outline' : 'warning'
              }
            >
              {item.status}
            </Badge>
          )
        },
        { 
          header: 'Amount', 
          accessorKey: 'amount',
          cell: (item: any) => (
            <span className="font-mono">
              ${item.amount.toFixed(2)}
            </span>
          )
        },
      ];
      
    case 'payments':
      return [
        { header: 'Payment ID', accessorKey: 'id' },
        { header: 'Payment Date', accessorKey: 'date' },
        { header: 'Payment Method', accessorKey: 'method' },
        { 
          header: 'Status', 
          accessorKey: 'status',
          cell: (item: any) => (
            <Badge 
              variant={
                item.status === 'Completed' ? 'success' : 
                item.status === 'Pending' ? 'outline' : 'destructive'
              }
            >
              {item.status}
            </Badge>
          )
        },
        { 
          header: 'Amount', 
          accessorKey: 'amount',
          cell: (item: any) => (
            <span className="font-mono">
              ${item.amount.toFixed(2)}
            </span>
          )
        },
      ];
      
    case 'invoices':
      return [
        { header: 'Invoice ID', accessorKey: 'id' },
        { header: 'Issue Date', accessorKey: 'date' },
        { header: 'Due Date', accessorKey: 'dueDate' },
        { 
          header: 'Status', 
          accessorKey: 'status',
          cell: (item: any) => (
            <Badge 
              variant={
                item.status === 'Paid' ? 'success' : 
                item.status === 'Unpaid' ? 'outline' : 'destructive'
              }
            >
              {item.status}
            </Badge>
          )
        },
        { 
          header: 'Amount', 
          accessorKey: 'amount',
          cell: (item: any) => (
            <span className="font-mono">
              ${item.amount.toFixed(2)}
            </span>
          )
        },
      ];
      
    case 'deviations':
      return [
        { header: 'Deviation ID', accessorKey: 'id' },
        { header: 'Request Date', accessorKey: 'date' },
        { header: 'Request Type', accessorKey: 'requestType' },
        { 
          header: 'Status', 
          accessorKey: 'status',
          cell: (item: any) => (
            <Badge 
              variant={
                item.status === 'Approved' ? 'success' : 
                item.status === 'Pending' ? 'outline' : 'destructive'
              }
            >
              {item.status}
            </Badge>
          )
        },
        { 
          header: 'Amount', 
          accessorKey: 'amount',
          cell: (item: any) => (
            <span className="font-mono">
              ${item.amount.toFixed(2)}
            </span>
          )
        },
      ];
      
    default:
      return [];
  }
};

type FilterState = {
  [key: string]: string[];
};

interface CustomerReportProps {
  customerId: string;
  reportType: string;
  title: string;
}

export default function CustomerReport({ 
  customerId, 
  reportType, 
  title 
}: CustomerReportProps) {
  const [search, setSearch] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({});
  
  const columnDefinitions = useMemo(() => getColumnDefinitions(reportType), [reportType]);
  const mockData = useMemo(() => generateMockData(reportType), [reportType]);
  
  // Initialize visible columns
  useState(() => {
    setVisibleColumns(columnDefinitions.map(col => col.header));
  });
  
  // Calculate total for numeric columns
  const totals = useMemo(() => {
    if (!mockData.length) return {};
    
    const result: Record<string, number> = {};
    
    columnDefinitions.forEach(column => {
      const key = column.accessorKey as string;
      const firstItem = mockData[0][key as keyof ReportData];
      
      // Check if the column contains numeric values
      if (typeof firstItem === 'number') {
        result[key] = mockData.reduce((sum, item) => sum + (item[key as keyof ReportData] as number || 0), 0);
      }
    });
    
    return result;
  }, [mockData, columnDefinitions]);
  
  // Determine available filter options
  const filterOptions = useMemo(() => {
    const options: Record<string, string[]> = {};
    
    if (mockData.length === 0) return options;
    
    columnDefinitions.forEach(column => {
      const key = column.accessorKey as string;
      if (typeof mockData[0][key as keyof ReportData] === 'string') {
        const uniqueValues = Array.from(new Set(mockData.map(item => String(item[key as keyof ReportData]))));
        if (uniqueValues.length > 1 && uniqueValues.length < 10) {
          options[key] = uniqueValues;
        }
      }
    });
    
    return options;
  }, [mockData, columnDefinitions]);
  
  // Apply filters to the data
  const filteredData = useMemo(() => {
    let result = mockData;
    
    // Apply text search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(item => 
        Object.values(item).some(
          value => String(value).toLowerCase().includes(searchLower)
        )
      );
    }
    
    // Apply filters
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter(item => {
          const itemValue = String(item[key as keyof ReportData]);
          return values.includes(itemValue);
        });
      }
    });
    
    return result;
  }, [mockData, search, filters]);
  
  // Filter columns based on visibility
  const visibleColumnDefs = useMemo(() => {
    return columnDefinitions.filter(col => visibleColumns.includes(col.header));
  }, [columnDefinitions, visibleColumns]);
  
  // Handle column visibility toggle
  const toggleColumnVisibility = (header: string) => {
    setVisibleColumns(prev => {
      if (prev.includes(header)) {
        // Don't allow hiding all columns
        if (prev.length === 1) return prev;
        return prev.filter(col => col !== header);
      } else {
        return [...prev, header];
      }
    });
  };
  
  // Handle filter changes
  const toggleFilter = (column: string, value: string) => {
    setFilters(prev => {
      const current = prev[column] || [];
      if (current.includes(value)) {
        const updated = current.filter(v => v !== value);
        return {
          ...prev,
          [column]: updated.length ? updated : []
        };
      } else {
        return {
          ...prev,
          [column]: [...current, value]
        };
      }
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    setSearch('');
  };
  
  // Format number as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        
        <div className="flex items-center space-x-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                onClick={() => setSearch('')}
              >
                <X size={16} />
              </Button>
            )}
          </div>
          
          {/* Column Visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columnDefinitions.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.header}
                  checked={visibleColumns.includes(column.header)}
                  onCheckedChange={() => toggleColumnVisibility(column.header)}
                >
                  {column.header}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Filters */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant={Object.keys(filters).length > 0 ? "default" : "outline"} 
                size="sm"
                className="gap-2"
              >
                <SlidersHorizontal size={16} />
                Filters
                {Object.keys(filters).length > 0 && (
                  <Badge variant="outline">
                    {Object.keys(filters).length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="font-medium">Filter Data</div>
                {Object.entries(filterOptions).length === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    No filters available for this data.
                  </div>
                ) : (
                  <>
                    {Object.entries(filterOptions).map(([column, values]) => (
                      <div key={column} className="space-y-2">
                        <Label>{columnDefinitions.find(col => col.accessorKey === column)?.header}</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {values.map(value => (
                            <div key={value} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`${column}-${value}`}
                                checked={(filters[column] || []).includes(value)}
                                onCheckedChange={() => toggleFilter(column, value)}
                              />
                              <Label 
                                htmlFor={`${column}-${value}`}
                                className="text-sm font-normal"
                              >
                                {value}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {Object.keys(filters).length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 w-full"
                        onClick={clearFilters}
                      >
                        Clear All Filters
                      </Button>
                    )}
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <DataTable
        data={filteredData}
        columns={visibleColumnDefs}
        title=""
        searchable={false}
      />
      
      {/* Summary footer */}
      {Object.keys(totals).length > 0 && (
        <div className="bg-muted/30 p-4 rounded-lg border mt-4">
          <div className="font-medium mb-2">Summary</div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Object.entries(totals).map(([key, value]) => (
              <div key={key} className="bg-card p-3 rounded-md border">
                <div className="text-sm text-muted-foreground">
                  {columnDefinitions.find(col => col.accessorKey === key)?.header}
                </div>
                <div className="text-lg font-mono font-medium">
                  {formatCurrency(value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
