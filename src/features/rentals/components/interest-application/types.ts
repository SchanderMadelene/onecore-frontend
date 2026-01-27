
export type ValidationResult = 
  | 'ok' 
  | 'no-contract'
  | 'needs-replace-by-property'
  | 'needs-replace-by-residential-area'
  | 'has-at-least-one-parking-space';

export interface CreateInterestApplicationParams {
  parkingSpaceId: string;
  customerNumber: string;
  applicationType?: "Replace" | "Additional";
  notes?: string;
}
