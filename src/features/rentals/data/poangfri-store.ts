import { useSyncExternalStore } from "react";
import { poangfriListings as seed } from "./poangfri-housing";
import type { PoangfriListing } from "../types/poangfri";

let listings: PoangfriListing[] = [...seed];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function getPoangfriListings() {
  return listings;
}

export function addPoangfriListing(listing: PoangfriListing) {
  listings = [listing, ...listings.filter((l) => l.id !== listing.id)];
  emit();
}

/** Mockade intresseanmälningar för nypublicerade poängfria annonser – alla obehandlade */
export function createMockPoangfriInterests(listingId: string) {
  const source = seed.find((l) => l.interests.length > 0)?.interests ?? [];
  return source.map((i, idx) => ({
    ...i,
    id: `${listingId}-int-${idx + 1}`,
    status: "unhandled" as const,
    acknowledgedAt: undefined,
    acknowledgedBy: undefined,
  }));
}

export function usePoangfriListings() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => listings,
    () => listings,
  );
}
