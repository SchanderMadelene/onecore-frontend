
import type { Contract } from '../types';

export type { Contract };

// Mock data for tenant contracts
export const getMockContractsForTenant = (tenantId: string): Contract[] => {
  switch (tenantId) {
    case "19850101-1234":
      return [
        {
          id: "KT2021-034",
          type: "housing",
          objectName: "Lägenhet 502",
          objectId: "lgh-502",
          startDate: "2021-03-01",
          endDate: "2023-12-31",
          rent: 7200,
          status: "terminated",
          terminationDate: "2023-09-15",
          noticeDate: "2023-08-15"
        },
        {
          id: "KT2025-089",
          type: "housing",
          objectName: "Lägenhet 2003",
          objectId: "lgh-2003",
          startDate: "2025-02-01",
          rent: 9800,
          status: "pending"
        },
        {
          id: "P2023-045",
          type: "parking",
          objectName: "Parkeringsplats 12",
          objectId: "park-12",
          startDate: "2023-01-05",
          rent: 600,
          status: "active"
        },
        {
          id: "S2023-067",
          type: "storage",
          objectName: "Förråd B15",
          objectId: "stor-b15",
          startDate: "2023-01-01",
          rent: 300,
          status: "active"
        }
      ];
    case "19760315-5678":
      return [
        {
          id: "KT2022-087",
          type: "housing",
          objectName: "Kontor 101",
          objectId: "ofc-101",
          startDate: "2022-06-01",
          rent: 12500,
          status: "active"
        }
      ];
    case "19911122-9012":
      return [
        {
          id: "KT2021-112",
          type: "housing",
          objectName: "Lägenhet 3001",
          objectId: "lgh-301",
          startDate: "2021-09-01",
          rent: 7800,
          status: "active"
        },
        {
          id: "P2021-099",
          type: "parking",
          objectName: "Parkeringsplats 05",
          objectId: "park-05",
          startDate: "2021-09-01",
          endDate: "2023-09-01",
          rent: 0,
          status: "terminated",
          terminationDate: "2023-06-01",
          noticeDate: "2023-05-01"
        }
      ];
    default:
      return [];
  }
};

// Mock data for historical tenants by residence ID
export const getHistoricalTenantsForResidence = (residenceId: string) => {
  switch (residenceId) {
    case "lgh-1001":
      return [
        {
          firstName: "Gustav",
          lastName: "Svensson",
          personalNumber: "19801215-4567",
          moveInDate: "2020-03-01",
          moveOutDate: "2022-12-31",
          contractNumber: "KT2020-045"
        },
        {
          firstName: "Maria",
          lastName: "Svensson",
          personalNumber: "19820408-1234",
          moveInDate: "2020-03-01",
          moveOutDate: "2022-12-31",
          contractNumber: "KT2020-045"
        },
        {
          firstName: "Helena",
          lastName: "Lindqvist",
          personalNumber: "19751008-2345",
          moveInDate: "2018-08-15",
          moveOutDate: "2020-02-28",
          contractNumber: "KT2018-123"
        }
      ];
    case "lgh-1002":
      return [
        {
          firstName: "Per",
          lastName: "Nilsson",
          personalNumber: "19850920-6789",
          moveInDate: "2019-11-01",
          moveOutDate: "2023-10-31",
          contractNumber: "KT2019-087"
        }
      ];
    default:
      return [];
  }
};

// Hämta kommande/väntande kontrakt för en lägenhet (inflyttande hyresgäst)
export const getPendingContractForResidence = (residenceId: string): Contract | null => {
  const pendingContracts: Record<string, Contract> = {
    "lgh-1001": {
      id: "KT2026-012",
      type: "housing",
      objectName: "Lägenhet 1001",
      objectId: "lgh-1001",
      startDate: "2026-03-01",
      rent: 8500,
      status: "pending",
      tenant: {
        firstName: "Anna",
        lastName: "Lindberg",
        personalNumber: "19920315-4521",
        moveInDate: "2026-03-01",
        email: "anna.lindberg@email.se",
        phone: "070-123 45 67"
      }
    },
    "lgh-1002": {
      id: "KT2026-018",
      type: "housing",
      objectName: "Lägenhet 1002",
      objectId: "lgh-1002",
      startDate: "2026-04-01",
      rent: 7200,
      status: "pending",
      tenant: {
        firstName: "Johan",
        lastName: "Bergström",
        personalNumber: "19880722-8834",
        moveInDate: "2026-04-01",
        email: "johan.bergstrom@gmail.com",
        phone: "073-987 65 43"
      }
    }
  };

  return pendingContracts[residenceId] || null;
};
