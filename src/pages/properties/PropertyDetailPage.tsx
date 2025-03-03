
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Building as BuildingIcon, Home, MapPin, Map } from "lucide-react";
import type { PropertyDetail } from "@/types/api";

// Uppdaterad mockdata för property details - lägger till propertyMap
const mockPropertyDetails: Record<string, PropertyDetail> = {
  "odenplan-5": {
    id: "1",
    propertyObjectId: "P1",
    code: "FAST-001",
    designation: "Odenplan 5",
    municipality: "Stockholm",
    parish: "Matteus",
    purpose: "Bostäder",
    buildingType: "Flerfamiljshus",
    propertyNumber: "12345-678",
    direction: "Nordväst",
    propertyMap: {
      image: "/placeholder.svg",
      buildings: [
        { id: "b1", name: "Huvudbyggnad A", x: 100, y: 120, width: 180, height: 80 },
        { id: "b2", name: "Gårdshus B", x: 150, y: 250, width: 100, height: 60 }
      ]
    },
    buildings: [
      {
        id: "b1",
        name: "Huvudbyggnad A",
        type: "Bostadshus",
        constructionYear: 1962,
        area: 2450,
        floors: 6,
        units: 24
      },
      {
        id: "b2",
        name: "Gårdshus B",
        type: "Bostadshus",
        constructionYear: 1965,
        area: 1200,
        floors: 3,
        units: 12
      }
    ]
  },
  "sveavagen-10": {
    id: "2",
    propertyObjectId: "P2",
    code: "FAST-002",
    designation: "Sveavägen 10",
    municipality: "Stockholm",
    parish: "S:t Johannes",
    purpose: "Kontor och bostäder",
    buildingType: "Kontorskomplex",
    propertyNumber: "56789-012",
    direction: "Sydost",
    propertyMap: {
      image: "/placeholder.svg",
      buildings: [
        { id: "b3", name: "Kontorsbyggnad", x: 80, y: 100, width: 200, height: 100 },
        { id: "b4", name: "Bostadsdel", x: 120, y: 240, width: 120, height: 80 }
      ]
    },
    buildings: [
      {
        id: "b3",
        name: "Kontorsbyggnad",
        type: "Kontor",
        constructionYear: 1978,
        area: 4200,
        floors: 8,
        units: 36
      },
      {
        id: "b4",
        name: "Bostadsdel",
        type: "Bostadshus",
        constructionYear: 1980,
        area: 1800,
        floors: 6,
        units: 18
      }
    ]
  },
  "gotgatan-15": {
    id: "3",
    propertyObjectId: "P3",
    code: "FAST-003",
    designation: "Götgatan 15",
    municipality: "Stockholm",
    parish: "Maria Magdalena",
    purpose: "Bostäder och handel",
    buildingType: "Flerfamiljshus",
    propertyNumber: "34567-890",
    direction: "Sydväst",
    propertyMap: {
      image: "/placeholder.svg",
      buildings: [
        { id: "b5", name: "Bostadshus", x: 90, y: 80, width: 180, height: 90 },
        { id: "b6", name: "Butiksbyggnad", x: 130, y: 200, width: 100, height: 50 }
      ]
    },
    buildings: [
      {
        id: "b5",
        name: "Bostadshus",
        type: "Bostadshus",
        constructionYear: 1925,
        area: 2800,
        floors: 5,
        units: 30
      },
      {
        id: "b6",
        name: "Butiksbyggnad",
        type: "Butik",
        constructionYear: 1926,
        area: 450,
        floors: 1,
        units: 4
      }
    ]
  }
};

// Ny komponent för fastighetsritningen
const PropertyMap = ({ propertyMap, buildings }) => {
  return (
    <div className="relative w-full h-[400px] border border-border rounded-md overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gray-100 p-4">
        {/* Bakgrundsbild för fastighetens tomt */}
        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
          <Map className="h-32 w-32 text-gray-400" />
        </div>
        
        {/* Rita ut byggnaderna */}
        {propertyMap.buildings.map((building) => {
          // Hitta byggnadsinformation för tooltip
          const buildingInfo = buildings.find(b => b.id === building.id);
          
          return (
            <div 
              key={building.id}
              className="absolute bg-primary/80 backdrop-blur-sm border border-primary text-white p-2 rounded text-xs font-medium cursor-help"
              style={{
                top: `${building.y}px`,
                left: `${building.x}px`,
                width: `${building.width}px`,
                height: `${building.height}px`,
              }}
              title={buildingInfo ? `${buildingInfo.name} (${buildingInfo.type}, ${buildingInfo.area} m²)` : building.name}
            >
              {building.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PropertyDetailPage = () => {
  const { property } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: propertyDetail, isLoading } = useQuery({
    queryKey: ['property', property],
    queryFn: () => {
      // Simulera API-anrop med en fördröjning
      return new Promise<PropertyDetail>((resolve) => {
        setTimeout(() => {
          if (property && mockPropertyDetails[property]) {
            resolve(mockPropertyDetails[property]);
          } else {
            throw new Error('Fastighet hittades inte');
          }
        }, 500);
      });
    }
  });

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
              <Card>
                <CardHeader>
                  <CardTitle>Fastighetsinformation</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Fastighetsbeteckning</p>
                      <p className="font-medium">{propertyDetail.designation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fastighetsnummer</p>
                      <p className="font-medium">{propertyDetail.propertyNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Kod</p>
                      <p className="font-medium">{propertyDetail.code}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Kommun</p>
                      <p className="font-medium">{propertyDetail.municipality}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Församling</p>
                      <p className="font-medium">{propertyDetail.parish}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Användning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Användningsområde</p>
                      <p className="font-medium">{propertyDetail.purpose || 'Ej angivet'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Byggnadstyp</p>
                      <p className="font-medium">{propertyDetail.buildingType || 'Ej angivet'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="buildings" className="space-y-6 pt-6">
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {propertyDetail.buildings.map((building) => (
                  <Card key={building.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{building.name}</CardTitle>
                        {building.type === "Bostadshus" ? (
                          <Home className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <BuildingIcon className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{building.type}</p>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Byggår</p>
                          <p className="font-medium">{building.constructionYear}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Yta</p>
                          <p className="font-medium">{building.area} m²</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Våningar</p>
                          <p className="font-medium">{building.floors}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Lägenheter/lokaler</p>
                          <p className="font-medium">{building.units}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="map" className="space-y-6 pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fastighetsritning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ritningen visar fastighetens byggnader och placering. Hovra över byggnaderna för detaljer.
                  </p>
                  
                  {propertyDetail.propertyMap && (
                    <PropertyMap 
                      propertyMap={propertyDetail.propertyMap} 
                      buildings={propertyDetail.buildings} 
                    />
                  )}
                </CardContent>
              </Card>
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
