export interface PropertyAreaEntry {
  id: string;
  costCenter: string;           // k-ställe (61110, 61120, etc)
  stewardName: string;          // Kvartersvärd
  stewardRefNr: string;         // Ref.nr (YY2489, etc)
  propertyCode: string;         // Fastighetsnummer (04101, etc)
  propertyName: string;         // Fastighet (JOSEF 7, etc)
  address: string;              // Adress
}

export interface Steward {
  id: string;
  name: string;
  refNr: string;
  costCenter: string;
  propertyCount: number;
}

export interface CostCenter {
  code: string;
  name: string;
  stewardCount: number;
  propertyCount: number;
}

export const COST_CENTER_NAMES: Record<string, string> = {
  "61110": "Mimer Mitt",
  "61120": "Mimer Väster",
  "61130": "Mimer Norr",
  "61140": "Mimer Öster",
  "61150": "Mimer Syd"
};
