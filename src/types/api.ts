
export interface Residence {
  id: string;
  code: string;
  name: string;
  deleted: boolean;
  validityPeriod: {
    fromDate: string;
    toDate: string;
  };
}

export interface APIResponse<T> {
  content: T;
}
