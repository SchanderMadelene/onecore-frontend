import { useHousingOffers } from "@/contexts/HousingOffersContext";
import { PublishedHousingSpace } from "../data/published-housing";

export type HousingStatus =
  | 'published'
  | 'ready_for_offer'
  | 'offered'
  | 'ready_for_new_round'
  | 'assigned'
  | 'history';

export function useHousingStatus() {
  const { isListingOffered, isEarlyUnpublished, getRoundsForListing } = useHousingOffers();

  const getHousingStatus = (housing: PublishedHousingSpace): HousingStatus => {
    const rounds = getRoundsForListing(housing.id);

    if (rounds.length > 0) {
      // Någon har tackat ja → tilldelad
      if (rounds.some(r => r.status === 'Accepted')) {
        return 'assigned';
      }
      const latest = rounds[rounds.length - 1];
      if (latest.status === 'Active') {
        return 'offered';
      }
      // AllDeclined / Expired / Cancelled
      return 'ready_for_new_round';
    }

    // Bakåtkompatibilitet: om gammal "isListingOffered" säger ja men inga rounds
    if (isListingOffered(housing.id)) {
      return 'offered';
    }

    if (isEarlyUnpublished(housing.id)) {
      return 'ready_for_offer';
    }

    const currentDate = new Date();
    const publishedToDate = new Date(housing.publishedTo);
    if (publishedToDate <= currentDate) {
      return 'ready_for_offer';
    }
    return 'published';
  };

  const filterHousingByStatus = (housings: PublishedHousingSpace[], status: HousingStatus) => {
    return housings.filter(housing => getHousingStatus(housing) === status);
  };

  return {
    getHousingStatus,
    filterHousingByStatus,
  };
}
