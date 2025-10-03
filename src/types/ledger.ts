export interface CustomerLedger {
  autogiro: {
    active: boolean;
    status: string;
  };
  invoiceSettings: {
    eInvoice: boolean;
    smsInvoice: boolean;
    emailInvoice: boolean;
  };
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
  };
}
