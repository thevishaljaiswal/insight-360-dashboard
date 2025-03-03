
import { ReactNode } from 'react';

export interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  searchable?: boolean;
  onRowClick?: (item: T) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export interface TableHeaderProps<T> {
  columns: Column<T>[];
  sortBy: keyof T | null;
  sortDirection: 'asc' | 'desc';
  handleSort: (column: keyof T) => void;
}
