import { useSyncExternalStore } from "react";
import { unpublishedHousingSpaces as seed } from "./unpublished-housing";
import type { UnpublishedHousingSpace } from "../types/unpublished-housing";

let spaces: UnpublishedHousingSpace[] = [...seed];
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

export function setSpaceStatus(id: string, status: UnpublishedHousingSpace["status"]) {
  spaces = spaces.map((s) => (s.id === id ? { ...s, status } : s));
  emit();
}

export function setMultipleSpaceStatus(ids: string[], status: UnpublishedHousingSpace["status"]) {
  const idSet = new Set(ids);
  let changed = 0;
  spaces = spaces.map((s) => {
    if (idSet.has(s.id) && s.status === "needs_review") {
      changed++;
      return { ...s, status };
    }
    return s;
  });
  emit();
  return changed;
}

export function useUnpublishedSpaces() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => spaces,
    () => spaces,
  );
}

// --- Publicering: flyttar annons från "Behov av publicering" till "Publicerade" ---
import { publishedHousingSpaces as publishedSeed, type PublishedHousingSpace } from "./published-housing";

/** Antal sökande i mockdatan för en annons (se useHousingListing) */
const MOCK_APPLICANT_COUNT = 16;

let publishVersion = 0;
let publishedExtra: PublishedHousingSpace[] = [];
let publishedSnapshot: PublishedHousingSpace[] = [...publishedSeed];

const rebuildPublished = () => {
  publishedSnapshot = [...publishedExtra, ...publishedSeed];
};

const toPublished = (s: UnpublishedHousingSpace): PublishedHousingSpace => {
  const from = new Date();
  const to = new Date();
  to.setDate(to.getDate() + 14);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  return {
    id: s.id,
    address: s.address,
    area: s.area,
    type: s.type,
    size: s.size,
    rent: s.rent,
    rooms: s.rooms,
    floor: s.floor,
    // Mockdata: nypublicerade annonser får samma sökandelista som övriga annonser
    seekers: MOCK_APPLICANT_COUNT,
    publishedFrom: iso(from),
    publishedTo: iso(to),
    availableFrom: s.availableFrom ?? iso(to),
    preferredMoveOutDate: s.preferredMoveOutDate ?? "",
    description: s.description ?? "",
  };
};

export function publishSpaces(ids: string[]) {
  const idSet = new Set(ids);
  const toMove = spaces.filter((s) => idSet.has(s.id));
  if (toMove.length === 0) return 0;
  spaces = spaces.filter((s) => !idSet.has(s.id));
  publishedExtra = [...toMove.map(toPublished), ...publishedExtra];
  rebuildPublished();
  emit();
  return toMove.length;
}

/** Icke-reaktiv läsning av publicerade annonser (inkl. nyligen publicerade) */
export function getPublishedSpaces(): PublishedHousingSpace[] {
  return publishedSnapshot;
}

/** Ökar varje gång publiceringsläget ändras – används som cache-nyckel */
export function getPublishVersion() {
  return publishVersion;
}

export function usePublishedSpaces() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => publishedSnapshot,
    () => publishedSnapshot,
  );
}
