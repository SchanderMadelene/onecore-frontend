export type CostResponsibility = 'tenant' | 'landlord' | null;

export interface InspectionRoom {
  roomId: string;
  conditions: {
    walls: string;
    floor: string;
    ceiling: string;
    appliances: string;
    kitchenDoors: string;
  };
  actions: {
    walls: string[];
    floor: string[];
    ceiling: string[];
    appliances: string[];
    kitchenDoors: string[];
  };
  componentNotes: {
    walls: string;
    floor: string;
    ceiling: string;
    appliances: string;
    kitchenDoors: string;
  };
  componentPhotos: {
    walls: string[];
    floor: string[];
    ceiling: string[];
    appliances: string[];
    kitchenDoors: string[];
  };
  costResponsibility: {
    walls: CostResponsibility;
    floor: CostResponsibility;
    ceiling: CostResponsibility;
    appliances: CostResponsibility;
    kitchenDoors: CostResponsibility;
  };
  photos: string[];
  isApproved: boolean;
  isHandled: boolean;
}

export type InspectionStatus = 'draft' | 'in_progress' | 'completed';

// Snapshot av hyresgästinfo vid besiktningstillfället
export interface TenantSnapshot {
  name: string;
  personalNumber: string;
  phone?: string;
  email?: string;
}

// Auto-hämtad residence-info
export interface ResidenceInfo {
  id: string;
  objectNumber: string;   // code från residence
  address: string;        // name från residence  
  apartmentType?: string;
  size?: number;
}

export interface Inspection {
  id: string;
  inspectionNumber: string;
  date: string;
  inspectedBy: string;
  rooms: Record<string, InspectionRoom>;
  status: InspectionStatus;
  
  // Auto-hämtad residence-info
  residence: ResidenceInfo;
  
  // Snapshot av hyresgäst vid besiktningstillfället
  tenant?: TenantSnapshot;
  
  // Från formuläret
  needsMasterKey: boolean;
  
  isCompleted?: boolean; // Deprecated, use status instead
}

// Data som skickas från formulär till sparfunktion
export interface InspectionSubmitData {
  needsMasterKey: boolean;
  tenant?: TenantSnapshot;
}
