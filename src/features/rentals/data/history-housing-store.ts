import { useSyncExternalStore } from "react";
import { historyHousingSpaces as seed, type HistoryHousingSpace } from "./history-housing";
import { removePublishedSpaces } from "./unpublished-housing-store";

let historyExtra: HistoryHousingSpace[] = [];
let historySnapshot: HistoryHousingSpace[] = [...seed];
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

const iso = (d: Date) => d.toISOString().slice(0, 10);

/**
 * Flyttar en bostadsannons till Historik: skapar en historikrad med den
 * sökande som kontraktsvinnare och tar bort annonsen från publicerade listor.
 */
export function moveToHistory(
  listing: {
    id: string;
    address: string;
    area: string;
    type: string;
    size: string;
    rent: string;
    rooms: number;
    floor: string;
    seekers: number;
    preferredMoveOutDate: string;
  },
  applicant: { name: string; contactCode: string },
) {
  if (historyExtra.some((h) => h.id === listing.id)) return;

  const contractStart = new Date();
  contractStart.setDate(contractStart.getDate() + 30);

  const entry: HistoryHousingSpace = {
    id: listing.id,
    address: listing.address,
    area: listing.area,
    type: listing.type,
    size: listing.size,
    rent: listing.rent,
    rooms: listing.rooms,
    floor: listing.floor,
    contractedTo: applicant.name,
    contractedToCustomerNumber: applicant.contactCode,
    contractStart: iso(contractStart),
    signedAt: iso(new Date()),
    applicants: listing.seekers,
    preferredMoveOutDate: listing.preferredMoveOutDate,
  };

  historyExtra = [entry, ...historyExtra];
  historySnapshot = [...historyExtra, ...seed];
  removePublishedSpaces([listing.id]);
  emit();
}

/** Icke-reaktiv läsning av historikraderna (seed + flyttade annonser) */
export function getHistorySpacesSnapshot(): HistoryHousingSpace[] {
  return historySnapshot;
}

export function useHistorySpaces() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => historySnapshot,
    () => historySnapshot,
  );
}
