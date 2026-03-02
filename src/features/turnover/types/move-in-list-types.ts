export type CleaningStatus = 'not_done' | 'booked' | 'approved' | 'reinspection';

export type WelcomeHomeMethod = 'none' | 'digital' | 'manual';

export interface MoveInListChecklist {
  cleaningStatus: CleaningStatus;
  cleaningCount: number;
  cleaningBookedDate?: string;
  cleaningApprovedDate?: string;
  welcomeCallDone: boolean;
  welcomeVisitDone: boolean;
  nameAndIntercomDone: boolean;
  welcomeHomeMethod: WelcomeHomeMethod;
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
