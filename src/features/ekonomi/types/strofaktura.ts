export interface StrofakturaArtikel {
  artikelnummer: string;
  namn: string;
  standardPris: number;
}

export interface StrofakturaUnderlag {
  id: string;
  datum: Date;
  kundnummer: string;
  kundnamn: string;
  hyreskontrakt: string;
  kst: string;
  fastighet: string;
  artikel: string;
  artikelnummer: string;
  text?: string;
  antal: number;
  prisInkMoms: number;
  projekt?: string;
  fakturanAvser?: string;
  internInfo?: string;
  createdAt: Date;
}

export interface CustomerLeaseContract {
  leaseId: string;
  objectNumber: string;
  propertyName: string;
  buildingName: string;
  district: string;
  address: string;
}

export interface CustomerSearchResult {
  customerNumber: string;
  personalNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  leaseContracts: CustomerLeaseContract[];
}
