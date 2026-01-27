import { Building, Home, Wrench, Component } from "lucide-react";
import { FilterChip } from "@/components/ui/filter-chip";

type SearchTypeFilter = "property" | "building" | "apartment" | "maintenance" | "buildingpart";

interface PropertyTypeFiltersProps {
  searchTypeFilter: SearchTypeFilter;
  setSearchTypeFilter: (value: SearchTypeFilter) => void;
}

export const PropertyTypeFilters = ({
  searchTypeFilter,
  setSearchTypeFilter,
}: PropertyTypeFiltersProps) => {
  return (
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
      <FilterChip
        selected={searchTypeFilter === "maintenance"}
        onSelect={() => setSearchTypeFilter("maintenance")}
      >
        <Wrench className="h-4 w-4" />
        <span>Underhållsenheter</span>
      </FilterChip>
      <FilterChip
        selected={searchTypeFilter === "buildingpart"}
        onSelect={() => setSearchTypeFilter("buildingpart")}
      >
        <Component className="h-4 w-4" />
        <span>Byggnadsdelar/komponenter</span>
      </FilterChip>
    </div>
  );
};
