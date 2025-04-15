import { PageLayout } from "@/components/layout/PageLayout";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Home, Archive } from "lucide-react";
import { ParkingSpacesTable } from "@/components/rentals/ParkingSpacesTable";

const RentalsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-6">Uthyrning</h1>
        
        <Tabs defaultValue="bilplats" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="bostad" className="flex items-center gap-2">
              <Home size={18} />
              <span>Bostad</span>
            </TabsTrigger>
            <TabsTrigger value="bilplats" className="flex items-center gap-2">
              <Car size={18} />
              <span>Bilplats</span>
            </TabsTrigger>
            <TabsTrigger value="forrad" className="flex items-center gap-2">
              <Archive size={18} />
              <span>Förråd</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bilplats">
            <ParkingSpacesTable />
          </TabsContent>
          
          <TabsContent value="bostad">
            <Card>
              <CardHeader>
                <CardTitle>Bostadsuthyrning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Översikt av bostadsuthyrningar och lediga lägenheter.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Aktiva hyreskontrakt</h3>
                    <div className="text-2xl font-bold">247</div>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="font-medium mb-2">Lediga bostäder</h3>
                    <div className="text-2xl font-bold">12</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
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
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default RentalsPage;
