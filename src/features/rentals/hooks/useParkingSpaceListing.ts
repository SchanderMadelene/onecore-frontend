import { useQuery } from "@tanstack/react-query";

// Mock data structure based on legacy types
export interface ParkingSpaceListing {
  id: number;
  address: string;
  area: string;
  type: string;
  queueType: string;
  rent: string;
  seekers: number;
  publishedFrom: string;
  publishedTo: string;
  districtCode: string;
  rentalObjectCode: string;
  applicants: Array<{
    id: number;
    name: string;
    nationalRegistrationNumber: string;
    contactCode: string;
    queuePoints: number;
    address: string;
    housingLeaseStatus: "Current" | "Upcoming" | "AboutToEnd" | "Ended";
    applicationDate: string;
    hasParkingSpace: boolean;
    status: "Active" | "Offered" | "OfferAccepted" | "OfferDeclined" | "Assigned";
    applicationType: "Replace" | "Additional";
    priority: number | null;
    listingId: number;
    offerId?: number;
  }>;
  offers: Array<{
    id: number;
    status: "Active" | "Accepted" | "Declined" | "Expired";
    expiresAt: string;
    selectedApplicants: Array<any>;
  }>;
}

export const useParkingSpaceListing = (id: number) => {
  return useQuery({
    queryKey: ['parkingSpaceListing', id],
    queryFn: () => {
      // Mock implementation - in real app this would call the API
      return Promise.resolve({
        id,
        address: "Högloftsvägen 12",
        area: "Västerås Centrum",
        type: "Carport",
        queueType: "Kronologisk",
        rent: "750 kr/mån",
        seekers: 5,
        publishedFrom: "2024-02-01",
        publishedTo: "2024-02-15",
        districtCode: "CENTRUM",
        rentalObjectCode: "P123456",
        applicants: [
          {
            id: 1,
            name: "Anna Andersson",
            nationalRegistrationNumber: "19850615-1234",
            contactCode: "P-123456",
            queuePoints: 400,
            address: "Högloftsvägen 5",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-15",
            hasParkingSpace: false,
            status: "Active" as const,
            applicationType: "Additional" as const,
            priority: 1,
            listingId: id
          },
          {
            id: 2,
            name: "Bert Bertsson",
            nationalRegistrationNumber: "19901020-5678",
            contactCode: "P-789012",
            queuePoints: 300,
            address: "Stora Gatan 15",
            housingLeaseStatus: "Upcoming" as const,
            applicationDate: "2024-01-20",
            hasParkingSpace: true,
            status: "Offered" as const,
            applicationType: "Replace" as const,
            priority: 1,
            listingId: id,
            offerId: 1
          }
        ],
        offers: [
          {
            id: 1,
            status: "Active" as const,
            expiresAt: "2024-02-20",
            selectedApplicants: []
          }
        ]
      } as ParkingSpaceListing);
    }
  });
};
