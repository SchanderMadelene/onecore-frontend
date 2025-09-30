
import { useState, useMemo } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, X } from "lucide-react";
import { PropertySearch } from "@/components/properties/PropertySearch";
import { PropertyTypeFilters } from "@/components/properties/PropertyTypeFilters";
import { PropertySelectionFilters } from "@/components/properties/PropertySelectionFilters";
import { ApartmentSelectionFilters } from "@/components/properties/ApartmentSelectionFilters";
import { PropertyFilteredResults } from "@/components/properties/PropertyFilteredResults";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { PropertiesHeader } from "./components/PropertiesHeader";

const AllPropertiesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const {
    searchQuery,
    setSearchQuery,
    districtFilter,
    setDistrictFilter,
    areaFilter,
    setAreaFilter,
    designationFilter,
    setDesignationFilter,
    propertyManagerFilter,
    setPropertyManagerFilter,
    marketAreaFilter,
    setMarketAreaFilter,
    propertyNumberFilter,
    setPropertyNumberFilter,
    searchTypeFilter,
    setSearchTypeFilter,
    sizeFilter,
    setSizeFilter,
    rentFilter,
    setRentFilter,
    hasContractFilter,
    setHasContractFilter,
    contractStatusFilter,
    setContractStatusFilter,
    filteredProperties,
    filteredSearchResults,
    allDistricts,
    allAreas,
    allDesignations,
    allPropertyManagers,
    allMarketAreas,
    allPropertyNumbers,
    showSearchResults,
    isFiltering
  } = usePropertyFilters();

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchTypeFilter === "apartment") {
      if (sizeFilter.min !== "" || sizeFilter.max !== "") count++;
      if (rentFilter.min !== "" || rentFilter.max !== "") count++;
      if (hasContractFilter !== "all") count++;
      if (contractStatusFilter !== "all") count++;
    } else {
      if (designationFilter !== "all") count++;
      if (propertyManagerFilter !== "all") count++;
      if (marketAreaFilter !== "all") count++;
      if (propertyNumberFilter !== "all") count++;
      if (districtFilter !== "all") count++;
      if (areaFilter !== "all") count++;
    }
    return count;
  }, [searchTypeFilter, designationFilter, propertyManagerFilter, marketAreaFilter, propertyNumberFilter, districtFilter, areaFilter, sizeFilter, rentFilter, hasContractFilter, contractStatusFilter]);

  // Clear all filters
  const clearAllFilters = () => {
    if (searchTypeFilter === "apartment") {
      setSizeFilter({ min: "", max: "" });
      setRentFilter({ min: "", max: "" });
      setHasContractFilter("all");
      setContractStatusFilter("all");
    } else {
      setDesignationFilter("all");
      setPropertyManagerFilter("all");
      setMarketAreaFilter("all");
      setPropertyNumberFilter("all");
      setDistrictFilter("all");
      setAreaFilter("all");
    }
  };

  // Build filter chips
  const filterChips = useMemo(() => {
    const chips = [];
    
    if (searchTypeFilter === "apartment") {
      if (sizeFilter.min !== "" || sizeFilter.max !== "") {
        chips.push({
          label: "Yta",
          value: `${sizeFilter.min || "0"}-${sizeFilter.max || "∞"} m²`,
          onRemove: () => setSizeFilter({ min: "", max: "" })
        });
      }
      if (rentFilter.min !== "" || rentFilter.max !== "") {
        chips.push({
          label: "Hyra",
          value: `${rentFilter.min || "0"}-${rentFilter.max || "∞"} kr`,
          onRemove: () => setRentFilter({ min: "", max: "" })
        });
      }
      if (hasContractFilter !== "all") {
        chips.push({
          label: "Befintligt kontrakt",
          value: hasContractFilter === "yes" ? "Ja" : "Nej",
          onRemove: () => setHasContractFilter("all")
        });
      }
      if (contractStatusFilter !== "all") {
        const statusLabels: Record<string, string> = {
          active: "Aktivt",
          expiring: "Utgående",
          expired: "Utgånget",
          vacant: "Vakant"
        };
        chips.push({
          label: "Status kontrakt",
          value: statusLabels[contractStatusFilter] || contractStatusFilter,
          onRemove: () => setContractStatusFilter("all")
        });
      }
    } else {
      if (designationFilter !== "all") {
        chips.push({
          label: "Beteckning",
          value: designationFilter,
          onRemove: () => setDesignationFilter("all")
        });
      }
      if (propertyManagerFilter !== "all") {
        chips.push({
          label: "Kvartersvärd",
          value: propertyManagerFilter,
          onRemove: () => setPropertyManagerFilter("all")
        });
      }
      if (marketAreaFilter !== "all") {
        chips.push({
          label: "Marknadsområde",
          value: marketAreaFilter,
          onRemove: () => setMarketAreaFilter("all")
        });
      }
      if (propertyNumberFilter !== "all") {
        chips.push({
          label: "Fastighetsnummer",
          value: propertyNumberFilter,
          onRemove: () => setPropertyNumberFilter("all")
        });
      }
      if (districtFilter !== "all") {
        chips.push({
          label: "Distrikt",
          value: districtFilter,
          onRemove: () => setDistrictFilter("all")
        });
      }
      if (areaFilter !== "all") {
        chips.push({
          label: "Kvartersvärdsområde",
          value: areaFilter,
          onRemove: () => setAreaFilter("all")
        });
      }
    }
    
    return chips;
  }, [searchTypeFilter, designationFilter, propertyManagerFilter, marketAreaFilter, propertyNumberFilter, districtFilter, areaFilter, sizeFilter, rentFilter, hasContractFilter, contractStatusFilter]);
  
  return <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <PropertiesHeader />

        <Card>
          <CardHeader>
            <CardTitle>Sök i fastighetsbasen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-6">
              <PropertyTypeFilters searchTypeFilter={searchTypeFilter} setSearchTypeFilter={setSearchTypeFilter} />
              
              <div className="flex flex-col sm:flex-row gap-4">
                <PropertySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              </div>
              
              <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen} className="border rounded-lg">
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between px-4 py-3 hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Filter</span>
                      {activeFilterCount > 0 && (
                        <Badge variant="secondary" className="h-5 min-w-5 px-1.5">
                          {activeFilterCount}
                        </Badge>
                      )}
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  {activeFilterCount > 0 && (
                    <div className="flex justify-end items-center mb-4 pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-8 px-2 text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Rensa alla
                      </Button>
                    </div>
                  )}
                  
                  {searchTypeFilter === "apartment" ? (
                    <ApartmentSelectionFilters
                      sizeFilter={sizeFilter}
                      setSizeFilter={setSizeFilter}
                      rentFilter={rentFilter}
                      setRentFilter={setRentFilter}
                      hasContractFilter={hasContractFilter}
                      setHasContractFilter={setHasContractFilter}
                      contractStatusFilter={contractStatusFilter}
                      setContractStatusFilter={setContractStatusFilter}
                    />
                  ) : (
                    <PropertySelectionFilters 
                      districtFilter={districtFilter} 
                      setDistrictFilter={setDistrictFilter} 
                      areaFilter={areaFilter} 
                      setAreaFilter={setAreaFilter} 
                      designationFilter={designationFilter}
                      setDesignationFilter={setDesignationFilter}
                      propertyManagerFilter={propertyManagerFilter}
                      setPropertyManagerFilter={setPropertyManagerFilter}
                      marketAreaFilter={marketAreaFilter}
                      setMarketAreaFilter={setMarketAreaFilter}
                      propertyNumberFilter={propertyNumberFilter}
                      setPropertyNumberFilter={setPropertyNumberFilter}
                      allDistricts={allDistricts} 
                      allAreas={allAreas} 
                      allDesignations={allDesignations}
                      allPropertyManagers={allPropertyManagers}
                      allMarketAreas={allMarketAreas}
                      allPropertyNumbers={allPropertyNumbers}
                    />
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>

            <PropertyFilteredResults 
              showSearchResults={showSearchResults} 
              filteredSearchResults={filteredSearchResults} 
              filteredProperties={filteredProperties || []} 
              searchTypeFilter={searchTypeFilter}
              activeFilterCount={activeFilterCount}
              isFiltering={isFiltering}
              filterChips={filterChips}
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>;
};

export default AllPropertiesPage;
