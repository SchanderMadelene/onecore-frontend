import { useState } from "react";
import { Upload, Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/components/ui/button";
import floorplan1 from "@/assets/floorplans/floorplan-206-005-01-0102.jpg";
import floorplan2 from "@/assets/floorplans/floorplan-1rok-38.jpg";
import floorplan3 from "@/assets/floorplans/floorplan-3rok-78.jpg";
import floorplan4 from "@/assets/floorplans/floorplan-4rok-95.jpg";

const examples = [
  { id: "1", url: floorplan1, label: "2 RoK · 61 m² · Karlavagnsgatan 5" },
  { id: "2", url: floorplan2, label: "1 RoK · 38 m² · Karlavagnsgatan 9" },
  { id: "3", url: floorplan3, label: "3 RoK · 78 m² · Björnvägen 12" },
  { id: "4", url: floorplan4, label: "4 RoK · 95 m² · Vetterstorpsvägen 22" },
];

export function PlanritningTab() {
  const [selected, setSelected] = useState<string | null>("1");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Planritning</h3>
          <p className="text-xs text-muted-foreground">
            Välj en befintlig planritning eller ladda upp en ny.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Ladda upp planritning
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {examples.map((ex) => {
          const isSelected = selected === ex.id;
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => setSelected(ex.id)}
              className={cn(
                "group relative overflow-hidden rounded-md border bg-background text-left transition",
                isSelected
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={ex.url}
                  alt={ex.label}
                  className="h-full w-full object-contain"
                />
              </div>
              {isSelected && (
                <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" />
                </div>
              )}
              <div className="border-t px-2 py-1.5 text-xs">{ex.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
