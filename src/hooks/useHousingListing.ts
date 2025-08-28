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
            name: "Emma Lindström",
            nationalRegistrationNumber: "901215-3456",
            contactCode: "12045",
            queuePoints: 1890,
            address: "Västermalmsallén 12, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-25",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 4,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: {
              status: "Godkänd" as const,
              date: "2024-01-28"
            },
            creditReport: {
              status: "-" as const
            },
            paymentHistory: {
              status: "Inga anmärkningar" as const,
              date: "2024-01-24"
            },
            viewingBooked: {
              status: "Ja" as const,
              date: "2024-02-02"
            },
            offerResponse: {
              status: "Accepterat" as const,
              date: "2024-02-08"
            }
          },
          {
            id: 5,
            name: "Carl Eriksson",
            nationalRegistrationNumber: "851103-7890",
            contactCode: "12078",
            queuePoints: 3250,
            address: "Hammarby 45, Västerås",
            housingLeaseStatus: "AboutToEnd" as const,
            applicationDate: "2024-01-20",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 5,
            listingId: id,
            profileStatus: "PartiallyApproved" as const,
            housingReference: {
              status: "Kontaktad - ej svar" as const,
              date: "2024-01-30"
            },
            creditReport: {
              status: "-" as const
            },
            paymentHistory: {
              status: "Behöver kontrolleras" as const,
              date: "2024-01-21"
            },
            viewingBooked: {
              status: "Nej" as const,
              date: "2024-02-01"
            },
            offerResponse: {
              status: "Nekat" as const,
              date: "2024-02-06"
            }
          },
          {
            id: 6,
            name: "Sofia Bergman",
            nationalRegistrationNumber: "920408-1234",
            contactCode: "12089",
            queuePoints: 2140,
            address: "Östermalm 8, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-28",
            hasApartment: false,
            status: "Active" as const,
            applicationType: "Additional" as const,
            priority: 6,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: {
              status: "Referens krävs ej" as const,
              date: "2024-01-29"
            },
            creditReport: {
              status: "Godkänd/låg risk" as const,
              date: "2024-01-27"
            },
            paymentHistory: {
              status: "-" as const
            },
            viewingBooked: {
              status: "Ja" as const,
              date: "2024-02-04"
            },
            offerResponse: {
              status: "Väntar på svar" as const
            }
          },
          {
            id: 7,
            name: "David Sjöberg",
            nationalRegistrationNumber: "880622-5678",
            contactCode: "12156",
            queuePoints: 4120,
            address: "Backagatan 22, Västerås",
            housingLeaseStatus: "Ended" as const,
            applicationDate: "2024-01-15",
            hasApartment: false,
            status: "Active" as const,
            applicationType: "Additional" as const,
            priority: 7,
            listingId: id,
            profileStatus: "NotApproved" as const,
            housingReference: {
              status: "Ej godkänd" as const,
              date: "2024-01-18"
            },
            creditReport: {
              status: "Hög risk" as const,
              date: "2024-01-17"
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
            id: 8,
            name: "Lina Wallin",
            nationalRegistrationNumber: "940312-9012",
            contactCode: "12234",
            queuePoints: 1650,
            address: "Rynningevägen 18, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-30",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 8,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: {
              status: "Godkänd" as const,
              date: "2024-02-01"
            },
            creditReport: {
              status: "-" as const
            },
            paymentHistory: {
              status: "Inga anmärkningar" as const
            },
            viewingBooked: {
              status: "Ja" as const,
              date: "2024-02-07"
            },
            offerResponse: {
              status: "Väntar på svar" as const
            }
          },
          {
            id: 9,
            name: "Marcus Holmberg",
            nationalRegistrationNumber: "870925-3456",
            contactCode: "12298",
            queuePoints: 2980,
            address: "Finnsvedsvägen 5, Västerås",
            housingLeaseStatus: "Upcoming" as const,
            applicationDate: "2024-01-22",
            hasApartment: true,
            status: "Active" as const,
            applicationType: "Move" as const,
            priority: 9,
            listingId: id,
            profileStatus: "PartiallyApproved" as const,
            housingReference: {
              status: "Ej behandlad" as const
            },
            creditReport: {
              status: "-" as const
            },
            paymentHistory: {
              status: "Behöver kontrolleras" as const
            },
            viewingBooked: {
              status: "Väntar på svar" as const
            },
            offerResponse: {
              status: "Väntar på svar" as const
            }
          },
          {
            id: 10,
            name: "Amelie Nyström",
            nationalRegistrationNumber: "910807-7890",
            contactCode: "12367",
            queuePoints: 3800,
            address: "Surahammar 14, Västerås",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-18",
            hasApartment: false,
            status: "Active" as const,
            applicationType: "Additional" as const,
            priority: 10,
            listingId: id,
            profileStatus: "Approved" as const,
            housingReference: {
              status: "Godkänd" as const,
              date: "2024-01-20"
            },
            creditReport: {
              status: "Godkänd/låg risk" as const,
              date: "2024-01-19"
            },
            paymentHistory: {
              status: "-" as const
            },
            viewingBooked: {
              status: "Ja" as const,
              date: "2024-02-06"
            },
            offerResponse: {
              status: "Väntar på svar" as const
            }
          }
        ],
        offers: []
      } as HousingListing);
    }
  });
};