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
      rent: 8500,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z"
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
      rent: 9200,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z"
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
      rent: 7800,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-02-28T23:59:59Z"
      },
      malarenergiFacilityId: "ME-1003"
    }
  },
  "lgh-001": {
    content: {
      id: "lgh-001",
      code: "LGH-001",
      name: "2 rum och kök, Bellmansgatan",
      deleted: false,
      size: 65,
      rent: 8500,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z"
      },
      malarenergiFacilityId: "ME-001"
    }
  },
  "lgh-002": {
    content: {
      id: "lgh-002",
      code: "LGH-002",
      name: "1 rum och kök, Bellmansgatan",
      deleted: false,
      size: 45,
      rent: 7800,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z"
      },
      malarenergiFacilityId: "ME-002"
    }
  },
  "lgh-003": {
    content: {
      id: "lgh-003",
      code: "LGH-003",
      name: "3 rum och kök, Bellmansgatan",
      deleted: false,
      size: 85,
      rent: 9200,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z"
      },
      malarenergiFacilityId: "ME-003"
    }
  },
  "lgh-004": {
    content: {
      id: "lgh-004",
      code: "LGH-004",
      name: "3 rum och kök, Bellmansgatan",
      deleted: false,
      size: 72,
      rent: 9000,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z"
      },
      malarenergiFacilityId: "ME-004"
    }
  },
  "lgh-005": {
    content: {
      id: "lgh-005",
      code: "LGH-005",
      name: "2 rum och kök, Bellmansgatan",
      deleted: false,
      size: 58,
      rent: 8300,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z"
      },
      malarenergiFacilityId: "ME-005"
    }
  },
  "lgh-006": {
    content: {
      id: "lgh-006",
      code: "LGH-006",
      name: "4 rum och kök, Bellmansgatan",
      deleted: false,
      size: 91,
      rent: 10500,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z"
      },
      malarenergiFacilityId: "ME-006"
    }
  },
  "lgh-007": {
    content: {
      id: "lgh-007",
      code: "LGH-007",
      name: "1 rum och kök, Bellmansgatan",
      deleted: false,
      size: 48,
      rent: 7500,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z"
      },
      malarenergiFacilityId: "ME-007"
    }
  },
  "lgh-008": {
    content: {
      id: "lgh-008",
      code: "LGH-008",
      name: "2 rum och kök, Bellmansgatan",
      deleted: false,
      size: 67,
      rent: 8700,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z"
      },
      malarenergiFacilityId: "ME-008"
    }
  },
  "lgh-009": {
    content: {
      id: "lgh-009",
      code: "LGH-009",
      name: "3 rum och kök, Bellmansgatan",
      deleted: false,
      size: 82,
      rent: 9400,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2025-12-31T23:59:59Z"
      },
      malarenergiFacilityId: "ME-009"
    }
  },
  "lgh-2001": {
    content: {
      id: "lgh-2001",
      code: "LGH-2001",
      name: "2 rum och kök, Odenplan",
      deleted: false,
      rent: 8300,
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
      rent: 9000,
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
      rent: 9500,
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
      rent: 8700,
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
      rent: 10200,
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
      rent: 9100,
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
      rent: 11500,
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
      rent: 9300,
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
      rent: 8600,
      validityPeriod: {
        fromDate: "2024-01-01T00:00:00Z",
        toDate: "2024-12-31T23:59:59Z"
      }
    }
  }
};
