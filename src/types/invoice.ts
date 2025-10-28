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
  paymentStatus: 'Obetald' | 'Betald' | 'Delvis betald' | 'Förfallen';
  text?: string;
  inCollection: boolean;
  source: 'Xpand' | 'Xledger';
  lineItems: InvoiceLineItem[];
}
