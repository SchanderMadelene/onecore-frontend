
export interface Tenant {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contractStatus: "permanent" | "temporary" | "terminated";
  moveInDate: string;
  moveOutDate?: string;
  contractNumber: string;
  personalNumber: string;
  isPrimaryTenant?: boolean;
  relationshipType?: "sambo" | "primaryTenant" | "secondaryTenant";
  isPrimaryContractHolder?: boolean;
}
