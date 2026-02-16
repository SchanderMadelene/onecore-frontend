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
  tenantName: string;
  tenantPhone?: string;
  tenantEmail?: string;
  date: string; // ISO date
  contractId?: string;
  checklist: MoveInListChecklist;
}

