
import { SearchResultsTable } from "./SearchResultsTable";
import { PropertiesTable } from "./PropertiesTable";
import { Property } from "@/types/api";
import { SearchResult } from "@/data/search";

interface PropertyFilteredResultsProps {
  showSearchResults: boolean;
  filteredSearchResults: SearchResult[];
  filteredProperties: Property[];
  searchTypeFilter: "property" | "building" | "apartment" | "maintenance" | "buildingpart";
}

export const PropertyFilteredResults = ({
  showSearchResults,
  filteredSearchResults,
  filteredProperties,
  searchTypeFilter
}: PropertyFilteredResultsProps) => {
  // Always show search results for building and apartment types
  const shouldShowSearchResults = showSearchResults;
  
  const contentType = 
    searchTypeFilter === "property" ? "Fastigheter" : 
    searchTypeFilter === "building" ? "Byggnader" : 
    searchTypeFilter === "apartment" ? "Lägenheter" :
    searchTypeFilter === "maintenance" ? "Underhållsenheter" :
    "Byggnadsdelar/komponenter";

  return (
    <>
      {shouldShowSearchResults ? (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{contentType}</h2>
            <p className="text-sm text-muted-foreground">
              Visar {filteredSearchResults.length} resultat
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
            </p>
          </div>
          <PropertiesTable properties={filteredProperties || []} />
        </>
      )}
    </>
  );
};
