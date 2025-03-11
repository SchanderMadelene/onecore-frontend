
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

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      {isLoading && <LoadingState />}
      
      {error && (
        <ErrorState message={error.message} />
      )}
      
      {!isLoading && !error && residenceData && roomsData && (
        <ResidenceContent 
          residenceData={residenceData}
          roomsData={roomsData}
          property={property}
          district={district}
        />
      )}
    </PageLayout>
  );
};

export default ResidencePage;
