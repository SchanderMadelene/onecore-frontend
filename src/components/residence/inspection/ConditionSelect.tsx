
import { Button } from "@/components/ui/button";
import { Paintbrush, Wrench, Hammer, Camera, FileImage } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ConditionSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  actions: string[];
  onActionUpdate: (action: string) => void;
  type: "walls" | "floor" | "ceiling" | "details";
  note: string;
  onNoteChange: (note: string) => void;
}

export const ConditionSelect = ({ 
  label, 
  value, 
  onChange, 
  actions, 
  onActionUpdate,
  type,
  note,
  onNoteChange
}: ConditionSelectProps) => {
  const needsAction = (condition: string) => {
    return condition === "needs_attention" || condition === "damaged";
  };

  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.preventDefault();
    e.stopPropagation();
    onActionUpdate(action);
  };

  const getActionButtons = () => {
    switch (type) {
      case "walls":
      case "ceiling":
        return (
          <>
            <Button
              size="sm"
              variant={actions.includes("painting") ? "default" : "outline"}
              onClick={(e) => handleActionClick(e, "painting")}
            >
              <Paintbrush className="h-4 w-4 mr-1" />
              Målning
            </Button>
            <Button
              size="sm"
              variant={actions.includes("repair") ? "default" : "outline"}
              onClick={(e) => handleActionClick(e, "repair")}
            >
              <Wrench className="h-4 w-4 mr-1" />
              Reparation
            </Button>
          </>
        );
      case "floor":
      case "details":
        return (
          <>
            <Button
              size="sm"
              variant={actions.includes("repair") ? "default" : "outline"}
              onClick={(e) => handleActionClick(e, "repair")}
            >
              <Wrench className="h-4 w-4 mr-1" />
              Reparation
            </Button>
            <Button
              size="sm"
              variant={actions.includes("replacement") ? "default" : "outline"}
              onClick={(e) => handleActionClick(e, "replacement")}
            >
              <Hammer className="h-4 w-4 mr-1" />
              Byte
            </Button>
          </>
        );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
      </div>
      <select 
        className="w-full border rounded-md p-2 mt-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Välj skick</option>
        <option value="good">Bra skick</option>
        <option value="acceptable">Acceptabelt</option>
        <option value="needs_attention">Behöver åtgärd</option>
        <option value="damaged">Skadat</option>
      </select>
      
      {/* Action buttons shown only when needed */}
      {needsAction(value) && (
        <div className="mt-2 flex gap-2">
          {getActionButtons()}
        </div>
      )}
      
      {/* Notes and Photo button - now always visible */}
      <div className="space-y-2 mt-2">
        <Textarea
          className="w-full text-sm"
          placeholder="Skriv en anteckning..."
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          rows={2}
        />
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={(e) => e.stopPropagation()}
          className="w-full"
        >
          <Camera className="mr-2 h-4 w-4" />
          Lägg till foto
        </Button>
      </div>
    </div>
  );
};
