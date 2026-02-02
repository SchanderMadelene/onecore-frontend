import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { CostItem } from "./types";

interface CostItemSelectorProps {
  costItems: CostItem[];
  selectedItems: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export function CostItemSelector({
  costItems,
  selectedItems,
  onSelectionChange,
}: CostItemSelectorProps) {
  const handleToggle = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      onSelectionChange(selectedItems.filter((id) => id !== itemId));
    } else {
      onSelectionChange([...selectedItems, itemId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === costItems.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(costItems.map((item) => item.id));
    }
  };

  if (costItems.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic py-4">
        Inga anmärkningar med hyresgästens kostnadsansvar hittades.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          Välj kostnadsanmärkningar att inkludera:
        </Label>
        <button
          type="button"
          onClick={handleSelectAll}
          className="text-sm text-primary hover:underline"
        >
          {selectedItems.length === costItems.length ? "Avmarkera alla" : "Markera alla"}
        </button>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {costItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <Checkbox
              id={item.id}
              checked={selectedItems.includes(item.id)}
              onCheckedChange={() => handleToggle(item.id)}
              className="mt-0.5"
            />
            <div className="flex-1 min-w-0">
              <Label
                htmlFor={item.id}
                className="font-medium cursor-pointer block"
              >
                {item.roomName} - {item.componentLabel}
              </Label>
              {item.condition && (
                <p className="text-sm text-muted-foreground mt-1">
                  Skick: {item.condition}
                </p>
              )}
              {item.actions.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Åtgärd: {item.actions.join(", ")}
                </p>
              )}
              <Badge variant="destructive" className="mt-2 text-xs">
                Hyresgästens ansvar
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t">
        <p className="text-sm text-muted-foreground">
          {selectedItems.length} av {costItems.length} anmärkningar valda
        </p>
      </div>
    </div>
  );
}
