import type { Invoice } from "@/types/invoice";

export const getMockInvoicesForCustomer = (customerId: string): Invoice[] => {
  // Default fakturor baserat på bilden
  const defaultInvoices: Invoice[] = [
    {
      invoiceNumber: "10003",
      invoiceDate: "2025-09-29",
      dueDate: "2025-10-29",
      amount: 1000,
      reference: "P016140",
      invoiceType: "Strōfaktura",
      paymentStatus: "Obetald",
      text: "",
      lineItems: []
    },
    {
      invoiceNumber: "552510354931057",
      invoiceDate: "2025-09-15",
      dueDate: "2025-09-30",
      amount: 7967,
      reference: "P016140",
      invoiceType: "Avi",
      paymentStatus: "Obetald",
      text: "",
      lineItems: [
        {
          amount: 0,
          vat: 0,
          total: 0,
          description: "211-002-02-0101/04, STÅÑGJÄRNSGATAN 24",
          printGroup: ""
        },
        {
          amount: 75.14,
          vat: 0,
          total: 75.14,
          rentArticle: "TKAKEL",
          description: "Kök Plusval kökskåkel tillval",
          printGroup: "A"
        },
        {
          amount: 15,
          vat: 0,
          total: 15,
          rentArticle: "HYRSAT",
          description: "Hyressättningsavgift",
          printGroup: "A"
        },
        {
          amount: 7689.47,
          vat: 0,
          total: 7689.47,
          rentArticle: "HYRAB_",
          description: "Hyra bostad",
          printGroup: "A"
        },
        {
          amount: 187.66,
          vat: 0,
          total: 187.66,
          rentArticle: "PLU LU",
          description: "Kök Plusval köksinredning t.o.m. 2029-12-31",
          printGroup: "C"
        }
      ]
    }
  ];

  // Variation för vissa kunder
  const variations: Record<string, Invoice[]> = {
    "1": [
      {
        invoiceNumber: "10125",
        invoiceDate: "2025-10-01",
        dueDate: "2025-10-31",
        amount: 8500,
        reference: "P016140",
        invoiceType: "Hyresfaktura",
        paymentStatus: "Betald",
        text: "",
        lineItems: [
          {
            amount: 8500,
            vat: 0,
            total: 8500,
            rentArticle: "HYRA",
            description: "Hyra bostad",
            printGroup: "A"
          }
        ]
      },
      ...defaultInvoices
    ],
    "2": [
      ...defaultInvoices,
      {
        invoiceNumber: "9876",
        invoiceDate: "2025-08-15",
        dueDate: "2025-09-15",
        amount: 1250,
        reference: "P016140",
        invoiceType: "Strōfaktura",
        paymentStatus: "Försenad",
        text: "Försenad betalning",
        lineItems: [
          {
            amount: 1250,
            vat: 0,
            total: 1250,
            rentArticle: "AVGIFT",
            description: "Förseningsavgift",
            printGroup: "B"
          }
        ]
      }
    ]
  };

  return variations[customerId] || defaultInvoices;
};
