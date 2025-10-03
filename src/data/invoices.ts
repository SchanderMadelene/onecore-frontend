import type { Invoice } from "@/types/invoice";

export const getMockInvoicesForCustomer = (customerId: string): Invoice[] => {
  return [
    {
      invoiceNumber: "10003",
      invoiceDate: "2025-09-29",
      dueDate: "2025-10-29",
      amount: 1000,
      reference: "P016140",
      invoiceType: "Strófaktura",
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
          rentalArticle: "",
          description: "211-002-02-0101/04, STÅNGJÄRNSGATAN 24",
          printGroup: ""
        },
        {
          amount: 75.14,
          vat: 0,
          total: 75.14,
          rentalArticle: "TKAKEL",
          description: "Kök Plusval kökskåkel tillval",
          printGroup: "A"
        },
        {
          amount: 15,
          vat: 0,
          total: 15,
          rentalArticle: "HYRSÄT",
          description: "Hyressättningsavgift",
          printGroup: "A"
        },
        {
          amount: 7689.47,
          vat: 0,
          total: 7689.47,
          rentalArticle: "HYRAB_",
          description: "Hyra bostad",
          printGroup: "A"
        },
        {
          amount: 187.66,
          vat: 0,
          total: 187.66,
          rentalArticle: "PLU LU",
          description: "Kök Plusval köksinredning t.o.m. 2029-12-31",
          printGroup: "C"
        }
      ]
    }
  ];
};
