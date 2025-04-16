
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

  // Mock rooms data for demonstration - in real app this would come from API
  const mockRooms: Room[] = [
    { id: "1", name: "Kök", type: "kitchen", area: 12 },
    { id: "2", name: "Vardagsrum", type: "living", area: 20 },
    { id: "3", name: "Sovrum", type: "bedroom", area: 14 }
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
