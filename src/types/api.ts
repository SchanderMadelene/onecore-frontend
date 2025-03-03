
export interface Residence {
  id: string;
  code: string;
  name: string;
  deleted: boolean;
  validityPeriod: {
    fromDate: string;
    toDate: string;
  };
}

export interface Room {
  id: string;
  code: string;
  name: string | null;
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
}

export interface APIResponse<T> {
  content: T;
}

export interface Property {
  id: string;
  propertyObjectId: string;
  code: string;
  designation: string;
  municipality: string;
  purpose: string | null;
  buildingType: string | null;
}

export interface Company {
  id: string;
  propertyObjectId: string;
  code: string;
  name: string;
  organizationNumber: string | null;
}

export interface BuildingLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PropertyMap {
  image: string;
  buildings: BuildingLocation[];
}

export interface PropertyDetail extends Property {
  municipality: string;
  parish: string;
  propertyNumber: string;
  direction: string;
  propertyMap?: PropertyMap;
  buildings: Building[];
}

export interface Building {
  id: string;
  name: string;
  type: string;
  constructionYear: number;
  area: number;
  floors: number;
  units: number;
}
