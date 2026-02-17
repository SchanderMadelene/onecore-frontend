export enum TurnoverStep {
  TERMINATION_RECEIVED = "termination_received",
  INSPECTION_SCHEDULED = "inspection_scheduled",
  INSPECTION_COMPLETED = "inspection_completed",
  ACTIONS_COMPLETED = "actions_completed",
  CLEANING_APPROVED = "cleaning_approved",
  LISTING_PUBLISHED = "listing_published",
  SHOWING_SCHEDULED = "showing_scheduled",
  TENANT_SELECTED = "tenant_selected",
  KEYS_HANDED_OVER = "keys_handed_over",
  MOVE_IN_COMPLETED = "move_in_completed"
}

export enum TurnoverStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress", 
  COMPLETED = "completed",
  BLOCKED = "blocked"
}

export enum TurnoverRole {
  CUSTOMER_SERVICE = "customer_service",
  INSPECTOR = "inspector", 
  PROPERTY_MANAGER = "property_manager"
}

export interface TurnoverParticipant {
  id: string;
  name: string;
  role: TurnoverRole;
  email: string;
  phone?: string;
}

export interface TurnoverComment {
  id: string;
  stepId: TurnoverStep;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: string;
}

export interface TurnoverDocument {
  id: string;
  stepId: TurnoverStep;
  name: string;
  type: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface TurnoverStepData {
  step: TurnoverStep;
  status: TurnoverStatus;
  assignedTo?: string;
  completedAt?: string;
  completedBy?: string;
  dueDate?: string;
  comments: TurnoverComment[];
  documents: TurnoverDocument[];
}

export interface TurnoverCase {
  id: string;
  propertyId: string;
  propertyName: string;
  buildingId: string;
  buildingName: string;
  residenceId: string;
  residenceCode: string;
  address: string;
  
  outgoingTenant: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    moveOutDate: string;
    terminationDate: string;
    terminationReason?: string;
  };
  
  incomingTenant?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    moveInDate?: string;
  };
  
  steps: TurnoverStepData[];
  currentStep: TurnoverStep;
  priority: "low" | "normal" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  estimatedCompletion?: string;
  
  participants: TurnoverParticipant[];
}

export const TURNOVER_STEP_LABELS: Record<TurnoverStep, string> = {
  [TurnoverStep.TERMINATION_RECEIVED]: "Uppsägning mottagen",
  [TurnoverStep.INSPECTION_SCHEDULED]: "Besiktning bokad",
  [TurnoverStep.INSPECTION_COMPLETED]: "Besiktning utförd", 
  [TurnoverStep.ACTIONS_COMPLETED]: "Åtgärder genomförda",
  [TurnoverStep.CLEANING_APPROVED]: "Städning godkänd",
  [TurnoverStep.LISTING_PUBLISHED]: "Bostad publicerad",
  [TurnoverStep.SHOWING_SCHEDULED]: "Visning bokad",
  [TurnoverStep.TENANT_SELECTED]: "Ny hyresgäst utsedd",
  [TurnoverStep.KEYS_HANDED_OVER]: "Nycklar utlämnade",
  [TurnoverStep.MOVE_IN_COMPLETED]: "Inflytt klar"
};

export const TURNOVER_STATUS_LABELS: Record<TurnoverStatus, string> = {
  [TurnoverStatus.PENDING]: "Väntar",
  [TurnoverStatus.IN_PROGRESS]: "Pågår",
  [TurnoverStatus.COMPLETED]: "Klar",
  [TurnoverStatus.BLOCKED]: "Blockerad"
};

export const TURNOVER_ROLE_LABELS: Record<TurnoverRole, string> = {
  [TurnoverRole.CUSTOMER_SERVICE]: "Kundcenter",
  [TurnoverRole.INSPECTOR]: "Besiktningsman",
  [TurnoverRole.PROPERTY_MANAGER]: "Kvartersvärd"
};
