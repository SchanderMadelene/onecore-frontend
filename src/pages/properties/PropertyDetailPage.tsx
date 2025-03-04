
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePropertyDetail } from "@/hooks/usePropertyDetail";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, MapPin, Key, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import from new global components location
import { 
  PropertyBasicInfo, 
  PropertyBuildingsList, 
  PropertyMapView 
} from "@/components/properties";

const PropertyDetailPage = () => {
  const { city, district, property } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();
  
  // Skapa korrekt propertyId format för att matcha nyckeln i mockData
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

  if (isLoading) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-secondary rounded w-64"></div>
          <div className="h-4 bg-secondary rounded w-32"></div>
          <div className="h-[200px] bg-secondary rounded"></div>
        </div>
      </PageLayout>
    );
  }

  if (error || !propertyDetail) {
    return (
      <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">Fastigheten kunde inte hittas</h2>
          <p className="text-muted-foreground">Kontrollera adressen och försök igen</p>
          <p className="text-sm text-muted-foreground mt-2">Sökte efter: {propertyKey}</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{propertyDetail.designation}</h1>
          <p className="text-muted-foreground">
            {propertyDetail.address || propertyDetail.designation}, {propertyDetail.municipality}
          </p>
        </div>

        <Tabs defaultValue="info" className="space-y-6">
          <TabsList>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>Information</span>
            </TabsTrigger>
            <TabsTrigger value="buildings" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>Byggnader</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Karta</span>
            </TabsTrigger>
            <TabsTrigger value="apartments" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span>Lägenheter</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Säkerhet</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <PropertyBasicInfo property={propertyDetail} />
          </TabsContent>

          <TabsContent value="buildings">
            <PropertyBuildingsList buildings={propertyDetail.buildings} />
          </TabsContent>

          <TabsContent value="map">
            {propertyDetail.propertyMap && (
              <PropertyMapView propertyDetail={propertyDetail} />
            )}
            {!propertyDetail.propertyMap && (
              <div className="border rounded-lg p-6 text-center">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Karta saknas</h3>
                <p className="text-muted-foreground">
                  Fastighetskarta finns inte tillgänglig för denna fastighet.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="apartments">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {propertyDetail.buildings.flatMap(building => 
                (building.apartments || []).map(apartment => (
                  <div key={apartment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold">{apartment.code}</h3>
                    <p className="text-sm text-muted-foreground">{building.name}</p>
                    <div className="mt-2 text-sm">
                      <div className="flex justify-between">
                        <span>Area:</span>
                        <span>{apartment.area} m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rum:</span>
                        <span>{apartment.rooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span>{apartment.status}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              {propertyDetail.buildings.every(b => !b.apartments || b.apartments.length === 0) && (
                <div className="col-span-3 border rounded-lg p-6 text-center">
                  <Key className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">Inga lägenheter</h3>
                  <p className="text-muted-foreground">
                    Det finns inga lägenheter registrerade för denna fastighet.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="border rounded-lg p-6 text-center">
              <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Säkerhetsinformation</h3>
              <p className="text-muted-foreground">
                Information om fastighetens säkerhet är inte tillgänglig.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default PropertyDetailPage;
