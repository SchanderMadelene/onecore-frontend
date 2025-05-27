
export interface Contract {
  id: string;
  type: "housing" | "parking" | "storage";
  objectName: string;
  objectId: string;
  startDate: string;
  endDate?: string;
  rent: number;
  status: "active" | "pending" | "terminated";
  terminationDate?: string;
  noticeDate?: string;
}

// Mock data for tenant contracts
export const getMockContractsForTenant = (tenantId: string): Contract[] => {
  switch (tenantId) {
    case "19850101-1234":
      return [
        {
          id: "KT2023-001",
          type: "housing",
          objectName: "Lägenhet 1001",
          objectId: "lgh-101",
          startDate: "2023-01-01",
          rent: 8500,
          status: "active"
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
    // For sambos - both tenants share the same contracts (same contract number KT2024-002)
    case "19900405-5678":
    case "19920712-4321":
      return [
        {
          id: "KT2024-002",
          type: "housing",
          objectName: "Lägenhet 1001",
          objectId: "lgh-101",
          startDate: "2024-01-15",
          rent: 9200,
          status: "active"
        },
        {
          id: "P2024-023",
          type: "parking",
          objectName: "Parkeringsplats 08",
          objectId: "park-08",
          startDate: "2024-01-15",
          rent: 650,
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
    // For second-hand rental scenarios
    case "19781120-3344": // Lars (primary tenant)
      return [
        {
          id: "KT2022-005",
          type: "housing",
          objectName: "Lägenhet 2001",
          objectId: "lgh-201",
          startDate: "2022-05-01",
          rent: 8800,
          status: "active"
        }
      ];
    case "19950630-8877": // Sofia (secondary tenant) - no contracts in main system
      return [];
    default:
      return [];
  }
};
