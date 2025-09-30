
import { SearchResultsTable } from "./SearchResultsTable";
import { PropertiesTable } from "./PropertiesTable";
import { Property } from "@/types/api";
import { SearchResult } from "@/data/search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { X, Building } from "lucide-react";

interface FilterChip {
  label: string;
  value: string;
  onRemove: () => void;
}

interface PropertyFilteredResultsProps {
  showSearchResults: boolean;
  filteredSearchResults: SearchResult[];
  filteredProperties: Property[];
  searchTypeFilter: "property" | "building" | "apartment" | "maintenance" | "buildingpart";
  activeFilterCount?: number;
  isFiltering?: boolean;
  filterChips?: FilterChip[];
}

export const PropertyFilteredResults = ({
  showSearchResults,
  filteredSearchResults,
  filteredProperties,
  searchTypeFilter,
  activeFilterCount = 0,
  isFiltering = false,
  filterChips = []
}: PropertyFilteredResultsProps) => {
  // Always show search results for building and apartment types
  const shouldShowSearchResults = showSearchResults;
  
  const contentType = 
    searchTypeFilter === "property" ? "Fastigheter" : 
    searchTypeFilter === "building" ? "Byggnader" : 
    searchTypeFilter === "apartment" ? "Lägenheter" :
    searchTypeFilter === "maintenance" ? "Underhållsenheter" :
    "Byggnadsdelar/komponenter";

  // Show loading state
  if (isFiltering) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const hasResults = shouldShowSearchResults 
    ? filteredSearchResults.length > 0 
    : (filteredProperties?.length || 0) > 0;

  return (
    <>
      {/* Filter Chips */}
      {filterChips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filterChips.map((chip, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="px-3 py-1 text-sm flex items-center gap-2"
            >
              <span>{chip.label}: {chip.value}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={chip.onRemove}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {!hasResults ? (
        <EmptyState
          icon={Building}
          title="Inga resultat hittades"
          description={
            activeFilterCount > 0
              ? "Försök att justera dina filter för att hitta vad du söker."
              : "Det finns inga fastigheter att visa."
          }
        />
      ) : shouldShowSearchResults ? (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{contentType}</h2>
            <p className="text-sm text-muted-foreground">
              Visar {filteredSearchResults.length} resultat
              {activeFilterCount > 0 && (
                <span className="ml-1">
                  med {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filter'}
                </span>
              )}
            </p>
          </div>
          <SearchResultsTable results={filteredSearchResults} />
        </>
      ) : (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Fastigheter</h2>
            <p className="text-sm text-muted-foreground">
              Visar {filteredProperties?.length || 0} fastigheter
              {activeFilterCount > 0 && (
                <span className="ml-1">
                  med {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filter'}
                </span>
              )}
            </p>
          </div>
          <PropertiesTable properties={filteredProperties || []} />
        </>
      )}
    </>
  );
};
