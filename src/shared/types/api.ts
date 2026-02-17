
// Re-export all domain types from entities for backward compatibility
// New code should import directly from @/entities/property/types, @/entities/building/types, etc.

export type { Property, PropertyDetail, PropertyMap, BuildingLocation, MaintenanceUnit } from '@/entities/property/types';
export type { Building, BuildingSpace, SpaceType, SpaceComponent, Entrance, EntranceAddress } from '@/entities/building/types';
export type { Residence, Room, RoomComponent, ApartmentType } from '@/entities/residence/types';

// Shared types that stay here (not domain-specific)
export interface APIResponse<T> {
  content: T;
}

export interface Company {
  id: string;
  propertyObjectId: string;
  code: string;
  name: string;
  organizationNumber: string | null;
}

export type ComponentLevel = 
  | "room"
  | "entrance"
  | "building-space"
  | "building"
  | "property";

export interface ComponentLocation {
  level: ComponentLevel;
  propertyName: string;
  propertyId: string;
  buildingName?: string;
  buildingId?: string;
  entranceName?: string;
  entranceId?: string;
  residenceName?: string;
  residenceId?: string;
  currentRoom?: { id: string; name: string };
  availableRooms?: Array<{ id: string; name: string }>;
  currentEntrance?: { id: string; name: string };
  availableEntrances?: Array<{ id: string; name: string }>;
  currentSpace?: { id: string; name: string; type: import('@/entities/building/types').SpaceType };
  availableSpaces?: Array<{ id: string; name: string; type: import('@/entities/building/types').SpaceType }>;
  currentBuilding?: { id: string; name: string };
  availableBuildings?: Array<{ id: string; name: string }>;
}
