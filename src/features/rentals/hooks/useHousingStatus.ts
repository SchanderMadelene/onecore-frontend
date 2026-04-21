import { useHousingOffers } from "@/contexts/HousingOffersContext";
import { PublishedHousingSpace } from "../data/published-housing";

export type HousingStatus = 'published' | 'ready_for_offer' | 'offered' | 'history';

export function useHousingStatus() {
  const { isListingOffered, isEarlyUnpublished } = useHousingOffers();

  const getHousingStatus = (housing: PublishedHousingSpace): HousingStatus => {
    const currentDate = new Date();
    const publishedToDate = new Date(housing.publishedTo);
    
    // Check if offer has been sent
    if (isListingOffered(housing.id)) {
      return 'offered';
    }
    
    // Manually moved to "ready for offer" before publication ended
    if (isEarlyUnpublished(housing.id)) {
      return 'ready_for_offer';
    }
    
    // Check if publication period has expired
    if (publishedToDate <= currentDate) {
      return 'ready_for_offer';
    }
    
    // Still within publication period
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
