
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { useBuildingDetail } from "@/hooks/useBuildingDetail";
import { usePropertyFromBuilding } from "@/hooks/usePropertyFromBuilding";
import { useToast } from "@/hooks/use-toast";
import { BuildingHeader } from "@/components/buildings/BuildingHeader";
import { BuildingInfo } from "@/components/buildings/BuildingInfo";
import { BuildingEntrances } from "@/components/buildings/BuildingEntrances";

const BuildingDetailPage = () => {
  const { city, district, property, building } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();
  
  // Create proper propertyKey format to match key in mockData
  const propertyKey = city && district && property 
    ? `${city}/${district}/${property}`
    : undefined;
  
  // Fetch building data
  const { data: buildingDetail, isLoading: isBuildingLoading, error: buildingError } = useBuildingDetail(propertyKey, building);
  
  // Fetch parent property data
  const { data: propertyDetail } = usePropertyFromBuilding(propertyKey);

  // Base path for apartment links
  const basePath = `/properties/${city}/${district}/${property}/${building}`;

  useEffect(() => {
    if (buildingError) {
      console.error("Error loading building:", buildingError);
      toast({
        title: "Fel vid laddning",
        description: "Kunde inte ladda byggnadsdata. Kontrollera URL:en.",
        variant: "destructive"
      });
    }
  }, [buildingError, toast]);

  const renderContent = () => {
    if (isBuildingLoading) {
      return (
        <div className="animate-pulse space-y-6 py-4">
          <div className="h-8 bg-secondary rounded w-64"></div>
          <div className="h-4 bg-secondary rounded w-32 mt-2"></div>
          <div className="h-[200px] bg-secondary rounded mt-6"></div>
        </div>
      );
    }

    if (buildingError || !buildingDetail) {
      return (
        <div className="text-center py-10 space-y-4">
          <h2 className="text-2xl font-bold">Byggnaden kunde inte hittas</h2>
          <p className="text-muted-foreground">Kontrollera adressen och försök igen</p>
          <p className="text-sm text-muted-foreground mt-2">Sökte efter: {building} i {propertyKey}</p>
        </div>
      );
    }

    return (
      <div className="py-4 space-y-8">
        <BuildingHeader building={buildingDetail} propertyName={propertyDetail?.designation} />
        <BuildingInfo building={buildingDetail} />
        <BuildingEntrances building={buildingDetail} basePath={basePath} />
      </div>
    );
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      {renderContent()}
    </PageLayout>
  );
};

export default BuildingDetailPage;
