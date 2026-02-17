// Building domain types - extracted from shared/types/api.ts

import type { Residence } from "@/entities/residence/types/residence";

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

export interface EntranceAddress {
  id: string;
  name: string;
  apartments: string[];
}

export interface Entrance {
  id: string;
  name: string;
  apartments: string[];
  addresses?: EntranceAddress[];
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
