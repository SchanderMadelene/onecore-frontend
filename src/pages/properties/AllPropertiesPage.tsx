
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { PropertySearch } from "@/components/properties/PropertySearch";
import { PropertyTypeFilters } from "@/components/properties/PropertyTypeFilters";
import { PropertySelectionFilters } from "@/components/properties/PropertySelectionFilters";
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
    filteredProperties,
    filteredSearchResults,
    allDistricts,
    allAreas,
    allDesignations,
    allPropertyManagers,
    allMarketAreas,
    allPropertyNumbers,
    showSearchResults
  } = usePropertyFilters();
  
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
              
              <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                  >
                    <span>Filter</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
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
                </CollapsibleContent>
              </Collapsible>
            </div>

            <PropertyFilteredResults 
              showSearchResults={showSearchResults} 
              filteredSearchResults={filteredSearchResults} 
              filteredProperties={filteredProperties || []} 
              searchTypeFilter={searchTypeFilter} 
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>;
};

export default AllPropertiesPage;
