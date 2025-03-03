
import {
  TableHead,
  TableHeader as ShadcnTableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TableHeaderProps } from './types';

export default function TableHeader<T>({
  columns,
  sortBy,
  sortDirection,
  handleSort,
}: TableHeaderProps<T>) {
  return (
    <ShadcnTableHeader>
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
    </ShadcnTableHeader>
  );
}
