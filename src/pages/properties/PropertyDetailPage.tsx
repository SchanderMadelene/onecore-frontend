
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePropertyDetail } from "@/hooks/usePropertyDetail";
import { PageLayout } from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { PropertyHeader } from "@/components/properties/PropertyHeader";
import { PropertyDetailTabs } from "@/components/properties/PropertyDetailTabs";

const PropertyDetailPage = () => {
  const { city, district, property } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();
  
  // Create proper propertyId format to match key in mockData
  const propertyKey = city && district && property 
    ? `${city}/${district}/${property}`
    : undefined;
  
  const { data: propertyDetail, isLoading, error } = usePropertyDetail(propertyKey);

  useEffect(() => {
    if (error) {
      console.error("Error loading property:", error);
      toast({
        title: "Fel vid laddning",
        description: "Kunde inte ladda fastighetsdata. Kontrollera URL:en.",
        variant: "destructive"
      });
    }
  }, [error, toast]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-secondary rounded w-64"></div>
          <div className="h-4 bg-secondary rounded w-32"></div>
          <div className="h-[200px] bg-secondary rounded"></div>
        </div>
      );
    }

    if (error || !propertyDetail) {
      return (
        <div className="text-center py-10 space-y-4">
          <h2 className="text-2xl font-bold mb-2">Fastigheten kunde inte hittas</h2>
          <p className="text-muted-foreground">Kontrollera adressen och försök igen</p>
          <p className="text-sm text-muted-foreground mt-2">Sökte efter: {propertyKey}</p>
        </div>
      );
    }

    return (
      <>
        <PropertyHeader propertyDetail={propertyDetail} />
        <PropertyDetailTabs propertyDetail={propertyDetail} />
      </>
    );
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        {renderContent()}
      </div>
    </PageLayout>
  );
};

export default PropertyDetailPage;
