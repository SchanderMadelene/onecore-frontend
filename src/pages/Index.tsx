
import { useState } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { TreeView } from "@/components/TreeView";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Building, Users, Home } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Property, Company } from "@/types/api";

// Mock data
const mockProperties: Property[] = [
  {
    id: "1",
    propertyObjectId: "P1",
    code: "FAST-001",
    designation: "Kontorskomplex City",
    municipality: "Stockholm",
    purpose: "Kontor",
    buildingType: "Kontorsbyggnad"
  },
  {
    id: "2",
    propertyObjectId: "P2",
    code: "FAST-002",
    designation: "Bostadshus Centrum",
    municipality: "Stockholm",
    purpose: "Bostad",
    buildingType: "Flerfamiljshus"
  }
];

const mockCompanies: Company[] = [
  {
    id: "1",
    propertyObjectId: "C1",
    code: "FTG-001",
    name: "Företag AB",
    organizationNumber: "556123-1234"
  },
  {
    id: "2",
    propertyObjectId: "C2",
    code: "FTG-002",
    name: "Fastigheter & Co KB",
    organizationNumber: "556789-0123"
  }
];

// Mock occupancy data
const mockOccupancyData = {
  total: 150,
  occupied: 135,
  available: 15
};

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: properties } = useQuery({
    queryKey: ['properties'],
    queryFn: () => Promise.resolve(mockProperties)
  });

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: () => Promise.resolve(mockCompanies)
  });

  const occupancyRate = (mockOccupancyData.occupied / mockOccupancyData.total) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      <NavigationBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex h-[calc(100vh-3.5rem)] mt-14 relative">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            w-[280px] lg:w-64 
            bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
            fixed lg:static 
            left-0 top-14 
            h-[calc(100vh-3.5rem)] 
            transition-transform duration-300 ease-in-out
            z-50 lg:z-0
            border-r
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <TreeView />
        </aside>

        <main
          className={`
            flex-1 
            p-4 sm:p-6 lg:p-8 
            transition-all duration-300 
            w-full
            ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}
          `}
        >
          <div className="max-w-6xl mx-auto space-y-6">
            <header className="text-center space-y-3">
              <h1 className="text-3xl font-bold text-gradient">Översikt Fastighetsförvaltning</h1>
              <p className="text-muted-foreground">Aktuell status och statistik</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fastigheter */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Fastigheter</CardTitle>
                    <Building className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>Översikt av fastighetsbestånd</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold">{properties?.length || 0}</div>
                    <div className="space-y-2">
                      {properties?.map(property => (
                        <div key={property.id} className="text-sm">
                          <div className="font-medium">{property.designation}</div>
                          <div className="text-muted-foreground">{property.municipality}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Företag */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Företag</CardTitle>
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>Aktiva företag</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold">{companies?.length || 0}</div>
                    <div className="space-y-2">
                      {companies?.map(company => (
                        <div key={company.id} className="text-sm">
                          <div className="font-medium">{company.name}</div>
                          <div className="text-muted-foreground">{company.organizationNumber || 'Ingen org.nr'}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Beläggning */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Beläggning</CardTitle>
                    <Home className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>Aktuell beläggningsnivå</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold">{occupancyRate.toFixed(1)}%</div>
                    <div className="space-y-2">
                      <div className="w-full bg-secondary rounded-full h-2.5">
                        <div
                          className="bg-primary h-2.5 rounded-full transition-all"
                          style={{ width: `${occupancyRate}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 text-sm">
                        <div>
                          <div className="font-medium">Uthyrda</div>
                          <div className="text-muted-foreground">{mockOccupancyData.occupied} st</div>
                        </div>
                        <div>
                          <div className="font-medium">Lediga</div>
                          <div className="text-muted-foreground">{mockOccupancyData.available} st</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
