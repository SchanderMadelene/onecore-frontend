export type CleaningStatus = 'not_done' | 'booked' | 'approved' | 'reinspection';

export type ContactStatus = 'not_contacted' | 'not_reached' | 'visit_booked' | 'visit_done';

export type ContractStatus = 'upcoming' | 'active' | 'expired';

export interface MoveInListChecklist {
  cleaningStatus: CleaningStatus;
  cleaningCount: number;
  cleaningBookedDate?: string;
  cleaningApprovedDate?: string;
  contactStatus: ContactStatus;
  contactAttempts: number;
  visitBookedDate?: string;
  nameAndIntercomDone: boolean;
  welcomeHomeDone: boolean;
  inspectionProtocolDone: boolean;
  keysHandled: boolean;
}

export interface MoveInListEntry {
  id: string;
  type: 'move_in' | 'move_out';
  address: string;
  residenceCode: string;
  kvvArea: string;
  contractNumber: string;
  apartmentType: string;
  tenantName: string;
  tenantPhone?: string;
  tenantEmail?: string;
  date: string;
  contractId?: string;
  hasSecurityWarning?: boolean;
  hasQuickMoveIn?: boolean;
  hasTenantNote?: boolean;
  tenantId?: string;
  contractStatus?: ContractStatus;
  checklist: MoveInListChecklist;
}

export interface TurnoverRow {
  residenceKey: string;
  address: string;
  residenceCode: string;
  kvvArea: string;
  apartmentType: string;
  moveOut?: MoveInListEntry;
  moveIn?: MoveInListEntry;
}

// --- Student housing types ---

export interface StudentCleaningChecklist {
  cleaningStatus: CleaningStatus;
  cleaningCount: number;
  cleaningBookedDate?: string;
  cleaningApprovedDate?: string;
}

export interface StudentTurnoverEntry {
  id: string;
  type: 'move_in' | 'move_out';
  roomCode: string;
  propertyName: string;
  kvvArea: string;
  studentName: string;
  gender: 'M' | 'F' | 'O';
  birthDate: string;
  email: string;
  date: string;
  cleaningChecklist: StudentCleaningChecklist;
}

export interface StudentTurnoverRow {
  roomKey: string;
  roomCode: string;
  propertyName: string;
  kvvArea: string;
  moveOut?: StudentTurnoverEntry;
  moveIn?: StudentTurnoverEntry;
}
