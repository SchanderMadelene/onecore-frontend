export type PoangfriListingStatus =
  | "ready_to_publish"      // Konverterad från standardflöde, väntar på publicering
  | "published"             // Publicerad, intresselista växer
  | "in_progress"           // Pågående kontakt med sökande
  | "contract_created"      // Kontrakt skapat, ärendet stängt
  | "unpublished";          // Avpublicerad utan kontrakt

export type PoangfriInterestStatus =
  | "unhandled"      // Obehandlad – kräver kvittering av handläggare
  | "acknowledged"   // Kvitterad – aktivt under handläggning
  | "contacted"      // Handläggaren har försökt nå
  | "accepted"       // Tackat ja muntligt
  | "declined"       // Tackat nej
  | "not_assigned";  // Ej tilldelad (kontrakt gick till annan)

export type CommunicationType = "phone" | "sms" | "email" | "meeting" | "note";

export interface CommunicationEntry {
  id: string;
  type: CommunicationType;
  date: string;       // ISO
  author: string;     // Handläggarens namn
  summary: string;    // Kort sammanfattning
}

export interface PoangfriInterest {
  id: string;
  name: string;
  customerNumber: string;
  personalNumber?: string;     // Koppling till kundkort (demo: matchar tenant)
  email: string;
  phone: string;
  registeredAt: string;        // ISO – anmäld på Mimer.nu
  desiredMoveInDate?: string;  // ISO – önskat inflyttningsdatum angivet av sökande
  viewingBookedAt?: string;    // ISO – tid för bokad visning
  status: PoangfriInterestStatus;
  acknowledgedAt?: string;     // ISO – när handläggare kvitterade
  acknowledgedBy?: string;     // Handläggarens namn
  communications: CommunicationEntry[];
  housingReference?: {
    status: "Godkänd" | "Ej godkänd" | "Kontaktad - ej svar" | "Referens krävs ej" | "Ej behandlad";
    date?: string; // YYYY-MM-DD
  };
  creditReport?: {
    status: "Godkänd/låg risk" | "Förhöjd risk" | "Hög risk" | "Ingen uppgift tillgänglig";
    date?: string;
  };
  paymentHistory?: {
    status: "Inga anmärkningar" | "Behöver kontrolleras";
    date?: string;
  };
}

export interface PoangfriListing {
  id: string;
  rentalObjectId: string;   // Kopplad lägenhet (kontraktsnummer/objekts-id)
  address: string;
  area: string;
  type: string;
  size: string;
  rooms: number;
  floor: string;
  rent: string;
  description: string;
  publishedAt: string;            // ISO – när annonsen byttes till poängfri
  availableFrom?: string;         // ISO – när bostaden är inflyttningsklar
  convertedFromAdId?: string;     // Standardannonsen den kommer ifrån
  outgoingTenantPersonalNumber?: string; // Avflyttande hyresgäst – för händelselogg
  outgoingTenantName?: string;
  status: PoangfriListingStatus;
  infoText?: string;
  interests: PoangfriInterest[];
}

export const POANGFRI_LISTING_STATUS_LABELS: Record<PoangfriListingStatus, string> = {
  ready_to_publish: "Att publicera",
  published: "Publicerad",
  in_progress: "Pågående kontakt",
  contract_created: "Kontrakt skapat",
  unpublished: "Avpublicerad",
};

export type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "destructive"
  | "success"
  | "muted"
  | "info"
  | "warning"
  | "purple";

export const POANGFRI_LISTING_STATUS_VARIANTS: Record<PoangfriListingStatus, BadgeVariant> = {
  ready_to_publish: "warning",
  published: "info",
  in_progress: "warning",
  contract_created: "success",
  unpublished: "muted",
};

export const POANGFRI_INTEREST_STATUS_LABELS: Record<PoangfriInterestStatus, string> = {
  unhandled: "Obehandlad",
  acknowledged: "Kvitterad",
  contacted: "Kontaktad",
  accepted: "Tackat ja",
  declined: "Tackat nej",
  not_assigned: "Ej tilldelad",
};

export const POANGFRI_INTEREST_STATUS_VARIANTS: Record<PoangfriInterestStatus, BadgeVariant> = {
  unhandled: "warning",
  acknowledged: "info",
  contacted: "info",
  accepted: "success",
  declined: "destructive",
  not_assigned: "muted",
};

export const COMMUNICATION_TYPE_LABELS: Record<CommunicationType, string> = {
  phone: "Telefon",
  sms: "SMS",
  email: "Mejl",
  meeting: "Möte",
  note: "Anteckning",
};
