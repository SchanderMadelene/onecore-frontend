
export interface PropertyDetail {
  id: string;
  propertyObjectId?: string;
  code: string;
  designation: string;
  description?: string;
  address: string;
  city?: string;
  postalCode?: string;
  propertyType?: string;
  yearBuilt?: number;
  lastRenovated?: number;
  municipality: string;
  parish?: string;
  propertyNumber?: string;
  direction?: string;
  purpose?: string;
  buildingType?: string;
  buildings: Building[];
  images?: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
  apArea?: number;
  biarea?: number;
  maintenanceUnits?: MaintenanceUnit[];
  propertyMap?: PropertyMap;
}

export interface PropertyMap {
  image: string;
  buildings: BuildingLocation[];
}

export interface BuildingLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Building {
  id: string;
  name: string;
  description?: string;
  address?: string;
  type: string;
  constructionYear: number;
  area: number;
  floors: number;
  units: number; 
  tenants?: number;
  lastRenovated?: number;
  cadastralDesignation?: string;
  constructionMaterial?: string;
  heatingSystem?: string;
  ventilationSystem?: string;
  energyPerformance?: string;
  images?: string[];
  entrances?: Entrance[];
  apartments?: Apartment[];
}

export interface Entrance {
  id: string;
  name: string;
  apartments: string[]; // IDs of apartments in this entrance
}

export interface Apartment {
  id: string;
  code: string;
  area: number;
  rooms: number;
  status: string;
}

export interface Unit {
  id: string;
  unitNumber: string;
  type: string;
  size: number;
  rooms: number;
  rent: number;
  tenant?: Tenant;
  floor: number;
  availableDate?: string;
  images?: string[];
}

export interface MaintenanceUnit {
  id: string;
  name: string;
  type: string;
  area: number;
  constructionYear: number;
  lastRenovated?: string;
  status: string;
  description: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: Company;
}

export interface Company {
  id: string;
  name: string;
  organizationNumber: string;
  contactPerson?: ContactPerson;
  address?: string;
  city?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  code?: string;
}

export interface ContactPerson {
  name: string;
  email: string;
  phone: string;
}

export interface Property {
  id: string;
  propertyObjectId: string;
  code: string;
  designation: string;
  municipality: string;
  purpose: string;
  buildingType: string;
  buildingCount: number;
  district: string;
  managerArea: string;
}

export interface APIResponse<T> {
  content: T;
  meta?: any;
}

export interface Residence {
  id: string;
  code: string;
  name: string;
  deleted: boolean;
  size?: number;
  validityPeriod: {
    fromDate: string;
    toDate: string;
  };
  malarenergiFacilityId?: string;
}

export interface Room {
  id: string;
  code: string;
  name: string;
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
    name: string;
    use: number;
    optionAllowed: number;
    isSystemStandard: number;
    allowSmallRoomsInValuation: number;
    timestamp: string;
  };
}

export interface HousingSpace {
  id: string;
  address: string;
  area: string;
  type: string;
  size: string;
  rent: string;
  seekers: number;
  rooms: number;
  floor: string;
  publishedFrom: string;
  publishedTo: string;
}

export interface HousingApplicant {
  name: string;
  customerNumber: string;
  points: string;
  address: string;
  contractStatus: string;
  registrationDate: string;
  hasApartment: string;
  status: string;
  response: string;
  responseDate: string;
  priority: string;
}
