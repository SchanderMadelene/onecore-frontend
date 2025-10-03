export interface InvoiceLineItem {
  amount: number;
  vat: number;
  total: number;
  rentArticle?: string;
  description: string;
  printGroup: string;
}

export interface Invoice {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  reference: string;
  invoiceType: string;
  paymentStatus: "Obetald" | "Betald" | "Försenad" | "Delvis betald";
  text?: string;
  lineItems: InvoiceLineItem[];
}
