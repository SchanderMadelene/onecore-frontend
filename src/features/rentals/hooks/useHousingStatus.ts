import { useHousingOffers } from "@/contexts/HousingOffersContext";
import { PublishedHousingSpace } from "../data/published-housing";

export type HousingStatus = 'published' | 'ready_for_offer' | 'offered' | 'history' | 'assigned';

export function useHousingStatus() {
  const { isListingOffered, isListingAssigned, isEarlyUnpublished } = useHousingOffers();

  const getHousingStatus = (housing: PublishedHousingSpace): HousingStatus => {
    const currentDate = new Date();
    const publishedToDate = new Date(housing.publishedTo);

    if (isListingAssigned(housing.id)) {
      return 'assigned';
    }

    if (isListingOffered(housing.id)) {
      return 'offered';
    }

    if (isEarlyUnpublished(housing.id)) {
      return 'ready_for_offer';
    }

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
    filterHousingByStatus
  };
}
