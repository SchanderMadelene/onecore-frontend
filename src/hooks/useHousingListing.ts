import { useQuery } from "@tanstack/react-query";
import { publishedHousingSpaces, type PublishedHousingSpace } from "@/data/published-housing";

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
    status: "Godkänd/låg risk" | "Förhöjd risk" | "Hög risk" | "Ingen uppgift tillgänglig";
    date: string;
  };
  paymentHistory: {
    status: "Godkänd" | "Ej godkänd" | "Ej behandlad";
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
              status: "Godkänd/låg risk" as const,
              date: "2024-01-18"
            },
            paymentHistory: {
              status: "Godkänd" as const,
              date: "2024-01-15"
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
              status: "Förhöjd risk" as const,
              date: "2024-01-22"
            },
            paymentHistory: {
              status: "Ej godkänd" as const,
              date: "2024-01-20"
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
              status: "Ej behandlad" as const
            }
          }
        ],
        offers: []
      } as HousingListing);
    }
  });
};