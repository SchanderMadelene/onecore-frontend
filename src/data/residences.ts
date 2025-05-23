import type { Residence, APIResponse } from "@/types/api";

// Residence mock data
export const mockResidenceData: Record<string, APIResponse<Residence>> = {
  "lgh-1001": {
    content: {
      id: "lgh-1001",
      code: "LGH-1001",
      name: "2 rum och kök, Odenplan",
      deleted: false,
      size: 56,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z" // Extended to ensure "Gällande" status
      },
      malarenergiFacilityId: "ME-1001"
    }
  },
  "lgh-1002": {
    content: {
      id: "lgh-1002",
      code: "LGH-1002",
      name: "3 rum och kök, Odenplan",
      deleted: false,
      size: 72,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z" // Extended to ensure "Gällande" status
      },
      malarenergiFacilityId: "ME-1002"
    }
  },
  "lgh-1003": {
    content: {
      id: "lgh-1003",
      code: "LGH-1003",
      name: "1 rum och kök, Odenplan",
      deleted: false,
      size: 45,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-02-28T23:59:59Z" // Set to expire within 90 days to show "Uppsagt"
      },
      malarenergiFacilityId: "ME-1003"
    }
  },
  "lgh-2001": {
    content: {
      id: "lgh-2001",
      code: "LGH-2001",
      name: "2 rum och kök, Odenplan",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  },
  "lgh-2002": {
    content: {
      id: "lgh-2002",
      code: "LGH-2002",
      name: "3 rum och kök, Odenplan",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  },
  "lgh-3001": {
    content: {
      id: "lgh-3001",
      code: "3001",
      name: "3 rum och kök, Götgatan",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  },
  "lgh-3002": {
    content: {
      id: "lgh-3002",
      code: "3002",
      name: "2 rum och kök, Götgatan",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  },
  "lgh-3003": {
    content: {
      id: "lgh-3003",
      code: "3003",
      name: "4 rum och kök, Götgatan",
      deleted: false,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  },
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
