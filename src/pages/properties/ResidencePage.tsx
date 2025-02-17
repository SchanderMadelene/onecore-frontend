
import { useParams } from "react-router-dom";
import { NavigationBar } from "@/components/NavigationBar";
import { TreeView } from "@/components/TreeView";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Residence } from "@/types/api";
import type { APIResponse } from "@/types/api";

const mockResidenceData: APIResponse<Residence> = {
  content: {
    id: "101",
    code: "LGH-101",
    name: "Kontorslokal med utsikt",
    deleted: false,
    validityPeriod: {
      fromDate: "2024-01-01T00:00:00Z",
      toDate: "2024-12-31T23:59:59Z"
    }
  }
};

const fetchResidence = async (id: string): Promise<Residence> => {
  // Simulera en nätverksfördröjning
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Returnera mock-data
  return mockResidenceData.content;
};

const ResidencePage = () => {
  const { city, district, property, id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: residenceData, isLoading, error } = useQuery({
    queryKey: ['residence', id],
    queryFn: () => fetchResidence(id || ''),
    enabled: !!id
  });

  // Om data håller på att laddas, visa en laddningsindikator
  if (isLoading) {
    return <div>Laddar...</div>;
  }

  // Om det uppstod ett fel, visa felmeddelande
  if (error) {
    return <div>Ett fel uppstod: {error.message}</div>;
  }

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
          <TreeView onNavigate={() => setIsSidebarOpen(false)} />
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
            <div>
              <h1 className="text-3xl font-bold mb-2">Lägenhet {residenceData?.code}</h1>
              <p className="text-muted-foreground">{property?.replace("-", " ")}, {district}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Grundinformation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Lägenhetskod</p>
                      <p className="font-medium">{residenceData?.code}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Namn</p>
                      <p className="font-medium">{residenceData?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">{residenceData?.deleted ? "Borttagen" : "Aktiv"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Giltighetstid</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Giltig från</p>
                      <p className="font-medium">
                        {new Date(residenceData?.validityPeriod.fromDate || '').toLocaleDateString('sv-SE')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Giltig till</p>
                      <p className="font-medium">
                        {new Date(residenceData?.validityPeriod.toDate || '').toLocaleDateString('sv-SE')}
                      </p>
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

export default ResidencePage;
