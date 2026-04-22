import { useQuery } from "@tanstack/react-query";

export interface StorageSpaceListing {
  id: number;
  address: string;
  area: string;
  type: string;
  size: string;
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

export const useStorageSpaceListing = (id: number) => {
  return useQuery({
    queryKey: ['storageSpaceListing', id],
    queryFn: () => {
      return Promise.resolve({
        id,
        address: "Kopparbergsvägen 8, källarförråd K12",
        area: "Bjurhovda",
        type: "Källarförråd",
        size: "3 m²",
        queueType: "Intern",
        rent: "120 kr/mån",
        seekers: 4,
        publishedFrom: "2024-02-01",
        publishedTo: "2024-02-15",
        districtCode: "BJURHOVDA",
        rentalObjectCode: "F123456",
        applicants: [
          {
            id: 1,
            name: "Astrid Bergström",
            nationalRegistrationNumber: "19850615-1234",
            contactCode: "P-123456",
            queuePoints: 380,
            address: "Kopparbergsvägen 8",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-15",
            hasParkingSpace: false,
            status: "Active" as const,
            applicationType: "Additional" as const,
            priority: 1,
            listingId: id,
          },
          {
            id: 2,
            name: "Bengt Carlsson",
            nationalRegistrationNumber: "19901020-5678",
            contactCode: "P-789012",
            queuePoints: 290,
            address: "Hagavägen 3",
            housingLeaseStatus: "Upcoming" as const,
            applicationDate: "2024-01-20",
            hasParkingSpace: true,
            status: "Active" as const,
            applicationType: "Replace" as const,
            priority: 2,
            listingId: id,
          }
        ],
        offers: []
      } as StorageSpaceListing);
    }
  });
};
