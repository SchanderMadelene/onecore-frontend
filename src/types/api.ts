
export interface Residence {
  id: string;
  code: string;
  name: string;
  deleted: boolean;
  size?: number;
  malarenergiFacilityId?: string;
  validityPeriod: {
    fromDate: string;
    toDate: string;
  };
}
