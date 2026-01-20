export interface InvoiceLineItem {
  amount: number;
  vat: number;
  total: number;
  rentalArticle: string;
  description: string;
  printGroup: string;
}

export interface CreditEvent {
  date: string;
  amount: number;
  relatedInvoiceNumber: string;
}

export interface Invoice {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  balance: number;
  invoiceType: string;
  paymentStatus: 'Obetald' | 'Betald' | 'Delvis betald' | 'Förfallen' | 'Krediterad' | 'Kredit' | 'Delkrediterad';
  relatedInvoiceNumber?: string; // Referens till kopplad faktura (endast för kreditfakturor med status 'Kredit' eller helkrediterade 'Krediterad')
  text?: string;
  inCollection: boolean;
  inCollectionDate?: string; // Datum när fakturan skickades till inkasso
  deferralDate?: string; // Anståndsdatum - endast om fakturan fått anstånd
  paymentDate?: string;
  paidAmount?: number;
  paymentSource?: string;
  preliminaryRefund?: number;
  preliminaryRefundDate?: string;
  creditEvents?: CreditEvent[]; // Lista över alla krediteringshändelser (för delkrediterade fakturor)
  creditBookedDate?: string; // Datum när kreditfaktura bokades (endast för kreditfakturor med status 'Kredit')
  lineItems: InvoiceLineItem[];
}
