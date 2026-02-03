import { PropertyAreaEntry, Steward, CostCenter, COST_CENTER_NAMES, BUILDING_TYPES } from '../types';
import { propertyAreaEntries } from './property-areas';

export { propertyAreaEntries };

export function getAllPropertyAreas(): PropertyAreaEntry[] {
  return propertyAreaEntries;
}

export function getUniqueCostCenters(): string[] {
  const costCenters = new Set(propertyAreaEntries.map(e => e.costCenter));
  return Array.from(costCenters).sort();
}

export function getUniqueStewards(): { name: string; refNr: string; phone?: string }[] {
  const stewardMap = new Map<string, { name: string; refNr: string; phone?: string }>();
  propertyAreaEntries.forEach(e => {
    if (!stewardMap.has(e.stewardRefNr)) {
      stewardMap.set(e.stewardRefNr, { 
        name: e.stewardName, 
        refNr: e.stewardRefNr,
        phone: e.stewardPhone 
      });
    }
  });
  return Array.from(stewardMap.values()).sort((a, b) => a.name.localeCompare(b.name, 'sv'));
}

export function getUniqueBuildingTypes(): string[] {
  const types = new Set(propertyAreaEntries.map(e => e.buildingType).filter(Boolean) as string[]);
  return Array.from(types).sort();
}

export function getCostCenterName(code: string): string {
  return COST_CENTER_NAMES[code] || code;
}

export function getBuildingTypeName(code: string): string {
  return BUILDING_TYPES[code] || code;
}
