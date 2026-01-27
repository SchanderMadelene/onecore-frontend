import type { Room } from "@/types/api";

// Mock rooms for inspections - consistent across the app
export const getMockRooms = (): Room[] => [
  {
    id: "room-hall",
    code: "HALL",
    name: "Hall",
    size: 8,
    usage: {
      shared: false,
      allowPeriodicWorks: true,
      spaceType: 1
    },
    features: {
      hasToilet: false,
      isHeated: true,
      hasThermostatValve: true,
      orientation: 0
    },
    dates: {
      installation: null,
      from: "2020-01-01",
      to: "2099-12-31",
      availableFrom: null,
      availableTo: null
    },
    sortingOrder: 1,
    deleted: false,
    timestamp: new Date().toISOString(),
    roomType: null
  },
  {
    id: "room-kok",
    code: "KOK",
    name: "Kök",
    size: 12,
    usage: {
      shared: false,
      allowPeriodicWorks: true,
      spaceType: 2
    },
    features: {
      hasToilet: false,
      isHeated: true,
      hasThermostatValve: true,
      orientation: 0
    },
    dates: {
      installation: null,
      from: "2020-01-01",
      to: "2099-12-31",
      availableFrom: null,
      availableTo: null
    },
    sortingOrder: 2,
    deleted: false,
    timestamp: new Date().toISOString(),
    roomType: null
  },
  {
    id: "room-vardagsrum",
    code: "VARD",
    name: "Vardagsrum",
    size: 22,
    usage: {
      shared: false,
      allowPeriodicWorks: true,
      spaceType: 3
    },
    features: {
      hasToilet: false,
      isHeated: true,
      hasThermostatValve: true,
      orientation: 0
    },
    dates: {
      installation: null,
      from: "2020-01-01",
      to: "2099-12-31",
      availableFrom: null,
      availableTo: null
    },
    sortingOrder: 3,
    deleted: false,
    timestamp: new Date().toISOString(),
    roomType: null
  },
  {
    id: "room-sovrum",
    code: "SOV",
    name: "Sovrum",
    size: 14,
    usage: {
      shared: false,
      allowPeriodicWorks: true,
      spaceType: 4
    },
    features: {
      hasToilet: false,
      isHeated: true,
      hasThermostatValve: true,
      orientation: 0
    },
    dates: {
      installation: null,
      from: "2020-01-01",
      to: "2099-12-31",
      availableFrom: null,
      availableTo: null
    },
    sortingOrder: 4,
    deleted: false,
    timestamp: new Date().toISOString(),
    roomType: null
  },
  {
    id: "room-badrum",
    code: "BAD",
    name: "Badrum",
    size: 6,
    usage: {
      shared: false,
      allowPeriodicWorks: true,
      spaceType: 5
    },
    features: {
      hasToilet: true,
      isHeated: true,
      hasThermostatValve: true,
      orientation: 0
    },
    dates: {
      installation: null,
      from: "2020-01-01",
      to: "2099-12-31",
      availableFrom: null,
      availableTo: null
    },
    sortingOrder: 5,
    deleted: false,
    timestamp: new Date().toISOString(),
    roomType: null
  }
];
