import { useParkingSpaceListingsByType, type ListingType } from "./useParkingSpaceListingsByType";
import { useStorageSpaceListingsByType } from "./useStorageSpaceListingsByType";
import type { AssetType } from "../utils/asset-type";

/**
 * Hook-väljare som returnerar rätt datakälla beroende på asset-typ.
 * Per memory `cross-domain-logic-reuse` delar bilplats och förråd UX,
 * men har separata datakällor (Xpand vs intern mock).
 */
export const useAssetListingsByType = (assetType: AssetType, listingType: ListingType) => {
  const parkingQuery = useParkingSpaceListingsByType(listingType);
  const storageQuery = useStorageSpaceListingsByType(listingType);
  return assetType === "storage" ? storageQuery : parkingQuery;
};
