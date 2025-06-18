
import { PageLayout } from "@/components/layout/PageLayout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Home, Archive } from "lucide-react";
import { ParkingSpacesTable } from "@/components/rentals/ParkingSpacesTable";
import { HousingSpacesTable } from "@/components/rentals/HousingSpacesTable";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";

const RentalsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { features } = useFeatureToggles();

  // Get available tabs based on feature toggles
  const availableTabs = [];
  if (features.showRentalHousing) availableTabs.push("bostad");
  if (features.showRentalParking) availableTabs.push("bilplats");
  if (features.showRentalStorage) availableTabs.push("forrad");

  // Set default tab to the first available tab
  const defaultTab = availableTabs[0] || "bostad";

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-6">Uthyrning</h1>
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger 
              value="bostad" 
              className="flex items-center gap-2"
              disabled={!features.showRentalHousing}
            >
              <Home size={18} />
              <span>Bostad</span>
            </TabsTrigger>
            <TabsTrigger 
              value="bilplats" 
              className="flex items-center gap-2"
              disabled={!features.showRentalParking}
            >
              <Car size={18} />
              <span>Bilplats</span>
            </TabsTrigger>
            <TabsTrigger 
              value="forrad" 
              className="flex items-center gap-2"
              disabled={!features.showRentalStorage}
            >
              <Archive size={18} />
              <span>Förråd</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bostad">
            {features.showRentalHousing ? (
              <HousingSpacesTable />
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    För att se bostadsuthyrning, aktivera funktionen i inställningarna.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="bilplats">
            {features.showRentalParking ? (
              <ParkingSpacesTable />
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    För att se bilplatsuthyrning, aktivera funktionen i inställningarna.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="forrad">
            {features.showRentalStorage ? (
              <Card>
                <CardHeader>
                  <CardTitle>Förrådsuthyrning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Översikt av förrådsuthyrningar och lediga förråd.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2">Aktiva förrådskontrakt</h3>
                      <div className="text-2xl font-bold">89</div>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2">Lediga förråd</h3>
                      <div className="text-2xl font-bold">15</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">
                    För att se förrådsuthyrning, aktivera funktionen i inställningarna.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default RentalsPage;
