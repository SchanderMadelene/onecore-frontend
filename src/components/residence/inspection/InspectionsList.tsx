
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InspectionFormDialog } from "./InspectionFormDialog";
import { InspectionReadOnly } from "./InspectionReadOnly";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import type { Room } from "@/types/api";
import type { Inspection } from "./types";

interface InspectionsListProps {
  rooms: Room[];
  inspections: Inspection[];
  onInspectionCreated: () => void;
}

export function InspectionsList({ rooms, inspections, onInspectionCreated }: InspectionsListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Check for isCompleted property or use isHandled as fallback
  const activeInspections = inspections.filter(inspection => 
    inspection.isCompleted === false || 
    (inspection.isCompleted === undefined && !Object.values(inspection.rooms).every(room => room.isHandled))
  );
  
  const completedInspections = inspections.filter(inspection => 
    inspection.isCompleted === true || 
    (inspection.isCompleted === undefined && Object.values(inspection.rooms).every(room => room.isHandled))
  );

  const handleOpenInspection = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    setIsViewDialogOpen(true);
  };

  const renderInspectionsTable = (inspectionsData: Inspection[]) => (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Datum</TableHead>
            <TableHead>Besiktningsman</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Antal rum</TableHead>
            <TableHead className="text-right">Åtgärder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inspectionsData.map((inspection) => (
            <TableRow key={inspection.id} className="group">
              <TableCell>{format(new Date(inspection.date), "yyyy-MM-dd")}</TableCell>
              <TableCell>{inspection.inspectedBy}</TableCell>
              <TableCell>
                {inspection.isCompleted || Object.values(inspection.rooms).every(room => room.isHandled)
                  ? "Slutförd"
                  : "Pågående"}
              </TableCell>
              <TableCell>{Object.keys(inspection.rooms).length}</TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleOpenInspection(inspection)}
                >
                  Visa detaljer
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>Besiktningar</CardTitle>
        <Button size="sm" onClick={() => setIsDialogOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Skapa besiktning
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Aktiva besiktningar</TabsTrigger>
            <TabsTrigger value="history">Besiktningshistorik</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeInspections.length > 0 ? (
              renderInspectionsTable(activeInspections)
            ) : (
              <p className="text-muted-foreground">Inga aktiva besiktningar för denna lägenhet.</p>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {completedInspections.length > 0 ? (
              renderInspectionsTable(completedInspections)
            ) : (
              <p className="text-muted-foreground">Ingen besiktningshistorik för denna lägenhet.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {isDialogOpen && (
        <InspectionFormDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={(inspectorName, roomsData) => {
            // Handle submission logic
            const newInspection: Inspection = {
              id: `inspection-${Date.now()}`,
              date: new Date().toISOString(),
              inspectedBy: inspectorName,
              rooms: roomsData,
              isCompleted: false
            };
            
            // Save inspection (this is handled by the parent component)
            onInspectionCreated();
            
            // Close the dialog
            setIsDialogOpen(false);
          }}
          rooms={rooms}
        />
      )}

      {selectedInspection && (
        <InspectionReadOnly
          inspection={selectedInspection}
          isOpen={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
        />
      )}
    </Card>
  );
}
