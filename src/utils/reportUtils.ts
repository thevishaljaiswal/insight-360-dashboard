
import { ReportData } from '@/types/reportTypes';
import { ColumnDef } from './reportColumns';

// Format number as currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

// Calculate totals for numeric columns
export const calculateTotals = (mockData: ReportData[], columnDefinitions: ColumnDef[]): Record<string, number> => {
  if (!mockData.length) return {};
  
  const result: Record<string, number> = {};
  
  columnDefinitions.forEach(column => {
    const key = column.accessorKey;
    const firstItem = mockData[0][key as keyof ReportData];
    
    // Check if the column contains numeric values
    if (typeof firstItem === 'number') {
      result[key] = mockData.reduce((sum, item) => 
        sum + (item[key as keyof ReportData] as number || 0), 0);
    }
  });
  
  return result;
};

// Determine available filter options
export const getFilterOptions = (mockData: ReportData[], columnDefinitions: ColumnDef[]): Record<string, string[]> => {
  if (!mockData.length) return {};
  
  const options: Record<string, string[]> = {};
  
  columnDefinitions.forEach(column => {
    const key = column.accessorKey;
    if (typeof mockData[0][key as keyof ReportData] === 'string') {
      const uniqueValues = Array.from(
        new Set(mockData.map(item => String(item[key as keyof ReportData])))
      );
      if (uniqueValues.length > 1 && uniqueValues.length < 10) {
        options[key] = uniqueValues;
      }
    }
  });
  
  return options;
};

// Apply filters to data
export const applyFilters = (
  mockData: ReportData[], 
  search: string, 
  filters: Record<string, string[]>
): ReportData[] => {
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
};
