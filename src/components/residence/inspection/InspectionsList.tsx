
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InspectionFormDialog } from "./InspectionFormDialog";
import { InspectionReadOnly } from "./InspectionReadOnly";
import type { Room } from "@/types/api";
import type { Inspection } from "./types";

interface InspectionsListProps {
  rooms: Room[];
  inspections: Inspection[];
  onInspectionCreated: () => void;
}

export function InspectionsList({ rooms, inspections, onInspectionCreated }: InspectionsListProps) {
  const activeInspections = inspections.filter(inspection => !inspection.isCompleted);
  const completedInspections = inspections.filter(inspection => inspection.isCompleted);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>Besiktningar</CardTitle>
        <InspectionFormDialog 
          rooms={rooms}
          buttonSize="sm"
          onInspectionCreated={onInspectionCreated}
        />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Aktiva besiktningar</TabsTrigger>
            <TabsTrigger value="history">Besiktningshistorik</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeInspections.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {activeInspections.map((inspection) => (
                  <InspectionReadOnly key={inspection.id} inspection={inspection} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Inga aktiva besiktningar för denna lägenhet.</p>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {completedInspections.length > 0 ? (
              <div className="space-y-4">
                {completedInspections.map((inspection) => (
                  <InspectionReadOnly key={inspection.id} inspection={inspection} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Ingen besiktningshistorik för denna lägenhet.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
