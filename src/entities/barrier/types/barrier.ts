// Barrier entity types - extracted from features/barriers/types/barrier.ts

export type BarrierReasonCategory = 'VLU' | 'FLU' | 'renovation_before' | 'renovation_after' | 'damage' | 'maintenance' | 'other';

export const BARRIER_REASON_CATEGORY_LABELS: Record<BarrierReasonCategory, string> = {
  'VLU': 'VLU - Vakant ledig uthyrningsbar',
  'FLU': 'FLU - Förvaltarens ledig uthyrningsbar',
  'renovation_before': 'Renoveras innan inflytt',
  'renovation_after': 'Renoveras efter inflytt',
  'damage': 'Skada',
  'maintenance': 'Underhåll',
  'other': 'Övrigt',
};

export interface Barrier {
  id: string;
  type: 'housing' | 'parking' | 'storage' | 'commercial';
  object: string;
  address: string;
  reason: string;
  reasonCategory?: BarrierReasonCategory;
  startDate: string;
  endDate?: string;
  status: 'active' | 'inactive' | 'expired';
  createdBy: string;
  createdDate: string;
  notes?: string;
  district?: string;
  propertyId?: string;
  propertyName?: string;
  costCenter?: string;
}

export interface AvailableHousing {
  id: string;
  name: string;
  address: string;
  rent: number;
  size?: number;
  code: string;
}

export interface AvailableParkingSpace {
  id: string;
  name: string;
  address: string;
  rent: number;
  type: 'garage' | 'utomhus' | 'carport';
  area: string;
}

export interface AvailableStorage {
  id: string;
  name: string;
  address: string;
  rent: number;
  size: number;
  location: 'källare' | 'vind' | 'utomhus';
}

export interface AvailableCommercial {
  id: string;
  name: string;
  address: string;
  rent: number;
  size: number;
  type: 'kontor' | 'butik' | 'lager';
}
