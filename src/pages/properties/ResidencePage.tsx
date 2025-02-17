
import { useParams } from "react-router-dom";
import { NavigationBar } from "@/components/NavigationBar";
import { TreeView } from "@/components/TreeView";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ResidencePage = () => {
  const { city, district, property, id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Exempel på lägenhetsdata (detta skulle normalt komma från en databas)
  const residenceData = {
    id: id,
    code: "LGH-1001",
    name: "3 rok med balkong",
    address: `${property?.replace("-", " ")}, ${district}`,
    area: "72",
    floor: "2",
    rooms: "3",
    balcony: true,
    validityPeriod: {
      fromDate: "2024-01-01",
      toDate: "2024-12-31"
    },
    monthlyRent: "9 800",
    status: "Uthyrd"
  };

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
              <h1 className="text-3xl font-bold mb-2">Lägenhet {residenceData.id}</h1>
              <p className="text-muted-foreground">{residenceData.address}</p>
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
                      <p className="font-medium">{residenceData.code}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Namn</p>
                      <p className="font-medium">{residenceData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Area (m²)</p>
                      <p className="font-medium">{residenceData.area}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Våning</p>
                      <p className="font-medium">{residenceData.floor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Antal rum</p>
                      <p className="font-medium">{residenceData.rooms}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Balkong</p>
                      <p className="font-medium">{residenceData.balcony ? "Ja" : "Nej"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hyresinformation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">{residenceData.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Månadshyra (kr)</p>
                      <p className="font-medium">{residenceData.monthlyRent}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Giltig från</p>
                      <p className="font-medium">{residenceData.validityPeriod.fromDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Giltig till</p>
                      <p className="font-medium">{residenceData.validityPeriod.toDate}</p>
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
