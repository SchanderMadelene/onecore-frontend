
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { ResidenceContent } from "@/components/residence/ResidenceContent";
import { LoadingState } from "@/components/residence/LoadingState";
import { ErrorState } from "@/components/residence/ErrorState";
import { useResidenceData } from "@/hooks/useResidenceData";

export const ResidencePage = () => {
  const { city, district, property, id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { residenceData, roomsData, isLoading, error } = useResidenceData(id);

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
