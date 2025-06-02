
import type { Room, APIResponse } from "@/types/api";

// Room mock data
export const mockRoomsData: APIResponse<Room[]> = {
  content: [
    {
      id: "1",
      code: "RUM-101",
      name: "Vardagsrum",
      size: 22.5,
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 1
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 1
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 1,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "1",
        roomTypeCode: "VARDAGSRUM",
        name: "Vardagsrum",
        use: 1,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "2",
      code: "RUM-102",
      name: "Kök",
      size: 12.0,
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 2
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 2
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 2,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "2",
        roomTypeCode: "KOK",
        name: "Kök",
        use: 2,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "3",
      code: "RUM-103",
      name: "Sovrum 1",
      size: 15.8,
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 1
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 3
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 3,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "3",
        roomTypeCode: "SOVRUM",
        name: "Sovrum",
        use: 1,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "4",
      code: "RUM-104",
      name: "Badrum",
      size: 6.2,
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 3
      },
      features: {
        hasToilet: true,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 2
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 4,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "4",
        roomTypeCode: "BADRUM",
        name: "Badrum",
        use: 3,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "5",
      code: "RUM-105",
      name: "Sovrum 2",
      size: 13.5,
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 1
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 4
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 5,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "3",
        roomTypeCode: "SOVRUM",
        name: "Sovrum",
        use: 1,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "6",
      code: "RUM-106",
      name: "Hall",
      size: 8.3,
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 4
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: false,
        orientation: 1
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 6,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "5",
        roomTypeCode: "HALL",
        name: "Hall",
        use: 4,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    }
  ]
};
