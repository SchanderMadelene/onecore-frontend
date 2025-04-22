export interface PropertyDetail {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  propertyType: string;
  yearBuilt: number;
  lastRenovated: number;
  buildings: Building[];
  images: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  apArea: number;
  biarea: number;
}

export interface Building {
  id: string;
  name: string;
  description: string;
  address: string;
  yearBuilt: number;
  floors: number;
  units: Unit[];
  buildingType: string;
  cadastralDesignation: string;
  constructionMaterial: string;
  heatingSystem: string;
  ventilationSystem: string;
  energyPerformance: string;
  images: string[];
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
  images: string[];
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
  contactPerson: ContactPerson;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
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
