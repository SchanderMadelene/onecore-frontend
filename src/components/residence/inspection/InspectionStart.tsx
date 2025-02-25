
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { InspectionFormDialog } from "./InspectionFormDialog";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";

interface InspectionStartProps {
  rooms: Room[];
  onSave: (inspectorName: string, rooms: Record<string, InspectionRoomType>) => void;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const InspectionStart = ({ 
  rooms, 
  onSave, 
  isExpanded, 
  onToggle 
}: InspectionStartProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Om vi har onToggle prop, använd den för expandering/kollaps
  // annars visa default vy med "Starta ny besiktning"
  if (onToggle) {
    return (
      <Card>
        <CardHeader className="cursor-pointer" onClick={onToggle}>
          <CardTitle>{rooms[0].name || rooms[0].roomType?.name || rooms[0].code}</CardTitle>
        </CardHeader>
        {isExpanded && (
          <CardContent>
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-4">Ingen aktiv besiktning</h3>
              <p className="text-muted-foreground mb-6">
                Starta en ny besiktning för att dokumentera lägenhetens skick
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Starta ny besiktning
              </Button>
            </div>
          </CardContent>
        )}

        <InspectionFormDialog
          rooms={rooms}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={onSave}
        />
      </Card>
    );
  }

  // Default vy för när vi inte har expandering/kollaps
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Besiktning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-4">Ingen aktiv besiktning</h3>
            <p className="text-muted-foreground mb-6">
              Starta en ny besiktning för att dokumentera lägenhetens skick
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Starta ny besiktning
            </Button>
          </div>
        </CardContent>
      </Card>

      <InspectionFormDialog
        rooms={rooms}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={onSave}
      />
    </>
  );
}
