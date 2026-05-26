import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ActionChecklistProps {
  componentType: string;
  selectedActions: string[];
  onActionToggle: (action: string) => void;
}

// Dokumentets baseline för alla komponenter som bara har Utbyte + Reparation
const REPLACE_REPAIR = [
  { value: "replacement", label: "Utbyte" },
  { value: "repair", label: "Reparation" },
];

// Endast utbyte
const REPLACE_ONLY = [
  { value: "replacement", label: "Utbyte" },
];

// Endast reparation (Lägenhetsdörr, Altantrall)
const REPAIR_ONLY = [
  { value: "repair", label: "Reparation" },
];

// Vägg / tak — fem målningsvarianter enligt dokumentet
const WALL_ACTIONS = [
  { value: "fullPainting", label: "Helmålning" },
  { value: "wallsCeilingPainting", label: "Målning väggar/tak" },
  { value: "wallPainting", label: "Målning väggar" },
  { value: "fullBlockPainting", label: "Helmålning/Spärrmålning" },
  { value: "touchUpPainting", label: "Förbättringsmålning" },
];

export const ACTION_OPTIONS: Record<string, { value: string; label: string }[]> = {
  // ===== Fasta komponenter per rum =====
  walls: WALL_ACTIONS,
  ceiling: WALL_ACTIONS,
  floor: [
    { value: "sanding", label: "Slipning" },
    { value: "replacement", label: "Utbyte" },
    { value: "polishing", label: "Polering" },
    { value: "sandingRepair", label: "Slipning / lagning" },
  ],
  kitchenDoors: [
    { value: "replacement", label: "Utbyte" },
    { value: "painting", label: "Målning" },
    { value: "repair", label: "Reparation" },
  ],
  refrigerator: REPLACE_REPAIR,
  freezer: REPLACE_REPAIR,
  washingMachine: REPLACE_REPAIR,
  tumbleDryer: REPLACE_REPAIR,

  // ===== Tilläggskomponenter (Detaljer) =====
  fridgeFreezer: REPLACE_REPAIR,
  stove: REPLACE_REPAIR,
  cooktop: [
    { value: "replacement", label: "Utbyte" },
    { value: "repair", label: "Reparation" },
    { value: "polishing", label: "Polering" },
  ],
  oven: REPLACE_REPAIR,
  microwave: REPLACE_REPAIR,
  dishwasher: REPLACE_REPAIR,
  washerDryer: REPLACE_REPAIR,
  sink: REPLACE_ONLY,
  worktop: REPLACE_ONLY,
  cabinetFrame: REPLACE_REPAIR,
  kickPlate: REPLACE_REPAIR,
  kitchenFaucet: REPLACE_REPAIR,
  hood: REPLACE_REPAIR,
  radiator: [
    { value: "replacement", label: "Utbyte" },
    { value: "inspection", label: "Kontroll" },
  ],
  outlet: [
    { value: "replacement", label: "Utbyte" },
    { value: "adjustment", label: "Justering" },
  ],
  switch: [
    { value: "replacement", label: "Utbyte" },
    { value: "adjustment", label: "Justering" },
  ],
  lightFixture: [
    { value: "replacement", label: "Utbyte" },
    { value: "bulbReplacement", label: "Byte ljuskälla" },
  ],
  circuitDiagram: REPLACE_ONLY,
  smokeDetector: REPLACE_ONLY,
  window: REPLACE_REPAIR,
  interiorDoor: REPLACE_REPAIR,
  apartmentDoor: REPAIR_ONLY,
  bathroomCabinet: REPLACE_REPAIR,
  wallMirror: REPLACE_ONLY,
  toilet: REPLACE_REPAIR,
  showerSet: REPLACE_REPAIR,
  showerHose: REPLACE_ONLY,
  bathtub: REPLACE_REPAIR,
  showerWall: REPLACE_REPAIR,
  tiles: REPLACE_ONLY,
  washbasin: REPLACE_ONLY,
  waterTrap: REPLACE_REPAIR,
  dryingRack: REPLACE_REPAIR,
  dryingHoist: REPLACE_REPAIR,
  towelRail: REPLACE_ONLY,
  baseboard: REPLACE_ONLY,
  hatRack: REPLACE_REPAIR,
  balconyDeck: REPAIR_ONLY,
};

export function getActionsForComponent(componentType: string) {
  return ACTION_OPTIONS[componentType] ?? REPLACE_REPAIR;
}

export function ActionChecklist({ componentType, selectedActions, onActionToggle }: ActionChecklistProps) {
  const actions = getActionsForComponent(componentType);

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
