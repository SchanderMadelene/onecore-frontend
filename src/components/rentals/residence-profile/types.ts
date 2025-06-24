
export interface ContactSearchData {
  contactCode: string;
  fullName: string;
  nationalRegistrationNumber?: string;
  phoneNumber?: string;
}

export interface CustomerCard {
  contact: Contact;
  applicationProfile?: ApplicationProfile;
}

export interface Contact {
  contactCode: string;
  fullName: string;
  nationalRegistrationNumber?: string;
  phoneNumbers?: PhoneNumber[];
}

export interface PhoneNumber {
  phoneNumber: string;
  isMainNumber: boolean;
}

export interface ApplicationProfile {
  housingType?: HousingType;
  housingTypeDescription?: string;
  landlord?: string;
  numAdults: number;
  numChildren: number;
  housingReference?: HousingReference;
  lastUpdatedAt?: Date;
}

export interface HousingReference {
  comment?: string;
  email?: string;
  expiresAt?: Date;
  phone?: string;
  reasonRejected?: RejectedReason;
  reviewStatus: ReviewStatus;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface ProfileFormData {
  housingType: HousingType | '';
  housingTypeDescription: string;
  landlord: string;
  numAdults: number;
  numChildren: number;
  housingReference: {
    comment: string;
    email: string;
    phone: string;
    reviewStatus: ReviewStatus;
    reasonRejected: RejectedReason | '';
  };
}

export type HousingType = 
  | "RENTAL" 
  | "SUB_RENTAL" 
  | "LIVES_WITH_FAMILY" 
  | "LODGER" 
  | "OWNS_HOUSE" 
  | "OWNS_FLAT" 
  | "OWNS_ROW_HOUSE" 
  | "OTHER";

export type ReviewStatus = 
  | "PENDING" 
  | "APPROVED" 
  | "REJECTED" 
  | "CONTACTED_UNREACHABLE" 
  | "REFERENCE_NOT_REQUIRED";

export type RejectedReason = 
  | "DEBT_TO_LANDLORD" 
  | "DISTURBANCE" 
  | "LATE_RENT_PAYMENT" 
  | "MISMANAGEMENT";
