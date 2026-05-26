export type PoangfriListingStatus =
  | "published"        // Publicerad, intresselista växer
  | "in_progress"      // Pågående kontakt med sökande
  | "contract_created" // Kontrakt skapat, ärendet stängt
  | "unpublished";     // Avpublicerad utan kontrakt

export type PoangfriInterestStatus =
  | "new"            // Ny anmälan
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
  email: string;
  phone: string;
  registeredAt: string; // ISO – anmäld på Mimer.nu
  status: PoangfriInterestStatus;
  communications: CommunicationEntry[];
}

export interface PoangfriListing {
  id: string;
  rentalObjectId: string;   // Kopplad lägenhet (kontraktsnummer/objekts-id)
  address: string;
  area: string;
  type: string;             // Lägenhet / Korridorrum etc
  size: string;
  rooms: number;
  floor: string;
  rent: string;
  description: string;
  publishedAt: string;      // ISO – när annonsen byttes till poängfri
  convertedFromAdId?: string; // Standardannonsen den kommer ifrån
  status: PoangfriListingStatus;
  infoText?: string;        // Fritext synlig på Mimer.nu
  interests: PoangfriInterest[];
}

export const POANGFRI_LISTING_STATUS_LABELS: Record<PoangfriListingStatus, string> = {
  published: "Publicerad",
  in_progress: "Pågående kontakt",
  contract_created: "Kontrakt skapat",
  unpublished: "Avpublicerad",
};

export const POANGFRI_LISTING_STATUS_VARIANTS: Record<
  PoangfriListingStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  published: "default",
  in_progress: "secondary",
  contract_created: "outline",
  unpublished: "outline",
};

export const POANGFRI_INTEREST_STATUS_LABELS: Record<PoangfriInterestStatus, string> = {
  new: "Ny",
  contacted: "Kontaktad",
  accepted: "Tackat ja",
  declined: "Tackat nej",
  not_assigned: "Ej tilldelad",
};
