import { useQuery } from "@tanstack/react-query";
import { publishedHousingSpaces, type PublishedHousingSpace } from "../data/published-housing";

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
            housingReference: { status: "Godkänd" as const, date: "2024-01-20" },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-01-18" },
            paymentHistory: { status: "Inga anmärkningar" as const, date: "2024-01-15" },
            viewingBooked: { status: "Ja" as const, date: "2024-02-05" },
            offerResponse: { status: "Accepterat" as const, date: "2024-02-10" }
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
            housingReference: { status: "Kontaktad - ej svar" as const, date: "2024-01-25" },
            creditReport: { status: "-" as const },
            paymentHistory: { status: "Behöver kontrolleras" as const, date: "2024-01-20" },
            viewingBooked: { status: "Nej" as const, date: "2024-02-03" },
            offerResponse: { status: "Väntar på svar" as const }
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
            housingReference: { status: "Ej behandlad" as const },
            creditReport: { status: "Hög risk" as const, date: "2024-01-16" },
            paymentHistory: { status: "-" as const },
            viewingBooked: { status: "Väntar på svar" as const },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 4,
            name: "Anders Lindqvist",
            nationalRegistrationNumber: "19880714-3456",
            contactCode: "K-901234",
            queuePoints: 550,
            address: "Vasagatan 22, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-16",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 4,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Godkänd" as const, date: "2024-01-28" },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-01-22" },
            paymentHistory: { status: "Inga anmärkningar" as const, date: "2024-01-18" },
            viewingBooked: { status: "Ja" as const, date: "2024-02-06" },
            offerResponse: { status: "Nekat" as const, date: "2024-02-08" }
          },
          {
            id: 5,
            name: "Sofia Bergström",
            nationalRegistrationNumber: "19970823-7890",
            contactCode: "K-567890",
            queuePoints: 450,
            address: "Östra Ringvägen 5, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-18",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 5,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Godkänd" as const, date: "2024-01-30" },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-01-25" },
            paymentHistory: { status: "Inga anmärkningar" as const, date: "2024-01-22" },
            viewingBooked: { status: "Ja" as const, date: "2024-02-07" },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 6,
            name: "Mohammed Hassan",
            nationalRegistrationNumber: "19920411-2345",
            contactCode: "K-234567",
            queuePoints: 380,
            address: "Skallbergsvägen 12, Västerås",
            housingLeaseStatus: "AboutToEnd" as const,
            applicationDate: "2024-01-20",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 6,
            listingId: id,
            profileStatus: "PartiallyApproved" as const,
            housingReference: { status: "Kontaktad - ej svar" as const, date: "2024-02-01" },
            creditReport: { status: "Förhöjd risk" as const, date: "2024-01-28" },
            paymentHistory: { status: "Behöver kontrolleras" as const, date: "2024-01-25" },
            viewingBooked: { status: "Nej" as const },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 7,
            name: "Anna Pettersson",
            nationalRegistrationNumber: "19861109-6789",
            contactCode: "K-678901",
            queuePoints: 320,
            address: "Haga Parkgata 3, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-22",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 7,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Godkänd" as const, date: "2024-02-02" },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-01-30" },
            paymentHistory: { status: "Inga anmärkningar" as const, date: "2024-01-28" },
            viewingBooked: { status: "Väntar på svar" as const },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 8,
            name: "Johan Eriksson",
            nationalRegistrationNumber: "19790228-4567",
            contactCode: "K-890123",
            queuePoints: 280,
            address: "Norra Ringvägen 18, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-25",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 8,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Referens krävs ej" as const },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-02-01" },
            paymentHistory: { status: "Inga anmärkningar" as const, date: "2024-01-30" },
            viewingBooked: { status: "Ja" as const, date: "2024-02-08" },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 9,
            name: "Fatima Al-Rashid",
            nationalRegistrationNumber: "19940617-8901",
            contactCode: "K-012345",
            queuePoints: 220,
            address: "Pilgatan 7, Västerås",
            housingLeaseStatus: "Ended" as const,
            applicationDate: "2024-01-28",
            hasApartment: false,
            status: "Active" as const,
            applicationType: "Additional" as const,
            priority: 9,
            listingId: id,
            profileStatus: "NotApproved" as const,
            housingReference: { status: "Ej godkänd" as const, date: "2024-02-05" },
            creditReport: { status: "Ingen uppgift tillgänglig" as const },
            paymentHistory: { status: "-" as const },
            viewingBooked: { status: "Nej" as const },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 10,
            name: "Karl-Erik Sundström",
            nationalRegistrationNumber: "19750903-2345",
            contactCode: "K-345679",
            queuePoints: 180,
            address: "Domkyrkoesplanaden 4, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-30",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 10,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Godkänd" as const, date: "2024-02-06" },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-02-03" },
            paymentHistory: { status: "Inga anmärkningar" as const, date: "2024-02-01" },
            viewingBooked: { status: "Väntar på svar" as const },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 11,
            name: "Elin Norberg",
            nationalRegistrationNumber: "20010512-6780",
            contactCode: "K-567891",
            queuePoints: 150,
            address: "Bjurhovdagatan 9, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-02-01",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 11,
            listingId: id,
            profileStatus: "PartiallyApproved" as const,
            housingReference: { status: "Ej behandlad" as const },
            creditReport: { status: "-" as const },
            paymentHistory: { status: "-" as const },
            viewingBooked: { status: "Nej" as const },
            offerResponse: { status: "Väntar på svar" as const }
          },
          {
            id: 12,
            name: "Björn Wallin",
            nationalRegistrationNumber: "19831227-1234",
            contactCode: "K-789013",
            queuePoints: 95,
            address: "Arosgatan 14, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-02-03",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 12,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: { status: "Godkänd" as const, date: "2024-02-08" },
            creditReport: { status: "Godkänd/låg risk" as const, date: "2024-02-06" },
            paymentHistory: { status: "Inga anmärkningar" as const, date: "2024-02-05" },
            viewingBooked: { status: "Ja" as const, date: "2024-02-10" },
            offerResponse: { status: "Väntar på svar" as const }
          }
        ],
        offers: []
      } as HousingListing);
    }
  });
};
