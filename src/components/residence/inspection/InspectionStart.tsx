
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { InspectionFormDialog } from "./InspectionFormDialog";

interface InspectionStartProps {
  onStart: (inspectorName: string) => void;
}

export const InspectionStart = ({ onStart }: InspectionStartProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onStart={onStart}
      />
    </>
  );
};
