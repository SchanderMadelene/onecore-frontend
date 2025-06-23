
export interface ParkingSpaceNote {
  id: string;
  parkingSpaceId: string;
  content: string;
  createdAt: string;
  createdBy: string;
  category: "general" | "maintenance" | "rental" | "issue";
}
