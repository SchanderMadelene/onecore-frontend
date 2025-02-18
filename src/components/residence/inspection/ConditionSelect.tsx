
import { Button } from "@/components/ui/button";
import { PaintRoller, Wrench, Hammer } from "lucide-react";

interface ConditionSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  actions: string[];
  onActionUpdate: (action: string) => void;
  type: "walls" | "floor" | "ceiling" | "details";
}

export const ConditionSelect = ({ 
  label, 
  value, 
  onChange, 
  actions, 
  onActionUpdate,
  type 
}: ConditionSelectProps) => {
  const needsAction = (condition: string) => {
    return condition === "needs_attention" || condition === "damaged";
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
              onClick={() => onActionUpdate("painting")}
            >
              <PaintRoller className="h-4 w-4 mr-1" />
              Målning
            </Button>
            <Button
              size="sm"
              variant={actions.includes("repair") ? "default" : "outline"}
              onClick={() => onActionUpdate("repair")}
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
              onClick={() => onActionUpdate("repair")}
            >
              <Wrench className="h-4 w-4 mr-1" />
              Reparation
            </Button>
            <Button
              size="sm"
              variant={actions.includes("replacement") ? "default" : "outline"}
              onClick={() => onActionUpdate("replacement")}
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
      <label className="text-sm font-medium">{label}</label>
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
      {needsAction(value) && (
        <div className="mt-2 flex gap-2">
          {getActionButtons()}
        </div>
      )}
    </div>
  );
};
