// Extended inspection type for the overview page
import type { Inspection } from '@/features/residences/components/inspection/types';

export interface ExtendedInspection extends Inspection {
  contractId?: string;
  address?: string;
  terminationDate?: string;
  district?: string;
  priority?: 'avflytt' | 'inflytt';
  isAssigned?: boolean;
  scheduledDate?: Date;
  assignedInspector?: string;
  tenantPhone?: string;
  masterKey?: boolean;
}

// Re-export base types for convenience
export type {
  Inspection,
  InspectionRoom,
  InspectionStatus,
  TenantSnapshot,
  ResidenceInfo,
  InspectionSubmitData,
} from '@/features/residences/components/inspection/types';
