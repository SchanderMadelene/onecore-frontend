
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Home } from "lucide-react";
import { usePropertyDetail } from "./hooks/usePropertyDetail";
import PropertyBasicInfo from "./components/PropertyBasicInfo";
import PropertyBuildingsList from "./components/PropertyBuildingsList";
import PropertyMapView from "./components/PropertyMapView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PropertyDetailPage = () => {
  const { city, district, property } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: propertyDetail, isLoading } = usePropertyDetail(property);

  // Mock data for apartments in this property
  const mockApartments = [
    { id: "lgh-301", code: "LGH-301", name: "3 rum och kök", status: "Uthyrd" },
    { id: "lgh-302", code: "LGH-302", name: "2 rum och kök", status: "Ledig" }
  ];

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <p>Laddar fastighetsdata...</p>
        </div>
      ) : propertyDetail ? (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{propertyDetail.designation}</h1>
            <p className="text-muted-foreground flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {propertyDetail.municipality}
            </p>
          </div>

          <Tabs defaultValue="basic-info">
            <TabsList>
              <TabsTrigger value="basic-info">Grunddata</TabsTrigger>
              <TabsTrigger value="buildings">Byggnader</TabsTrigger>
              <TabsTrigger value="apartments">Lägenheter</TabsTrigger>
              <TabsTrigger value="map">Ritning</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic-info" className="space-y-6 pt-6">
              <PropertyBasicInfo propertyDetail={propertyDetail} />
            </TabsContent>
            
            <TabsContent value="buildings" className="space-y-6 pt-6">
              <PropertyBuildingsList buildings={propertyDetail.buildings} />
            </TabsContent>
            
            <TabsContent value="apartments" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lägenheter</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {mockApartments.map(apartment => (
                      <Link 
                        key={apartment.id} 
                        to={`/properties/${city}/${district}/${property}/${apartment.id}`}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/10 transition-colors"
                      >
                        <div className="flex items-center">
                          <Home className="mr-3 h-5 w-5 text-accent" />
                          <div>
                            <p className="font-medium">{apartment.code}</p>
                            <p className="text-sm text-muted-foreground">{apartment.name}</p>
                          </div>
                        </div>
                        <span className={`text-sm ${apartment.status === 'Ledig' ? 'text-green-500' : 'text-muted-foreground'}`}>
                          {apartment.status}
                        </span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="map" className="space-y-6 pt-6">
              <PropertyMapView propertyDetail={propertyDetail} />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40">
          <h2 className="text-xl font-semibold mb-2">Fastighet hittades inte</h2>
          <p className="text-muted-foreground">Den begärda fastigheten existerar inte.</p>
        </div>
      )}
    </PageLayout>
  );
};

export default PropertyDetailPage;
