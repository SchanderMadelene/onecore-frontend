
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
  // Filtrera sökresultaten baserat på typ
  const typeFilteredResults = filteredSearchResults.filter(result => 
    searchTypeFilter === "all" || result.type === searchTypeFilter
  );
  
  // Bestäm om innehållet ska visa sökresultat baserat på vald filtertyp
  const shouldShowSearchResults = 
    showSearchResults || 
    searchTypeFilter === "building" || 
    searchTypeFilter === "apartment";

  return (
    <>
      {shouldShowSearchResults ? (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              {searchTypeFilter === "all" ? "Sökresultat" : 
               searchTypeFilter === "property" ? "Fastigheter" : 
               searchTypeFilter === "building" ? "Byggnader" : 
               "Lägenheter"}
            </h2>
            <p className="text-sm text-muted-foreground">
              Visar {typeFilteredResults.length} resultat
            </p>
          </div>
          <SearchResultsTable results={typeFilteredResults} />
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
