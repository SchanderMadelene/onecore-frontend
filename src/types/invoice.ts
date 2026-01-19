export interface InvoiceLineItem {
  amount: number;
  vat: number;
  total: number;
  rentalArticle: string;
  description: string;
  printGroup: string;
}

export interface Invoice {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  balance: number;
  invoiceType: string;
  paymentStatus: 'Obetald' | 'Betald' | 'Delvis betald' | 'Förfallen' | 'Krediterad' | 'Kredit';
  text?: string;
  inCollection: boolean;
  inCollectionDate?: string; // Datum när fakturan skickades till inkasso
  deferralDate?: string; // Anståndsdatum - endast om fakturan fått anstånd
  paymentDate?: string;
  paidAmount?: number;
  paymentSource?: string;
  preliminaryRefund?: number;
  preliminaryRefundDate?: string;
  lineItems: InvoiceLineItem[];
}
