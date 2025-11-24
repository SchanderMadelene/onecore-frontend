
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
export type ApartmentType = "Standard" | "Övernattning" | "Korttidsboende";

export interface EntranceAddress {
  id: string;
  name: string; // Address name like "Odenplan 5A", "Odenplan 5B"
  apartments: string[]; // Array of apartment IDs
}

export interface Entrance {
  id: string;
  name: string;
  apartments: string[]; // Array of apartment IDs (kept for backward compatibility)
  addresses?: EntranceAddress[]; // New hierarchical structure
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
  components?: RoomComponent[];
}

export interface APIResponse<T> {
  content: T;
}

export interface Property {
  id: string;
  propertyObjectId: string;
  code: string;
  designation: string;
  propertyNumber?: string;
  municipality: string;
  purpose: string | null;
  buildingType: string | null;
  buildingCount?: number;
  district: string;
  propertyManagerArea: string;
  propertyManager?: string;
  marketArea?: string;
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

export type ComponentLevel = 
  | "room"           // Komponent i rum (t.ex. diskmaskin i kök)
  | "entrance"       // Komponent på uppgång (t.ex. postbox)
  | "building-space" // Komponent i byggnadsutrymme (t.ex. trappor i trapphus)
  | "building"       // Komponent på byggnad (t.ex. värmepanna)
  | "property";      // Komponent på fastighet (ovanligt men möjligt)

export interface ComponentLocation {
  level: ComponentLevel;
  propertyName: string;
  propertyId: string;
  buildingName?: string;
  buildingId?: string;
  
  // För room-nivå
  entranceName?: string;
  entranceId?: string;
  residenceName?: string;
  residenceId?: string;
  currentRoom?: { id: string; name: string };
  availableRooms?: Array<{ id: string; name: string }>;
  
  // För entrance-nivå
  currentEntrance?: { id: string; name: string };
  availableEntrances?: Array<{ id: string; name: string }>;
  
  // För building-space-nivå
  currentSpace?: { id: string; name: string; type: SpaceType };
  availableSpaces?: Array<{ id: string; name: string; type: SpaceType }>;
  
  // För building-nivå
  currentBuilding?: { id: string; name: string };
  availableBuildings?: Array<{ id: string; name: string }>;
}
