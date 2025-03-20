
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyInspectionStateProps {
  onStartInspection: () => void;
}

export const EmptyInspectionState = ({ onStartInspection }: EmptyInspectionStateProps) => {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium mb-4">Ingen aktiv besiktning</h3>
      <p className="text-muted-foreground mb-6">
        Starta en ny besiktning för att dokumentera lägenhetens skick
      </p>
      <Button onClick={onStartInspection}>
        <Plus className="mr-2 h-4 w-4" />
        Starta ny besiktning
      </Button>
    </div>
  );
};
