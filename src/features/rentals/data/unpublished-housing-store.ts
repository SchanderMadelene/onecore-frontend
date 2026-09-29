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
import { publishedHousingSpaces as publishedSeed, type PublishedHousingSpace, type RentalMethod } from "./published-housing";
import { addPoangfriListing, createMockPoangfriInterests } from "./poangfri-store";

/** Antal sökande i mockdatan för en annons (se useHousingListing) */
const MOCK_APPLICANT_COUNT = 16;

let publishVersion = 0;
let publishedExtra: PublishedHousingSpace[] = [];
let publishedSnapshot: PublishedHousingSpace[] = [...publishedSeed];
/** Id:n som flyttats vidare (t.ex. till Historik) och inte längre ska visas som publicerade */
const removedIds = new Set<string>();

const rebuildPublished = () => {
  publishedSnapshot = [...publishedExtra, ...publishedSeed].filter((h) => !removedIds.has(h.id));
};

const toPublished = (s: UnpublishedHousingSpace, method: RentalMethod): PublishedHousingSpace => {
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
    rentalMethod: method,
  };
};

export function publishSpaces(ids: string[], method: RentalMethod = "standard") {
  const idSet = new Set(ids);
  const toMove = spaces.filter((s) => idSet.has(s.id));
  if (toMove.length === 0) return 0;
  spaces = spaces.filter((s) => !idSet.has(s.id));
  const published = toMove.map((s) => toPublished(s, method));
  if (method === "poangfri") {
    // Poängfri: skapa en poängfri annons med obehandlade intresseanmälningar
    published.forEach((p) => {
      const interests = createMockPoangfriInterests(p.id);
      p.seekers = interests.length;
      addPoangfriListing({
        id: p.id,
        rentalObjectId: p.id,
        address: p.address,
        area: p.area,
        type: "Poängfri",
        size: p.size,
        rooms: p.rooms,
        floor: p.floor,
        rent: p.rent,
        description: p.description,
        publishedAt: new Date().toISOString(),
        availableFrom: p.availableFrom,
        status: "published",
        interests,
      });
    });
  }
  publishedExtra = [...published, ...publishedExtra];
  rebuildPublished();
  publishVersion++;
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

/** Flyttar publicerade annonser ur listan (t.ex. till Historik) */
export function removePublishedSpaces(ids: string[]) {
  if (ids.length === 0) return;
  ids.forEach((id) => removedIds.add(id));
  rebuildPublished();
  publishVersion++;
  emit();
}

/** True om annonsen flyttats vidare (t.ex. till Historik) och inte längre är publicerad */
export function isRemovedFromPublished(id: string) {
  return removedIds.has(id);
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
