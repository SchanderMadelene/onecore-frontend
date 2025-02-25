
import type { Inspection } from "../types";

const LOCAL_STORAGE_KEY = "inspections";

export const loadInspections = (): Inspection[] => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const saveInspections = (inspections: Inspection[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inspections));
};
