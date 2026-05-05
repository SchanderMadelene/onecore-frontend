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
