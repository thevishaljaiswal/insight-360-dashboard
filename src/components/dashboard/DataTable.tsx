
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import TableHeader from './table/TableHeader';
import TablePagination from './table/TablePagination';
import TableSearch from './table/TableSearch';
import { filterData, sortData, paginateData } from './table/tableUtils';
import { DataTableProps } from './table/types';

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
  const filteredData = filterData(data, searchQuery);
  
  // Sort data
  const sortedData = sortData(filteredData, sortBy, sortDirection);
  
  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = paginateData(sortedData, currentPage, pageSize);
  
  const handleSort = (column: keyof T) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const resetPage = () => setCurrentPage(1);
  
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden subtle-shadow">
      {(title || searchable) && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          {title && <h3 className="font-medium">{title}</h3>}
          
          {searchable && (
            <TableSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              resetPage={resetPage}
            />
          )}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader 
            columns={columns}
            sortBy={sortBy}
            sortDirection={sortDirection}
            handleSort={handleSort}
          />
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
      
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
