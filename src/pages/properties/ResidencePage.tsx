
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PageLayout } from "@/layout/PageLayout";
import { ResidenceContent } from "@/components/residence/ResidenceContent";
import { LoadingState } from "@/components/residence/LoadingState";
import { ErrorState } from "@/components/residence/ErrorState";
import { useResidenceData } from "@/hooks/useResidenceData";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBuildingDetail } from "@/hooks/useBuildingDetail";
import { usePropertyFromBuilding } from "@/hooks/usePropertyFromBuilding";

export const ResidencePage = () => {
  const { property, building, id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Let the PageLayout handle sidebar state based on route
  useEffect(() => {
    // Default behavior is in PageLayout, which will auto-collapse on detail pages
  }, [isMobile]);
  
  // If we're on a building page without an apartment ID, use the building param as the ID
  const residenceId = id || building;
  
  const { residenceData, roomsData, isLoading, error } = useResidenceData(residenceId);
  
  // Fetch building and property data for additional info
  const { data: buildingDetail } = useBuildingDetail(property, building);
  const { data: propertyDetail } = usePropertyFromBuilding(property);

  useEffect(() => {
    console.log("Current route params:", { property, building, id });
    console.log("Using residence ID:", residenceId);
  }, [property, building, id, residenceId]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="py-4">
          <LoadingState />
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="py-4">
          <ErrorState message={error.message} />
        </div>
      );
    }
    
    if (residenceData && roomsData) {
      return (
        <div className="py-4 space-y-6">
          <ResidenceContent 
            residenceData={residenceData}
            roomsData={roomsData}
            property={property}
            district={undefined}
            buildingDetail={buildingDetail}
            propertyDetail={propertyDetail}
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      {renderContent()}
    </PageLayout>
  );
};

export default ResidencePage;
