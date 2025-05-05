
import { SearchResultsTable } from "./SearchResultsTable";
import { PropertiesTable } from "./PropertiesTable";
import { Property } from "@/types/api";
import { SearchResult } from "@/data/search";

interface PropertyFilteredResultsProps {
  showSearchResults: boolean;
  filteredSearchResults: SearchResult[];
  filteredProperties: Property[];
  searchTypeFilter: "all" | "property" | "building" | "apartment";
}

export const PropertyFilteredResults = ({
  showSearchResults,
  filteredSearchResults,
  filteredProperties,
  searchTypeFilter
}: PropertyFilteredResultsProps) => {
  return (
    <>
      {showSearchResults ? (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              {searchTypeFilter === "all" ? "Sökresultat" : 
               searchTypeFilter === "property" ? "Fastigheter" : 
               searchTypeFilter === "building" ? "Byggnader" : 
               "Lägenheter"}
            </h2>
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
