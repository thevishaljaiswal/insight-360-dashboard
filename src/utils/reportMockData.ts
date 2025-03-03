
import { ScheduleData, PaymentData, InvoiceData, DeviationData, ReportData } from '@/types/reportTypes';

// Generate mock data for different report types
export const generateMockData = (type: string, count: number = 15): ReportData[] => {
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
