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
  /** Omgångsnummer när exakt 1 aktiv omgång finns */
  roundNumber?: number;
  /** Antal aktiva omgångar (>=2 → flera parallella) */
  activeCount?: number;
} {
  if (!rounds || rounds.length === 0) {
    return { status: "Klara för erbjudande" };
  }

  if (rounds.some(r => r.status === "Accepted")) {
    const latest = rounds[rounds.length - 1];
    return { status: "Tilldelad", roundNumber: latest.roundNumber };
  }

  const active = rounds.filter(r => r.status === "Active");
  if (active.length === 1) {
    return { status: "Erbjudande pågår", roundNumber: active[0].roundNumber, activeCount: 1 };
  }
  if (active.length > 1) {
    return { status: "Erbjudande pågår", activeCount: active.length };
  }
  // Inga aktiva, ingen accepterad → klar för ny omgång
  const latest = rounds[rounds.length - 1];
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
