// Residence domain types - extracted from shared/types/api.ts

export type ApartmentType = "Standard" | "Övernattning" | "Korttidsboende";

export interface Residence {
  id: string;
  code: string;
  name: string;
  deleted: boolean;
  size?: number;
  rooms?: number;
  rent?: number;
  status?: string;
  apartmentType?: ApartmentType;
  malarenergiFacilityId?: string;
  validityPeriod: {
    fromDate: string;
    toDate: string;
  };
}

export interface RoomComponent {
  id: string;
  name: string;
  type: string;
  brand?: string;
  model?: string;
  installationYear?: number;
  economicLifespan?: number;
  technicalLifespan?: number;
  quantity?: number;
  status?: "Aktiv" | "Under underhåll" | "Ur funktion";
}

export interface Room {
  id: string;
  code: string;
  name: string | null;
  size?: number;
  usage: {
    shared: boolean;
    allowPeriodicWorks: boolean;
    spaceType: number;
  };
  features: {
    hasToilet: boolean;
    isHeated: boolean;
    hasThermostatValve: boolean;
    orientation: number;
  };
  dates: {
    installation: string | null;
    from: string;
    to: string;
    availableFrom: string | null;
    availableTo: string | null;
  };
  sortingOrder: number;
  deleted: boolean;
  timestamp: string;
  roomType: {
    roomTypeId: string;
    roomTypeCode: string;
    name: string | null;
    use: number;
    optionAllowed: number;
    isSystemStandard: number;
    allowSmallRoomsInValuation: number;
    timestamp: string;
  } | null;
  components?: RoomComponent[];
}
