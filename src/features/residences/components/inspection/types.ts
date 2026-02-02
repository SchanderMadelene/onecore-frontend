export type CostResponsibility = 'tenant' | 'landlord' | null;

export interface InspectionRoom {
  roomId: string;
  conditions: {
    wall1: string;
    wall2: string;
    wall3: string;
    wall4: string;
    floor: string;
    ceiling: string;
    details: string;
  };
  actions: {
    wall1: string[];
    wall2: string[];
    wall3: string[];
    wall4: string[];
    floor: string[];
    ceiling: string[];
    details: string[];
  };
  componentNotes: {
    wall1: string;
    wall2: string;
    wall3: string;
    wall4: string;
    floor: string;
    ceiling: string;
    details: string;
  };
  componentPhotos: {
    wall1: string[];
    wall2: string[];
    wall3: string[];
    wall4: string[];
    floor: string[];
    ceiling: string[];
    details: string[];
  };
  costResponsibility: {
    wall1: CostResponsibility;
    wall2: CostResponsibility;
    wall3: CostResponsibility;
    wall4: CostResponsibility;
    floor: CostResponsibility;
    ceiling: CostResponsibility;
    details: CostResponsibility;
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
