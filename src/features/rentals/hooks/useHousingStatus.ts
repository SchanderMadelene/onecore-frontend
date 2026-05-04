import { useHousingOffers } from "@/contexts/HousingOffersContext";
import { PublishedHousingSpace } from "../data/published-housing";

/**
 * Lifecycle-status för en bostadsannons. Detta är den enda källan
 * för vilken flik en annons hamnar på i HousingSpacesTable.
 *
 * Disjunkta statusar — en annons kan ha exakt en status åt gången.
 */
export type HousingStatus =
  | 'published'        // publishedTo > idag, inga rondar, inte early-unpublished
  | 'ready_for_offer'  // alla rondar döda ELLER (publishedTo passerat OCH inga rondar) ELLER early-unpublished
  | 'offered'          // minst en levande rond (Active) OCH ingen Awarded OCH inget signerat kontrakt
  | 'contract'         // någon rond är Awarded OCH inget signerat kontrakt
  | 'history';         // signerat kontrakt finns ELLER listing.history (mock)

export function useHousingStatus() {
  const { isEarlyUnpublished, getRoundsForListing, getSignedContract } = useHousingOffers();

  const getHousingStatus = (housing: PublishedHousingSpace): HousingStatus => {
    // Historik trumfar allt: signerat kontrakt eller mock-flag
    if (getSignedContract(housing.id) || (housing as any).history) {
      return 'history';
    }

    const rounds = getRoundsForListing(housing.id);
    const hasAwarded = rounds.some(r => r.status === 'Awarded');
    const hasLiveRound = rounds.some(r => r.status === 'Active');

    if (hasAwarded) {
      return 'contract';
    }

    if (hasLiveRound) {
      return 'offered';
    }

    // Inga levande rondar — falla tillbaka till tidsbaserad logik
    const currentDate = new Date();
    const publishedToDate = new Date(housing.publishedTo);

    // Om annonsen har döda rondar (Cancelled/Expired/AllDeclined) räknas det
    // som "Klara för erbjudande" så admin kan starta en ny omgång.
    if (rounds.length > 0) {
      return 'ready_for_offer';
    }

    if (isEarlyUnpublished(housing.id) || publishedToDate <= currentDate) {
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
