export interface MoveInListChecklist {
  cleaningDone: boolean;
  welcomeCallDone: boolean;
  welcomeVisitDone: boolean;
  nameAndIntercomDone: boolean;
}

export interface MoveInListEntry {
  id: string;
  type: 'move_in' | 'move_out';
  address: string;
  residenceCode: string;
  kvvArea: string;
  contractNumber: string;
  apartmentType: string; // e.g. "2RK", "3RK", "4RK"
  tenantName: string;
  tenantPhone?: string;
  tenantEmail?: string;
  date: string; // ISO date
  contractId?: string;
  checklist: MoveInListChecklist;
}

