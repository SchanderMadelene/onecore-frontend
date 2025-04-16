
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleOpenInspection = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    setIsViewDialogOpen(true);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>Besiktningar</CardTitle>
        <Button size="sm" onClick={() => setIsDialogOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Skapa besiktning
        </Button>
      </CardHeader>
      <CardContent>
        {inspections.length > 0 ? (
          <div className="space-y-4">
            {inspections.map((inspection) => (
              <div key={inspection.id} className="cursor-pointer" onClick={() => handleOpenInspection(inspection)}>
                <InspectionReadOnly inspection={inspection} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Ingen besiktningshistorik för denna lägenhet.</p>
        )}
      </CardContent>

      {/* Inspection form dialog */}
      <InspectionFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={(inspectorName, roomsData) => {
          const newInspection: Inspection = {
            id: `inspection-${Date.now()}`,
            date: new Date().toISOString(),
            inspectedBy: inspectorName,
            rooms: roomsData
          };
          
          onInspectionCreated();
          setIsDialogOpen(false);
        }}
        rooms={rooms}
      />

      {/* View inspection dialog */}
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
