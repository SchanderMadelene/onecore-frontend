
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";
import { usePropertyDetail } from "./hooks/usePropertyDetail";
import PropertyBasicInfo from "./components/PropertyBasicInfo";
import PropertyBuildingsList from "./components/PropertyBuildingsList";
import PropertyMapView from "./components/PropertyMapView";

const PropertyDetailPage = () => {
  const { property } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: propertyDetail, isLoading } = usePropertyDetail(property);

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
              <TabsTrigger value="map">Ritning</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic-info" className="space-y-6 pt-6">
              <PropertyBasicInfo propertyDetail={propertyDetail} />
            </TabsContent>
            
            <TabsContent value="buildings" className="space-y-6 pt-6">
              <PropertyBuildingsList buildings={propertyDetail.buildings} />
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
