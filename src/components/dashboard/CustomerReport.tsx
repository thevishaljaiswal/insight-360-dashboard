
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

// Import types
import { FilterState, CustomerReportProps, ReportData } from '@/types/reportTypes';

// Import utilities
import { generateMockData } from '@/utils/reportMockData';
import { getColumnDefinitions, ColumnDef } from '@/utils/reportColumns';
import { 
  formatCurrency, 
  calculateTotals, 
  getFilterOptions, 
  applyFilters 
} from '@/utils/reportUtils';

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
  const totals = useMemo(() => 
    calculateTotals(mockData, columnDefinitions), 
    [mockData, columnDefinitions]
  );
  
  // Determine available filter options
  const filterOptions = useMemo(() => 
    getFilterOptions(mockData, columnDefinitions), 
    [mockData, columnDefinitions]
  );
  
  // Apply filters to the data
  const filteredData = useMemo(() => 
    applyFilters(mockData, search, filters), 
    [mockData, search, filters]
  );
  
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
