import { useQuery } from "@tanstack/react-query";
import { publishedHousingSpaces, type PublishedHousingSpace } from "../data/published-housing";
import { unpublishedHousingSpaces } from "../data/unpublished-housing";
import { historyHousingSpaces } from "../data/history-housing";

export interface HousingApplicant {
  id: number;
  name: string;
  nationalRegistrationNumber: string;
  contactCode: string;
  queuePoints: number;
  address: string;
  housingLeaseStatus: "Current" | "Upcoming" | "AboutToEnd" | "Ended";
  applicationDate: string;
  hasApartment: boolean;
  status: "Active" | "Offered" | "OfferAccepted" | "OfferDeclined" | "Assigned";
  applicationType: "Move" | "Additional";
  priority: number | null;
  listingId: string;
  profileStatus: "Approved" | "PartiallyApproved" | "NotApproved";
  offerId?: number;
  housingReference: {
    status: "Godkänd" | "Ej godkänd" | "Kontaktad - ej svar" | "Referens krävs ej" | "Ej behandlad";
    date?: string;
  };
  creditReport: {
    status: "Godkänd/låg risk" | "Förhöjd risk" | "Hög risk" | "Ingen uppgift tillgänglig" | "-";
    date?: string;
  };
  paymentHistory: {
    status: "Inga anmärkningar" | "Behöver kontrolleras" | "-";
    date?: string;
  };
  viewingBooked?: {
    status: "Ja" | "Nej" | "Väntar på svar";
    date?: string;
  };
  offerResponse?: {
    status: "Accepterat" | "Nekat" | "Väntar på svar";
    date?: string;
  };
}

export interface HousingListing extends PublishedHousingSpace {
  applicants: HousingApplicant[];
  offers: Array<{
    id: number;
    status: "Active" | "Accepted" | "Declined" | "Expired";
    expiresAt: string;
    selectedApplicants: Array<any>;
  }>;
}

