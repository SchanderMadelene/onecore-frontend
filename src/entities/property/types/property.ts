// Property domain types - extracted from shared/types/api.ts

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

export interface PropertyDetail extends Property {
  parish: string;
  propertyNumber: string;
  direction: string;
  address?: string;
  marketArea?: string;
  propertyManager?: string;
  propertyMap?: PropertyMap;
  buildings: import("@/entities/building/types/building").Building[];
  maintenanceUnits?: MaintenanceUnit[];
}
