
export interface HousingSpace {
  id: string;
  address: string;
  area: string;
  type: string;
  size: string;
  rent: string;
  seekers: number;
  rooms: number;
  floor: string;
  publishedFrom: string;
  publishedTo: string;
}

export interface HousingApplicant {
  name: string;
  customerNumber: string;
  points: string;
  address: string;
  contractStatus: string;
  registrationDate: string;
  hasApartment: string;
  status: string;
  response: string;
  responseDate: string;
  priority: string;
}
