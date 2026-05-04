import { useQuery } from "@tanstack/react-query";
import type { ParkingSpaceListing } from "./useParkingSpaceListing";

/**
 * Mock-implementation som speglar useParkingSpaceListing men med förråds-data.
 * Använder samma typ (ParkingSpaceListing) eftersom strukturen är identisk —
 * det förenklar återanvändning av detaljvyn.
 */
export const useStorageSpaceListing = (id: number) => {
  return useQuery({
    queryKey: ["storageSpaceListing", id],
    queryFn: () =>
      Promise.resolve({
        id,
        address: "Lärkstigen 4",
        area: "Bäckby",
        type: "Källarförråd",
        queueType: "Intern",
        rent: "180 kr/mån",
        seekers: 4,
        publishedFrom: "2024-02-01",
        publishedTo: "2024-02-15",
        districtCode: "BACKBY",
        rentalObjectCode: "F123456",
        applicants: [
          {
            id: 1,
            name: "Karin Lindqvist",
            nationalRegistrationNumber: "19820315-4321",
            contactCode: "F-100123",
            queuePoints: 520,
            address: "Lärkstigen 8",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-12",
            hasParkingSpace: false,
            status: "Active" as const,
            applicationType: "Additional" as const,
            priority: 1,
            listingId: id,
          },
          {
            id: 2,
            name: "Erik Holm",
            nationalRegistrationNumber: "19911105-8765",
            contactCode: "F-100456",
            queuePoints: 410,
            address: "Hammarbacksvägen 4",
            housingLeaseStatus: "Current" as const,
            applicationDate: "2024-01-18",
            hasParkingSpace: false,
            status: "Active" as const,
            applicationType: "Additional" as const,
            priority: 2,
            listingId: id,
          },
        ],
        offers: [],
      } as ParkingSpaceListing),
  });
};
