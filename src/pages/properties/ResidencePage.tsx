
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
      return <LoadingState />;
    }
    
    if (error) {
      return <ErrorState message={error.message} />;
    }
    
    if (residenceData && roomsData) {
      return (
        <ResidenceContent 
          residenceData={residenceData}
          roomsData={roomsData}
          property={property}
          district={district}
        />
      );
    }
    
    return null;
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        {renderContent()}
      </div>
    </PageLayout>
  );
};

export default ResidencePage;
