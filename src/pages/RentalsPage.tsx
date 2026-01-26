
import { PageLayout } from "@/layout/PageLayout";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Home, Archive, Key } from "lucide-react";
import { ParkingSpacesTable } from "@/components/rentals/ParkingSpacesTable";
import { HousingSpacesTable } from "@/components/rentals/HousingSpacesTable";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { RentalsHeader } from "@/features/rentals";

const RentalsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { features } = useFeatureToggles();

  // Bestäm vilken flik som ska vara default baserat på vilka som är aktiverade
  const getDefaultTab = () => {
    if (features.showRentalsHousing) return "bostad";
    if (features.showRentalsParking) return "bilplats";
    if (features.showRentalsStorage) return "forrad";
    return "bostad"; // fallback
  };

  const currentTab = searchParams.get("tab") || getDefaultTab();

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <RentalsHeader />
        
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            {features.showRentalsHousing && (
              <TabsTrigger value="bostad" className="flex items-center gap-2">
                <Home size={18} />
                <span>Bostad</span>
              </TabsTrigger>
            )}
            {features.showRentalsParking && (
              <TabsTrigger value="bilplats" className="flex items-center gap-2">
                <Car size={18} />
                <span>Bilplats</span>
              </TabsTrigger>
            )}
            {features.showRentalsStorage && (
              <TabsTrigger value="forrad" className="flex items-center gap-2">
                <Archive size={18} />
                <span>Förråd</span>
              </TabsTrigger>
            )}
          </TabsList>
          
          {features.showRentalsHousing && (
            <TabsContent value="bostad">
              <HousingSpacesTable />
            </TabsContent>
          )}
          
          {features.showRentalsParking && (
            <TabsContent value="bilplats">
              <ParkingSpacesTable />
            </TabsContent>
          )}
          
          {features.showRentalsStorage && (
            <TabsContent value="forrad">
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
            </TabsContent>
          )}

          {/* Visa meddelande om inga sektioner är aktiverade */}
          {!features.showRentalsHousing && !features.showRentalsParking && !features.showRentalsStorage && (
            <div className="flex items-center justify-center h-[400px] text-muted-foreground border rounded-md">
              <div className="text-center">
                <Key className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                <p>Inga uthyrningssektioner är aktiverade</p>
                <p className="text-sm mt-2">Aktivera bostad, bilplats eller förråd i inställningarna</p>
              </div>
            </div>
          )}
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default RentalsPage;
