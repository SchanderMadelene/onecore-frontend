
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertySearch } from "@/components/properties/PropertySearch";
import { PropertyTypeFilters } from "@/components/properties/PropertyTypeFilters";
import { PropertySelectionFilters } from "@/components/properties/PropertySelectionFilters";
import { PropertyFilteredResults } from "@/components/properties/PropertyFilteredResults";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";

const AllPropertiesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    searchQuery,
    setSearchQuery,
    districtFilter,
    setDistrictFilter,
    areaFilter,
    setAreaFilter,
    searchTypeFilter,
    setSearchTypeFilter,
    filteredProperties,
    filteredSearchResults,
    allDistricts,
    allAreas,
    showSearchResults
  } = usePropertyFilters();
  return <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">Fastigheter</h1>
        <p className="text-muted-foreground mb-6">
          Översikt över alla fastigheter i systemet
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Sök i fastighetsträdet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-6">
              <PropertyTypeFilters searchTypeFilter={searchTypeFilter} setSearchTypeFilter={setSearchTypeFilter} />
              
              <div className="flex flex-col sm:flex-row gap-4">
                <PropertySearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              </div>
              
              <div className="flex flex-col gap-4">
                <PropertySelectionFilters districtFilter={districtFilter} setDistrictFilter={setDistrictFilter} areaFilter={areaFilter} setAreaFilter={setAreaFilter} allDistricts={allDistricts} allAreas={allAreas} />
              </div>
            </div>

            <PropertyFilteredResults showSearchResults={showSearchResults} filteredSearchResults={filteredSearchResults} filteredProperties={filteredProperties || []} searchTypeFilter={searchTypeFilter} />
          </CardContent>
        </Card>
      </div>
    </PageLayout>;
};

export default AllPropertiesPage;
