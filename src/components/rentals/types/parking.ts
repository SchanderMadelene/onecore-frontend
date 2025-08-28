
export interface ParkingSpace {
  id: string;
  address: string;
  area: string;
  type: string;
  queueType: string;
  rent: string;
  seekers: number;
  publishedFrom: string;
  publishedTo: string;
}

export interface ParkingApplication {
  id: string;
  parkingSpaceId: string;
  customerId: string;
  customerName: string;
  applicationDate: string;
  applicationType: "Byte" | "Hyra flera";
  status: "pending" | "approved" | "rejected";
  notes?: string;
}

export interface Customer {
  customerNumber: string;
  personalNumber: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  customerType: "tenant" | "applicant";
  address?: string;
}
