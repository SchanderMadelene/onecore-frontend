
// residence = apartment
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

// New types for hierarchical entrance structure
export type ComponentType = 
  | "Digital bokningstavla" 
  | "Postboxar" 
  | "Brevlådor"
  | "Cykelrum"
  | "Barnvagnsförvaring"
  | "Soprum"
  | "El-mätare"
  | "Värme-mätare"
  | "Ventilation";

export type ApartmentType = "Standard" | "Övernattning" | "Korttidsboende";

export interface EntranceComponent {
  id: string;
  name: string;
  type: ComponentType;
  icon?: string;
  status?: "Aktiv" | "Under underhåll" | "Ur funktion";
  description?: string;
}

export interface EntranceAddress {
  id: string;
  name: string; // Address name like "Odenplan 5A", "Odenplan 5B"
  apartments: string[]; // Array of apartment IDs
  components: EntranceComponent[]; // Components specific to this address
}

export interface Entrance {
  id: string;
  name: string;
  apartments: string[]; // Array of apartment IDs (kept for backward compatibility)
  addresses?: EntranceAddress[]; // New hierarchical structure
  components?: EntranceComponent[]; // Components at entrance level
}

export interface Room {
  id: string;
  code: string;
  name: string | null;
  size?: number; // Added size property in square meters
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
  buildingCount?: number;
  district: string;
  propertyManagerArea: string;
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


export interface MaintenanceUnit {
  id: string;
  name: string;
  type: "Parkeringsområde" | "Lekplats" | "Rekreationsytor" | "Återvinning" | 
        "Tvättsugor" | "Skyddsrum" | "Förråd" | "Installation" | "Lås & passage";
  area: number;
  constructionYear: number;
  lastRenovated?: string;
  status: "Aktiv" | "Under renovering" | "Planerad";
  description?: string;
}

export type SpaceType = 
  | "Trapphus"
  | "Vind" 
  | "Terrasser"
  | "Källare"
  | "Lokaler"
  | "Skyddsrum i byggnaden"
  | "Förråd i byggnaden"
  | "Tvättstugor i byggnaden"
  | "Miljöbodar i byggnaden"
  | "Teknikutrymmen";

export interface SpaceComponent {
  id: string;
  name: string;
  description?: string;
  area?: number;
  status?: "Aktiv" | "Under underhåll" | "Ur funktion";
  specs?: {
    [key: string]: string;
  };
}

export interface BuildingSpace {
  id: string;
  type: SpaceType;
  name: string;
  totalArea?: number;
  components: SpaceComponent[];
}

export interface Building {
  id: string;
  name: string;
  type: string;
  constructionYear: number;
  renovationYear?: number;
  area: number;
  floors: number;
  units: number;
  tenants?: number;
  apartments?: Residence[];
  entrances?: Entrance[];
  spaces?: BuildingSpace[];
}

export interface PropertyDetail extends Property {
  parish: string;
  propertyNumber: string;
  direction: string;
  address?: string;
  marketArea?: string; // Stadsdel/Marknadsområde
  propertyManager?: string; // Förvaltare/kvartersvärd
  propertyMap?: PropertyMap;
  buildings: Building[];
  maintenanceUnits?: MaintenanceUnit[];
}
