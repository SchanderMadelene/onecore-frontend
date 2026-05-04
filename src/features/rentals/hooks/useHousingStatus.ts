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
  | 'ready_for_offer'  // early-unpublished ELLER publishedTo passerat, OCH inga rondar
  | 'offered'          // minst en rond finns OCH ingen är Accepted
  | 'contract'         // någon rond är Accepted, ej historik
  | 'history';         // listing.history finns (mock)

export function useHousingStatus() {
  const { isEarlyUnpublished, getRoundsForListing } = useHousingOffers();

  const getHousingStatus = (housing: PublishedHousingSpace): HousingStatus => {
    // Historik trumfar allt (mock-flag på listingen)
    if ((housing as any).history) {
      return 'history';
    }

    const rounds = getRoundsForListing(housing.id);
    const hasAccepted = rounds.some(r => r.status === 'Accepted');
    const hasAnyRound = rounds.length > 0;

    if (hasAccepted) {
      return 'contract';
    }

    if (hasAnyRound) {
      return 'offered';
    }

    const currentDate = new Date();
    const publishedToDate = new Date(housing.publishedTo);

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
