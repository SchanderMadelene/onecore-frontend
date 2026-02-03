export interface PropertyReassignment {
  propertyId: string;
  propertyName: string;
  fromSteward: {
    refNr: string;
    name: string;
  };
  toSteward: {
    refNr: string;
    name: string;
  };
  timestamp: Date;
}

export interface StewardInfo {
  refNr: string;
  name: string;
  phone?: string;
  kvvArea?: string;
  propertyCount: number;
}

export interface PropertyForAdmin {
  id: string;
  propertyCode: string;
  propertyName: string;
  address: string;
  buildingType?: string;
  stewardRefNr: string;
  costCenter: string;
}
