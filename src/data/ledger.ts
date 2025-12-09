import type { CustomerLedger } from "@/types/ledger";

// Mock data för kundreskontra
export const getMockLedgerForCustomer = (customerId: string): CustomerLedger => {
  // Default data (baserat på bilden)
  const defaultLedger: CustomerLedger = {
    autogiro: {
      active: false,
      status: "Avslutad autogiro"
    },
    invoiceSettings: {
      eInvoice: false,
      smsInvoice: false,
      emailInvoice: false
    },
    balances: {
      overdue: 0.00,
      collections: 0.00,
      submittedToCollections: 0,
      recalledFromCollections: 0,
      preliminaryRefund: 4000.00,
      deposit: 0.00,
      credit: 0.00,
      incorrectPayment: 0.00
    },
    statistics: {
      demandsLastYear: 0,
      averageDaysLate: 11.00,
      invoicesSentToCollections: 0,
      defermentLast12Months: 0
    }
  };

  // Variation för vissa kunder
  const variations: Record<string, Partial<CustomerLedger>> = {
    "1": {
      autogiro: {
        active: true,
        status: "Aktiv autogiro"
      },
      invoiceSettings: {
        eInvoice: true,
        smsInvoice: false,
        emailInvoice: false
      },
      statistics: {
        demandsLastYear: 0,
        averageDaysLate: 0,
        invoicesSentToCollections: 0,
        defermentLast12Months: 1
      }
    },
    "2": {
      balances: {
        ...defaultLedger.balances,
        overdue: 1250.00,
        deposit: 5000.00
      },
      statistics: {
        demandsLastYear: 2,
        averageDaysLate: 15.50,
        invoicesSentToCollections: 3,
        defermentLast12Months: 2
      }
    },
    "3": {
      invoiceSettings: {
        eInvoice: false,
        smsInvoice: true,
        emailInvoice: true
      },
      balances: {
        ...defaultLedger.balances,
        credit: 850.00
      }
    }
  };

  return {
    ...defaultLedger,
    ...variations[customerId]
  };
};
