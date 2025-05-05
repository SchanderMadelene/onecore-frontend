
import { Building, Home } from "lucide-react";
import { FilterChip } from "@/components/ui/filter-chip";

type SearchTypeFilter = "property" | "building" | "apartment";

interface PropertyTypeFiltersProps {
  searchTypeFilter: SearchTypeFilter;
  setSearchTypeFilter: (value: SearchTypeFilter) => void;
}

export const PropertyTypeFilters = ({
  searchTypeFilter,
  setSearchTypeFilter,
}: PropertyTypeFiltersProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm font-medium">Filter efter typ</div>
      <div className="flex flex-wrap gap-2">
        <FilterChip
          selected={searchTypeFilter === "property"}
          onSelect={() => setSearchTypeFilter("property")}
        >
          <Building className="h-4 w-4" />
          <span>Fastigheter</span>
        </FilterChip>
        <FilterChip
          selected={searchTypeFilter === "building"}
          onSelect={() => setSearchTypeFilter("building")}
        >
          <Building className="h-4 w-4" />
          <span>Byggnader</span>
        </FilterChip>
        <FilterChip
          selected={searchTypeFilter === "apartment"}
          onSelect={() => setSearchTypeFilter("apartment")}
        >
          <Home className="h-4 w-4" />
          <span>Lägenheter</span>
        </FilterChip>
      </div>
    </div>
  );
};
