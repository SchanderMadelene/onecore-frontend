import { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import floorplan1 from "@/assets/floorplans/floorplan-206-005-01-0102.jpg";

export function PlanritningTab() {
  const [floorplan, setFloorplan] = useState<string | null>(floorplan1);

  const handleUpload = () => {
    // Mock: replace with example
    setFloorplan(floorplan1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Planritning</h3>
          <p className="text-xs text-muted-foreground">
            En planritning per annons. Ladda upp en ny för att ersätta.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            {floorplan ? "Ersätt" : "Ladda upp"}
          </Button>
          {floorplan && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFloorplan(null)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Ta bort
            </Button>
          )}
        </div>
      </div>

      {floorplan ? (
        <div className="overflow-hidden rounded-md border bg-muted">
          <img
            src={floorplan}
            alt="Planritning"
            className="mx-auto max-h-[600px] w-auto object-contain"
          />
        </div>
      ) : (
        <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Ingen planritning uppladdad
        </div>
      )}
    </div>
  );
}
