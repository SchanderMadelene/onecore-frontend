
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { InspectionHistory } from "../residence/inspection/InspectionHistory";
import { InspectionStart } from "../residence/inspection/InspectionStart";
import type { Room } from "@/types/api";
import type { Inspection } from "../residence/inspection/types";

const LOCAL_STORAGE_KEY = "inspections";

const loadInspections = (): Inspection[] => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

export function TenantInspections() {
  const [inspectionHistory] = useState<Inspection[]>(loadInspections);
  const [refreshKey, setRefreshKey] = useState(0);

  // Mock rooms data for demonstration - structured according to the Room interface
  const mockRooms: Room[] = [
    { 
      id: "1", 
      code: "KOK",
      name: "Kök",
      usage: { shared: false, allowPeriodicWorks: true, spaceType: 1 },
      features: { hasToilet: false, isHeated: true, hasThermostatValve: true, orientation: 1 },
      dates: {
        installation: null,
        from: "2023-01-01T00:00:00Z",
        to: "2025-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 1,
      deleted: false,
      timestamp: "2023-01-01T00:00:00Z",
      roomType: null
    },
    { 
      id: "2", 
      code: "VARDAGSRUM",
      name: "Vardagsrum",
      usage: { shared: false, allowPeriodicWorks: true, spaceType: 2 },
      features: { hasToilet: false, isHeated: true, hasThermostatValve: true, orientation: 2 },
      dates: {
        installation: null,
        from: "2023-01-01T00:00:00Z",
        to: "2025-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 2,
      deleted: false,
      timestamp: "2023-01-01T00:00:00Z",
      roomType: null
    },
    { 
      id: "3", 
      code: "SOVRUM",
      name: "Sovrum",
      usage: { shared: false, allowPeriodicWorks: true, spaceType: 3 },
      features: { hasToilet: false, isHeated: true, hasThermostatValve: true, orientation: 3 },
      dates: {
        installation: null,
        from: "2023-01-01T00:00:00Z",
        to: "2025-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 3,
      deleted: false,
      timestamp: "2023-01-01T00:00:00Z",
      roomType: null
    }
  ];

  const handleInspectionCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  const activeInspection = inspectionHistory[0]; // Most recent inspection

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>Besiktningar</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full" key={refreshKey}>
          <TabsList className="mb-4">
            <TabsTrigger value="active">Pågående besiktningar</TabsTrigger>
            <TabsTrigger value="history">Besiktningshistorik</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeInspection ? (
              <div className="space-y-4">
                <InspectionStart
                  rooms={mockRooms}
                  onSave={() => handleInspectionCreated()}
                  currentInspection={null}
                />
              </div>
            ) : (
              <p className="text-muted-foreground">Inga pågående besiktningar.</p>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {inspectionHistory.length > 0 ? (
              <InspectionHistory inspections={inspectionHistory} />
            ) : (
              <p className="text-muted-foreground">Ingen besiktningshistorik tillgänglig.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
