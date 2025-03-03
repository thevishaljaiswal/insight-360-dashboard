
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ReportData } from '@/types/reportTypes';

// Column definition type
export interface ColumnDef {
  header: string;
  accessorKey: string;
  cell?: (item: any) => React.ReactNode;
}

// Get column definitions for different report types
export const getColumnDefinitions = (type: string): ColumnDef[] => {
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
