
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePropertyDetail } from "@/hooks/usePropertyDetail";
import { PageLayout } from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { PropertyDetailTabs } from "@/components/properties/PropertyDetailTabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { PropertyHeader } from "@/components/properties/PropertyHeader";
import { PropertyBasicInfo } from "@/components/properties/PropertyBasicInfo";
import { PropertyBreadcrumb } from "@/components/navigation/Breadcrumb";

const PropertyDetailPage = () => {
  const { property } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Let the PageLayout handle sidebar state based on route
  useEffect(() => {
    // Default sidebar state is handled in PageLayout based on route
  }, [isMobile]);
  
  // Use property directly as the key
  const propertyKey = property;
  
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
        <div className="animate-pulse space-y-6 py-4">
          <div className="h-8 bg-secondary rounded w-64"></div>
          <div className="h-4 bg-secondary rounded w-32 mt-2"></div>
          <div className="h-[200px] bg-secondary rounded mt-6"></div>
        </div>
      );
    }

    if (error || !propertyDetail) {
      return (
        <div className="text-center py-10 space-y-4">
          <h2 className="text-2xl font-bold">Fastigheten kunde inte hittas</h2>
          <p className="text-muted-foreground">Kontrollera adressen och försök igen</p>
          <p className="text-sm text-muted-foreground mt-2">Sökte efter: {propertyKey}</p>
        </div>
      );
    }

    return (
      <div className="py-4 space-y-6">
        <PropertyBreadcrumb />
        <PropertyHeader propertyDetail={propertyDetail} />
        
        {/* Grundläggande information always visible above tabs */}
        <PropertyBasicInfo propertyDetail={propertyDetail} showBasicInfoOnly={true} />
        
        {/* Tabs with detailed info only in PropertyInfoTab */}
        <PropertyDetailTabs propertyDetail={propertyDetail} />
      </div>
    );
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      {renderContent()}
    </PageLayout>
  );
};

export default PropertyDetailPage;
