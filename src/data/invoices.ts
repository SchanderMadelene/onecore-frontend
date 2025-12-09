import type { Invoice } from "@/types/invoice";

export const getMockInvoicesForCustomer = (customerId: string): Invoice[] => {
  return [
    {
      invoiceNumber: "10004",
      invoiceDate: "2025-10-01",
      dueDate: "2025-10-31",
      amount: 8000,
      balance: 2800,
      invoiceType: "Avi",
      paymentStatus: "Delvis betald",
      text: "Delbetalning mottagen",
      inCollection: false,
      paymentDate: "2025-10-15",
      paidAmount: 5200,
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
          amount: 7689.47,
          vat: 0,
          total: 7689.47,
          rentalArticle: "HYRAB_",
          description: "Hyra bostad",
          printGroup: "A"
        },
        {
          amount: 310.53,
          vat: 0,
          total: 310.53,
          rentalArticle: "HYRTIL",
          description: "Tillägg",
          printGroup: "A"
        }
      ]
    },
    {
      invoiceNumber: "10003",
      invoiceDate: "2025-09-29",
      dueDate: "2025-10-29",
      amount: 1000,
      balance: 1000,
      invoiceType: "Strömfaktura",
      paymentStatus: "Obetald",
      text: "",
      inCollection: false,
      lineItems: []
    },
    {
      invoiceNumber: "552510354931058",
      invoiceDate: "2025-09-20",
      dueDate: "2025-10-05",
      amount: -3500,
      balance: 0,
      invoiceType: "Kreditfaktura",
      paymentStatus: "Krediterad",
      text: "Kreditering av felaktig debitering",
      inCollection: false,
      preliminaryRefund: 3500,
      preliminaryRefundDate: "2025-10-15",
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
          amount: -3500,
          vat: 0,
          total: -3500,
          rentalArticle: "KREDIT",
          description: "Kreditering av dubbeldebitering",
          printGroup: "A"
        }
      ]
    },
    {
      invoiceNumber: "552510354931057",
      invoiceDate: "2025-09-15",
      dueDate: "2025-09-30",
      amount: 7967,
      balance: 7967,
      invoiceType: "Avi",
      paymentStatus: "Obetald",
      text: "Anstånd beviljat efter kundens begäran",
      inCollection: false,
      deferralDate: "2025-10-15",
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
    },
    {
      invoiceNumber: "552510354820932",
      invoiceDate: "2025-08-15",
      dueDate: "2025-08-30",
      amount: 8150,
      balance: 8150,
      invoiceType: "Avi",
      paymentStatus: "Förfallen",
      text: "Fakturan är skickad till inkasso",
      inCollection: true,
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
          amount: 7689.47,
          vat: 0,
          total: 7689.47,
          rentalArticle: "HYRAB_",
          description: "Hyra bostad",
          printGroup: "A"
        },
        {
          amount: 460.53,
          vat: 0,
          total: 460.53,
          rentalArticle: "INKAVG",
          description: "Inkassoavgift",
          printGroup: "B"
        }
      ]
    },
    {
      invoiceNumber: "552510354715821",
      invoiceDate: "2025-07-15",
      dueDate: "2025-07-30",
      amount: 7689.47,
      balance: -500,
      invoiceType: "Avi",
      paymentStatus: "Betald",
      text: "Överbetalning registrerad",
      inCollection: false,
      paymentDate: "2025-07-28",
      paidAmount: 8189.47,
      paymentSource: "OCR",
      preliminaryRefund: 500,
      preliminaryRefundDate: "2025-08-10",
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
          amount: 7689.47,
          vat: 0,
          total: 7689.47,
          rentalArticle: "HYRAB_",
          description: "Hyra bostad",
          printGroup: "A"
        }
      ]
    },
    {
      invoiceNumber: "552510354610715",
      invoiceDate: "2025-06-15",
      dueDate: "2025-06-30",
      amount: 7689.47,
      balance: 0,
      invoiceType: "Avi",
      paymentStatus: "Betald",
      text: "",
      inCollection: false,
      paymentDate: "2025-06-25",
      paidAmount: 7689.47,
      paymentSource: "OCR",
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
          amount: 7689.47,
          vat: 0,
          total: 7689.47,
          rentalArticle: "HYRAB_",
          description: "Hyra bostad",
          printGroup: "A"
        }
      ]
    }
  ];
};