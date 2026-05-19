import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ActionChecklistProps {
  componentType: string;
  selectedActions: string[];
  onActionToggle: (action: string) => void;
}

const APPLIANCE_ACTIONS = [
  { value: "repair", label: "Reparation" },
  { value: "replacement", label: "Byte" },
  { value: "adjustment", label: "Justering" }
];

const ACTION_OPTIONS: Record<string, { value: string; label: string }[]> = {
  walls: [
    { value: "painting", label: "Målning" },
    { value: "repair", label: "Reparation" },
    { value: "spackling", label: "Spackling" },
    { value: "wallpapering", label: "Tapetsering" }
  ],
  ceiling: [
    { value: "painting", label: "Målning" },
    { value: "repair", label: "Reparation" },
    { value: "spackling", label: "Spackling" },
    { value: "wallpapering", label: "Tapetsering" }
  ],
  floor: [
    { value: "repair", label: "Reparation" },
    { value: "replacement", label: "Byte" },
    { value: "sanding", label: "Slipning" },
    { value: "varnishing", label: "Lackering" }
  ],
  appliances: APPLIANCE_ACTIONS,
  refrigerator: APPLIANCE_ACTIONS,
  freezer: APPLIANCE_ACTIONS,
  washingMachine: APPLIANCE_ACTIONS,
  tumbleDryer: APPLIANCE_ACTIONS,
  kitchenDoors: [
    { value: "painting", label: "Målning" },
    { value: "repair", label: "Reparation" },
    { value: "replacement", label: "Byte" },
    { value: "adjustment", label: "Justering" }
  ]
};

export function ActionChecklist({ componentType, selectedActions, onActionToggle }: ActionChecklistProps) {
  const actions = ACTION_OPTIONS[componentType] ?? APPLIANCE_ACTIONS;

  return (
    <div className="space-y-3">
      {actions.map((action) => (
        <div key={action.value} className="flex items-center space-x-2">
          <Checkbox
            id={action.value}
            checked={selectedActions.includes(action.value)}
            onCheckedChange={() => onActionToggle(action.value)}
          />
          <Label
            htmlFor={action.value}
            className="text-sm font-normal cursor-pointer"
          >
            {action.label}
          </Label>
        </div>
      ))}
    </div>
  );
}
