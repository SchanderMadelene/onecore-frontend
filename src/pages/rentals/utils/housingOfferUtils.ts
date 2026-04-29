import type { HousingOfferRound } from "@/contexts/HousingOffersContext";

export type ListingOfferStatus = 'no_offers' | 'offering' | 'assigned';

export function getListingOfferStatus(rounds: HousingOfferRound[]): ListingOfferStatus {
  if (rounds.length === 0) return 'no_offers';
  if (rounds.some(r => r.status === 'Accepted')) return 'assigned';
  return 'offering';
}

export function getRoundTabLabel(round: HousingOfferRound): string {
  const base = `Omgång ${round.roundNumber}`;
  switch (round.status) {
    case 'Active':
      return base;
    case 'Accepted':
      return `${base} (tilldelad)`;
    case 'AllDeclined':
      return `${base} (alla nekade)`;
    case 'Expired':
      return `${base} (utgången)`;
    case 'Cancelled':
      return `${base} (avbruten)`;
    default:
      return base;
  }
}
