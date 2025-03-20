
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePropertyDetail } from "@/hooks/usePropertyDetail";
import { PageLayout } from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { PropertyDetailTabs } from "@/components/properties/PropertyDetailTabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, MapPin } from "lucide-react";

const PropertyDetailPage = () => {
  const { city, district, property } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Let the PageLayout handle sidebar state based on route
  useEffect(() => {
    // Default sidebar state is handled in PageLayout based on route
  }, [isMobile]);
  
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
        <div>
          <h1 className="text-3xl font-bold mb-2">{propertyDetail.designation}</h1>
          <p className="text-muted-foreground mb-6">
            {propertyDetail.address || propertyDetail.designation}, {propertyDetail.municipality}
          </p>
          
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <CardTitle>Grundläggande information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Fastighetsbeteckning</p>
                    <p className="font-medium">{propertyDetail.designation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kommun</p>
                    <p className="font-medium">{propertyDetail.municipality}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Adress</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{propertyDetail.address || "-"}</p>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Fastighetsstatus</p>
                    <p className="font-medium">
                      {propertyDetail.status === "active" ? "Aktiv" : "Inaktiv"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Antal byggnader</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{propertyDetail.buildings.length}</p>
                      <Building className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Byggnadsår</p>
                    <p className="font-medium">{propertyDetail.constructionYear || "-"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
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