export const useHousingListing = (id: string) => {
  return useQuery({
    queryKey: ['housingListing', id],
    queryFn: () => {
      const housing = publishedHousingSpaces.find(h => h.id === id);
      if (!housing) {
        throw new Error('Bostadsannons hittades inte');
      }

      // Mock implementation med mockdata för sökande
      return Promise.resolve({
        ...housing,
        applicants: [
          {
            id: 1,
            name: "Maria Andersson",
            nationalRegistrationNumber: "19901215-1234",
            contactCode: "K-123456",
            queuePoints: 1200,
            address: "Storgatan 15, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-10",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 1,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: {
              status: "Godkänd" as const,
              date: "2024-01-20"
            },
            creditReport: {
              status: "-" as const
            },
            paymentHistory: {
              status: "Inga anmärkningar" as const,
              date: "2024-01-15"
            },
            viewingBooked: {
              status: "Ja" as const,
              date: "2024-02-05"
            },
            offerResponse: {
              status: "Väntar på svar" as const
            }
          },
          {
            id: 2,
            name: "Erik Johansson",
            nationalRegistrationNumber: "19851020-5678",
            contactCode: "K-789012",
            queuePoints: 800,
            address: "Kopparbergsvägen 8, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-12",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 2,
            listingId: id,
            profileStatus: "PartiallyApproved" as const,
            housingReference: {
              status: "Kontaktad - ej svar" as const,
              date: "2024-01-25"
            },
            creditReport: {
              status: "-" as const
            },
            paymentHistory: {
              status: "Behöver kontrolleras" as const,
              date: "2024-01-20"
            },
            viewingBooked: {
              status: "Nej" as const,
              date: "2024-02-03"
            },
            offerResponse: {
              status: "Väntar på svar" as const
            }
          },
          {
            id: 3,
            name: "Lisa Karlsson",
            nationalRegistrationNumber: "19950305-9012",
            contactCode: "K-345678",
            queuePoints: 600,
            address: "Metallgatan 10, Västerås",
            housingLeaseStatus: "Upcoming" as const,
            applicationDate: "2024-01-15",
            hasApartment: false,
            status: "Active" as const,
            applicationType: "Additional" as const,
            priority: 3,
            listingId: id,
            profileStatus: "NotApproved" as const,
            housingReference: {
              status: "Ej behandlad" as const
            },
            creditReport: {
              status: "Hög risk" as const,
              date: "2024-01-16"
            },
            paymentHistory: {
              status: "-" as const
            },
            viewingBooked: {
              status: "Väntar på svar" as const
            },
            offerResponse: {
              status: "Väntar på svar" as const
            }
          },
          {
            id: 4,
            name: "Anders Nilsson",
            nationalRegistrationNumber: "19780622-3344",
            contactCode: "K-456789",
            queuePoints: 1850,
            address: "Sigurdsgatan 22, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-08",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 4,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Godkänd" as const, date: "2024-01-18" },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-01-17" },
            paymentHistory: { status: "Inga anmärkningar" as const, date: "2024-01-17" },
            viewingBooked: { status: "Ja" as const, date: "2024-02-06" },
            offerResponse: { status: "Accepterat" as const, date: "2026-04-12" }
          },
          {
            id: 5,
            name: "Sofia Lindqvist",
            nationalRegistrationNumber: "19921108-7766",
            contactCode: "K-567890",
            queuePoints: 950,
            address: "Vasagatan 5, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-11",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 5,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Kontaktad - ej svar" as const, date: "2024-01-22" },
            creditReport: { status: "Förhöjd risk" as const, date: "2024-01-19" },
            paymentHistory: { status: "Behöver kontrolleras" as const, date: "2024-01-19" },
            viewingBooked: { status: "Väntar på svar" as const },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 6,
            name: "Johan Berg",
            nationalRegistrationNumber: "19870415-2233",
            contactCode: "K-678901",
            queuePoints: 1420,
            address: "Pilgatan 18, Västerås",
            housingLeaseStatus: "AboutToEnd" as const,
            applicationDate: "2024-01-09",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 6,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Godkänd" as const, date: "2024-01-19" },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-01-18" },
            paymentHistory: { status: "Behöver kontrolleras" as const, date: "2024-01-18" },
            viewingBooked: { status: "Ja" as const, date: "2024-02-08" },
            offerResponse: { status: "Nekat" as const, date: "2026-04-14" }
          },
          {
            id: 7,
            name: "Karin Holm",
            nationalRegistrationNumber: "19940927-5544",
            contactCode: "K-789013",
            queuePoints: 720,
            address: "Eriksgatan 9, Västerås",
            housingLeaseStatus: "Upcoming" as const,
            applicationDate: "2024-01-14",
            hasApartment: false,
            status: "Active" as const,
            applicationType: "Additional" as const,
            priority: 7,
            listingId: id,
            profileStatus: "PartiallyApproved" as const,
            housingReference: { status: "Referens krävs ej" as const },
            creditReport: { status: "Förhöjd risk" as const, date: "2024-01-20" },
            paymentHistory: { status: "Behöver kontrolleras" as const, date: "2024-01-20" },
            viewingBooked: { status: "Väntar på svar" as const },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 8,
            name: "Mikael Forsberg",
            nationalRegistrationNumber: "19811203-9988",
            contactCode: "K-890124",
            queuePoints: 2100,
            address: "Bergslagsvägen 14, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-07",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 8,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Godkänd" as const, date: "2024-01-16" },
            creditReport: { status: "Förhöjd risk" as const, date: "2024-01-15" },
            paymentHistory: { status: "Inga anmärkningar" as const, date: "2024-01-15" },
            viewingBooked: { status: "Ja" as const, date: "2024-02-04" },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 9,
            name: "Hanna Petersson",
            nationalRegistrationNumber: "19960719-1122",
            contactCode: "K-901235",
            queuePoints: 540,
            address: "Rosengatan 31, Västerås",
            housingLeaseStatus: "Ended" as const,
            applicationDate: "2024-01-16",
            hasApartment: false,
            status: "Active" as const,
            applicationType: "Additional" as const,
            priority: 9,
            listingId: id,
            profileStatus: "PartiallyApproved" as const,
            housingReference: { status: "Ej behandlad" as const },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-01-21" },
            paymentHistory: { status: "Behöver kontrolleras" as const, date: "2024-01-21" },
            viewingBooked: { status: "Väntar på svar" as const },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 10,
            name: "Daniel Åström",
            nationalRegistrationNumber: "19890530-6677",
            contactCode: "K-012346",
            queuePoints: 1100,
            address: "Smedjegatan 17, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-13",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 10,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Referens krävs ej" as const },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-01-22" },
            paymentHistory: { status: "Inga anmärkningar" as const, date: "2024-01-22" },
            viewingBooked: { status: "Nej" as const, date: "2024-02-10" },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 11,
            name: "Eva Lindqvist",
            nationalRegistrationNumber: "19751014-4455",
            contactCode: "K-123457",
            queuePoints: 2480,
            address: "Nybyggegatan 14, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-06",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 11,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Godkänd" as const, date: "2024-01-14" },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-01-13" },
            paymentHistory: { status: "Behöver kontrolleras" as const, date: "2024-01-13" },
            viewingBooked: { status: "Väntar på svar" as const },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 12,
            name: "Oskar Lundgren",
            nationalRegistrationNumber: "19930826-8899",
            contactCode: "K-234568",
            queuePoints: 880,
            address: "Karlfeldtsgatan 8, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-17",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 12,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Kontaktad - ej svar" as const, date: "2024-01-26" },
            creditReport: { status: "Förhöjd risk" as const, date: "2024-01-24" },
            paymentHistory: { status: "Inga anmärkningar" as const, date: "2024-01-24" },
            viewingBooked: { status: "Väntar på svar" as const },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 13,
            name: "Lina Sjöberg",
            nationalRegistrationNumber: "19980211-3322",
            contactCode: "K-345679",
            queuePoints: 410,
            address: "Vegagatan 5, Västerås",
            housingLeaseStatus: "Upcoming" as const,
            applicationDate: "2024-01-18",
            hasApartment: false,
            status: "Active" as const,
            applicationType: "Additional" as const,
            priority: 13,
            listingId: id,
            profileStatus: "NotApproved" as const,
            housingReference: { status: "Ej behandlad" as const },
            creditReport: { status: "Förhöjd risk" as const, date: "2024-01-25" },
            paymentHistory: { status: "Behöver kontrolleras" as const, date: "2024-01-25" },
            viewingBooked: { status: "Nej" as const, date: "2024-02-11" },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 14,
            name: "Anders Ek",
            nationalRegistrationNumber: "19831122-7788",
            contactCode: "K-456780",
            queuePoints: 1640,
            address: "Trädgårdsgatan 19, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-09",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 14,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Godkänd" as const, date: "2024-01-19" },
            creditReport: { status: "Förhöjd risk" as const, date: "2024-01-17" },
            paymentHistory: { status: "Behöver kontrolleras" as const, date: "2024-01-17" },
            viewingBooked: { status: "Ja" as const, date: "2024-02-05" },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 15,
            name: "Klara Engström",
            nationalRegistrationNumber: "19910704-5511",
            contactCode: "K-567891",
            queuePoints: 1280,
            address: "Hantverkargatan 3, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-11",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 15,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Ej behandlad" as const },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-01-20" },
            paymentHistory: { status: "Inga anmärkningar" as const, date: "2024-01-20" },
            viewingBooked: { status: "Nej" as const, date: "2024-02-08" },
            offerResponse: { status: "Väntar på svar" as const }
          }
        ],
        offers: []
      } as HousingListing);
    }
  });
};
