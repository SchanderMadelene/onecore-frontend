// Typer för skyddad identitet på kunder/sökande/hyresgäster.
// Avsiktligt minimal datamodell – följer Skatteverkets tre nivåer.

export type ProtectedIdentityLevel =
  | "sekretessmarkering"
  | "skyddad-folkbokforing"
  | "fingerade-uppgifter";

export interface ProtectedIdentity {
  level: ProtectedIdentityLevel;
  /** ISO-datum när skyddet började gälla (om känt) */
  since?: string;
  /** Intern notering, t.ex. handläggningsanvisning */
  note?: string;
}

/**
 * Marker-interface – allt som kan vara en person med skyddad identitet
 * (hyresgäst, sökande, kund, turnover-rad …) bör utöka denna.
 */
export interface ProtectedPerson {
  protectedIdentity?: ProtectedIdentity;
}

export const protectedIdentityLevelLabels: Record<ProtectedIdentityLevel, string> = {
  "sekretessmarkering": "Sekretessmarkering",
  "skyddad-folkbokforing": "Skyddad folkbokföring",
  "fingerade-uppgifter": "Fingerade personuppgifter",
};
