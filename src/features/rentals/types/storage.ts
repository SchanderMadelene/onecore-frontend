export interface StorageSpace {
  id: string;
  address: string;
  area: string;
  type: string;
  size: string;
  queueType: string;
  rent: string;
  seekers: number;
  publishedFrom: string;
  publishedTo: string;
}

export interface StorageApplication {
  id: string;
  storageSpaceId: string;
  customerId: string;
  customerName: string;
  applicationDate: string;
  applicationType: "Byte" | "Hyra flera";
  status: "pending" | "approved" | "rejected";
  notes?: string;
}
