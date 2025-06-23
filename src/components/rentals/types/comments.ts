
export interface ParkingSpaceComment {
  id: string;
  parkingSpaceId: string;
  author: string;
  content: string;
  timestamp: string;
  category?: 'general' | 'maintenance' | 'issue' | 'information';
}
