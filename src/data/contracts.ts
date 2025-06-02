
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
  tenant?: {
    firstName: string;
    lastName: string;
    personalNumber: string;
    moveInDate: string;
    moveOutDate: string;
  };
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
        // Two tenants who shared the same contract period (sambos)
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
        // Single tenant from earlier period
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
