// Barrier entity types - extracted from features/barriers/types/barrier.ts

export interface Barrier {
  id: string;
  type: 'housing' | 'parking' | 'storage' | 'commercial';
  object: string;
  address: string;
  reason: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'inactive' | 'expired';
  createdBy: string;
  createdDate: string;
  notes?: string;
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
