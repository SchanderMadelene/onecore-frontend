
import type { Residence, APIResponse } from "@/types/api";

// Residence mock data
export const mockResidenceData: Record<string, APIResponse<Residence>> = {
  "lgh-101": {
    content: {
      id: "lgh-101",
      code: "LGH-101",
      name: "3 rum och kök, Odenplan",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  },
  "lgh-201": {
    content: {
      id: "lgh-201",
      code: "LGH-201",
      name: "4 rum och kök, Sveavägen",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  },
  "lgh-301": {
    content: {
      id: "lgh-301",
      code: "LGH-301",
      name: "3 rum och kök, Götgatan",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  },
  "lgh-302": {
    content: {
      id: "lgh-302",
      code: "LGH-302",
      name: "2 rum och kök, Götgatan",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  }
};
