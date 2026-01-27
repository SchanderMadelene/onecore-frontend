export type InvoiceMethod = 'e-faktura' | 'pappersfaktura-kivra' | 'autogiro';

export interface CustomerLedger {
  invoiceMethod: InvoiceMethod;
  autogiroDate?: string; // Datum för autogiro-transaktion, endast relevant om invoiceMethod är 'autogiro'
  balances: {
    overdue: number;
    collections: number;
    submittedToCollections: number;
    recalledFromCollections: number;
    preliminaryRefund: number;
    deposit: number;
    credit: number;
    incorrectPayment: number;
  };
  statistics: {
    demandsLastYear: number;
    averageDaysLate: number;
    invoicesSentToCollections: number;
    defermentLast12Months: number;
  };
}
