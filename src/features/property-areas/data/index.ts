import { PropertyAreaEntry, Steward, CostCenter, COST_CENTER_NAMES } from '../types';
import { propertyAreaEntries } from './property-areas';

export { propertyAreaEntries };

export function getAllPropertyAreas(): PropertyAreaEntry[] {
  return propertyAreaEntries;
}

export function getUniqueCostCenters(): string[] {
  const costCenters = new Set(propertyAreaEntries.map(e => e.costCenter));
  return Array.from(costCenters).sort();
}

export function getUniqueStewards(): { name: string; refNr: string }[] {
  const stewardMap = new Map<string, { name: string; refNr: string }>();
  propertyAreaEntries.forEach(e => {
    if (!stewardMap.has(e.stewardRefNr)) {
      stewardMap.set(e.stewardRefNr, { name: e.stewardName, refNr: e.stewardRefNr });
    }
  });
  return Array.from(stewardMap.values()).sort((a, b) => a.name.localeCompare(b.name, 'sv'));
}

export function getCostCenterName(code: string): string {
  return COST_CENTER_NAMES[code] || code;
}
