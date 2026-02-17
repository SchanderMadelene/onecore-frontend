// Tenant entity types

export interface Tenant {
  firstName: string;
  lastName: string;
  phone: string;
  additionalPhones?: string[];
  email: string;
  contractStatus?: "permanent" | "temporary" | "terminated";
  customerType?: "tenant" | "applicant";
  customerRoles?: string[];
  moveInDate?: string;
  moveOutDate?: string;
  contractNumber?: string;
  personalNumber: string;
  address?: string;
  nationality?: string;
  language?: string;
  hasLegalGuardian?: boolean;
  housingContractType?: string;
  portalCredentials?: {
    username: string;
    password: string;
  };
  loginCount?: number;
  lastLogin?: string;
  isPrimaryTenant?: boolean;
  housingInterests?: string[];
  registrationDate?: string;
  queuePosition?: number;
  relationshipType?: string;
  isPrimaryContractHolder?: boolean;
}

export interface TenantEvent {
  id: string;
  timestamp: string;
  type: 'system' | 'login' | 'profile_change' | 'contract' | 'payment' | 'support' | 'communication';
  title: string;
  description: string;
  user?: string;
  metadata?: Record<string, any>;
}

export interface Contract {
  id: string;
  type: "housing" | "parking" | "storage";
  objectName: string;
  objectId: string;
  startDate: string;
  endDate?: string;
  rent: number;
  status: "active" | "pending" | "terminated";
  terminationDate?: string;
  noticeDate?: string;
  tenant?: {
    firstName: string;
    lastName: string;
    personalNumber: string;
    moveInDate: string;
    moveOutDate?: string;
    email?: string;
    phone?: string;
  };
}

export interface SentMessage {
  id: string;
  type: 'sms' | 'email';
  recipient: string;
  subject?: string;
  messagePreview: string;
  sentAt: string;
  sentBy: string;
  personalNumber: string;
  system: string;
}
