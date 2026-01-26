// Re-export types from residence inspection module
export type { 
  InspectionRoom, 
  InspectionStatus, 
  TenantSnapshot, 
  ResidenceInfo, 
  Inspection, 
  InspectionSubmitData 
} from "@/components/residence/inspection/types";

// Extended inspection type for the overview page
import type { Inspection, ResidenceInfo } from "@/components/residence/inspection/types";

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
