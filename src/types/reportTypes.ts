
// Report data types
export interface BaseReportData {
  id: string;
  date: string;
  status: string;
  amount: number;
}

export interface ScheduleData extends BaseReportData {
  description: string;
}

export interface PaymentData extends BaseReportData {
  method: string;
}

export interface InvoiceData extends BaseReportData {
  dueDate: string;
}

export interface DeviationData extends BaseReportData {
  requestType: string;
}

// Union type for all report data
export type ReportData = ScheduleData | PaymentData | InvoiceData | DeviationData;

// Filter state type
export type FilterState = {
  [key: string]: string[];
};

// Props for CustomerReport component
export interface CustomerReportProps {
  customerId: string;
  reportType: string;
  title: string;
}
