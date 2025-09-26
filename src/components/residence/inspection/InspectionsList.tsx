
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ClipboardList } from "lucide-react";
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

  const activeInspection = inspections.find(inspection => 
    !inspection.isCompleted && 
    Object.keys(inspection.rooms).length > 0 &&
    !Object.values(inspection.rooms).every(room => room.isHandled)
  );

  const completedInspections = inspections.filter(inspection => 
    inspection !== activeInspection
  );

  const handleOpenInspection = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    setIsViewDialogOpen(true);
  };

  const renderInspectionsTable = (inspectionsData: Inspection[]) => (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
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
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <Button 
          size="sm" 
          onClick={() => setIsDialogOpen(true)} 
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Skapa ny
        </Button>
        {inspections.length > 0 && (
          <Button 
            variant="outline"
            size="sm" 
            onClick={() => {
              localStorage.removeItem("inspections");
              onInspectionCreated(); // This will refresh the inspections list
            }} 
            className="text-xs"
          >
            Rensa alla
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-slate-100/70 p-1 rounded-lg overflow-x-auto">
          <TabsTrigger value="active">Pågående</TabsTrigger>
          <TabsTrigger value="history">Historik</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activeInspection ? (
            renderInspectionsTable([activeInspection])
          ) : (
            <p className="text-slate-500 p-2">Ingen aktiv besiktning för denna lägenhet.</p>
          )}
        </TabsContent>
        
        <TabsContent value="history">
          {completedInspections.length > 0 ? (
            renderInspectionsTable(completedInspections)
          ) : (
            <p className="text-slate-500 p-2">Ingen besiktningshistorik för denna lägenhet.</p>
          )}
        </TabsContent>
      </Tabs>

      {isDialogOpen && (
        <InspectionFormDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={(inspectorName, roomsData) => {
            const newInspection: Inspection = {
              id: `inspection-${Date.now()}`,
              date: new Date().toISOString(),
              inspectedBy: inspectorName,
              rooms: roomsData,
              isCompleted: false
            };
            
            onInspectionCreated();
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
    </div>
  );
}

