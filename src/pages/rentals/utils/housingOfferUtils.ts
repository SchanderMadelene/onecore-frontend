import type { HousingOfferRound } from "@/shared/contexts/HousingOffersContext";

export type HousingOfferDisplayStatus =
  | "Publicerad"
  | "Klara för erbjudande"
  | "Erbjudande pågår"
  | "Klar för ny omgång"
  | "Tilldelad"
  | "Historik";

/**
 * Härled visningsstatus + omgångsnummer från en lista av omgångar.
 * Återanvänds i header och listvyer.
 */
export function getHousingOfferStatus(rounds: HousingOfferRound[]): {
  status: HousingOfferDisplayStatus;
  roundNumber?: number;
} {
  if (!rounds || rounds.length === 0) {
    return { status: "Klara för erbjudande" };
  }

  const latest = rounds[rounds.length - 1];

  if (rounds.some(r => r.status === "Accepted")) {
    return { status: "Tilldelad", roundNumber: latest.roundNumber };
  }
  if (latest.status === "Active") {
    return { status: "Erbjudande pågår", roundNumber: latest.roundNumber };
  }
  // AllDeclined / Expired / Cancelled → behöver ny omgång
  return { status: "Klar för ny omgång", roundNumber: latest.roundNumber };
}

/**
 * Bygger label för Tabs-flikar: "Omgång 1", "Omgång 2 (avbruten)" etc.
 */
export function getRoundTabLabel(round: HousingOfferRound): string {
  const suffix: Record<HousingOfferRound["status"], string> = {
    Active: "",
    AllDeclined: " (alla nekade)",
    Expired: " (utgången)",
    Cancelled: " (avbruten)",
    Accepted: " (accepterad)",
  };
  return `Omgång ${round.roundNumber}${suffix[round.status]}`;
}
