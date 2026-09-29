import { getDistrictByArea } from "./area-district";
import { getHousingObjectNumber } from "./object-number";

/**
 * Globala filter för bostadsannonser som ligger ovanför flikarna och
 * därmed gäller oavsett status (Publicera, Publicerat nu, Erbjud visning,
 * Visning, Erbjud kontrakt, Historik).
 */
export interface HousingFiltersState {
  search: string;
  area: string;
  district: string;
  publishedFrom: Date | undefined;
  publishedTo: Date | undefined;
}

export const EMPTY_HOUSING_FILTERS: HousingFiltersState = {
  search: "",
  area: "",
  district: "",
  publishedFrom: undefined,
  publishedTo: undefined,
};

export function hasActiveHousingFilters(filters: HousingFiltersState): boolean {
  return Boolean(
    filters.search.trim() ||
    filters.area ||
    filters.district ||
    filters.publishedFrom ||
    filters.publishedTo
  );
}

interface FilterableHousingRow {
  id: string;
  address: string;
  area: string;
  publishedFrom?: string;
}

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

export function applyHousingFilters<T extends FilterableHousingRow>(
  items: T[],
  filters: HousingFiltersState
): T[] {
  const search = filters.search.trim().toLowerCase();

  return items.filter((item) => {
    if (filters.area && item.area !== filters.area) return false;
    if (filters.district && getDistrictByArea(item.area) !== filters.district) return false;

    if (search) {
      const haystack = [
        item.address,
        getHousingObjectNumber(item.id),
        item.area,
        getDistrictByArea(item.area),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(search)) return false;
    }

    if (filters.publishedFrom || filters.publishedTo) {
      if (!item.publishedFrom) return false;
      const published = new Date(item.publishedFrom);
      if (Number.isNaN(published.getTime())) return false;
      if (filters.publishedFrom && published < startOfDay(filters.publishedFrom)) return false;
      if (filters.publishedTo && published > endOfDay(filters.publishedTo)) return false;
    }

    return true;
  });
}
