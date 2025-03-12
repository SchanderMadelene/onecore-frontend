
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { ResidenceContent } from "@/components/residence/ResidenceContent";
import { LoadingState } from "@/components/residence/LoadingState";
import { ErrorState } from "@/components/residence/ErrorState";
import { useResidenceData } from "@/hooks/useResidenceData";

export const ResidencePage = () => {
  const { city, district, property, building, id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  // If we're on a building page without an apartment ID, use the building param as the ID
  const residenceId = id || building;
  
  const { residenceData, roomsData, isLoading, error } = useResidenceData(residenceId);

  useEffect(() => {
    console.log("Current route params:", { city, district, property, building, id });
    console.log("Using residence ID:", residenceId);
  }, [city, district, property, building, id, residenceId]);

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
            district={district}
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
