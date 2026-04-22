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
  offer?: {
    id?: number;
    status?: "Active" | "Accepted" | "Declined" | "Expired";
    expiresAt: string;
  };
}
