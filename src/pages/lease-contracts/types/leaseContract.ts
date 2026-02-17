export interface LeaseContractTenant {
  contactCode: string;
  contactKey: string;
  firstName: string;
  lastName: string;
  fullName: string;
  nationalRegistrationNumber: string;
  birthDate: string;
  address: {
    street: string;
    number: string;
    postalCode: string;
    city: string;
  };
  phoneNumbers: {
    phoneNumber: string;
    type: string;
    isMainNumber: number;
  }[];
  emailAddress: string;
  isTenant: boolean;
}

export type LeaseContractType = 'Bostadskontrakt' | 'Bilplatskontrakt' | 'Förrådkontrakt';

export type LeaseContractSubType = 'standard' | 'andrahand' | 'korttid';

export type LeaseContractStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const LEASE_STATUS_LABELS: Record<LeaseContractStatus, string> = {
  0: 'Kommande',
  1: 'Aktivt',
  2: 'Uppsagt',
  3: 'Avslutat',
  4: 'Pausat',
  5: 'Makulerat',
  6: 'Väntar på signatur'
};

export const LEASE_STATUS_VARIANTS: Record<LeaseContractStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  0: 'secondary',
  1: 'default',
  2: 'destructive',
  3: 'outline',
  4: 'secondary',
  5: 'destructive',
  6: 'secondary'
};

export const LEASE_TYPE_LABELS: Record<LeaseContractType, string> = {
  'Bostadskontrakt': 'Bostad',
  'Bilplatskontrakt': 'Bilplats',
  'Förrådkontrakt': 'Förråd'
};

export const LEASE_SUBTYPE_LABELS: Record<LeaseContractSubType, string> = {
  'standard': 'Standard',
  'andrahand': 'Andrahand',
  'korttid': 'Korttid'
};

export interface RentRow {
  id: string;
  description: string;
  amount: number;
  fromDate: string;
  toDate?: string;
}
export interface LeaseContract {
  leaseId: string;
  leaseNumber: string;
  rentalPropertyId: string;
  type: LeaseContractType;
  subType?: LeaseContractSubType;
  leaseStartDate: string;
  leaseEndDate: string | null;
  status: LeaseContractStatus;
  tenants: LeaseContractTenant[];
  noticeGivenBy: string | null;
  noticeDate: string | null;
  noticeTimeTenant: number | null;
  preferredMoveOutDate: string | null;
  terminationDate: string | null;
  contractDate: string;
  lastDebitDate: string | null;
  approvalDate: string | null;
  district?: string;
  propertyId?: string;
  propertyName?: string;
  buildingId?: string;
  buildingName?: string;
  kvvArea?: string;
  costCenter?: string;
  marketArea?: string;
  rentRows?: RentRow[];
}
