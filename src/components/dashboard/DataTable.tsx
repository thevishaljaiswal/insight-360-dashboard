
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchable?: boolean;
  onRowClick?: (item: T) => void;
}

export default function DataTable<T>({
  data,
  columns,
  title,
  searchable = true,
  onRowClick,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const pageSize = 5;
  
  // Filter data based on search query
  const filteredData = data.filter(item => {
    if (!searchQuery) return true;
    
    // Search through all properties
    return Object.values(item).some(
      value => String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortBy) return 0;
    
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (aValue === bValue) return 0;
    
    // Handle different types of values
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    if (aValue === null || aValue === undefined) return sortDirection === 'asc' ? -1 : 1;
    if (bValue === null || bValue === undefined) return sortDirection === 'asc' ? 1 : -1;
    
    return sortDirection === 'asc' 
      ? (aValue > bValue ? 1 : -1)
      : (aValue > bValue ? -1 : 1);
  });
  
  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const handleSort = (column: keyof T) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden subtle-shadow">
      {(title || searchable) && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          {title && <h3 className="font-medium">{title}</h3>}
          
          {searchable && (
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                placeholder="Search..."
                className="pl-10 py-2 transition-all bg-background border-border"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                >
                  <X size={16} />
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead 
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleSort(column.accessorKey)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {sortBy === column.accessorKey && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-10 text-muted-foreground">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, rowIndex) => (
                <TableRow 
                  key={rowIndex} 
                  className={onRowClick ? "cursor-pointer hover:bg-muted/20" : ""}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.cell ? column.cell(item) : String(item[column.accessorKey] ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="border-t border-border p-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                let pageNumber: number;
                
                // Logic to show pages around current page
                if (totalPages <= 5) {
                  pageNumber = index + 1;
                } else if (currentPage <= 3) {
                  pageNumber = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + index;
                } else {
                  pageNumber = currentPage - 2 + index;
                }
                
                if (pageNumber === 1 || pageNumber === totalPages || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        isActive={currentPage === pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (pageNumber === 2 || pageNumber === totalPages - 1) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                
                return null;
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
