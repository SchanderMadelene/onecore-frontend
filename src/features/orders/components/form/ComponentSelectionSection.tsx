import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Lista över möjliga komponenter för ett rum
const roomComponents = [
  "Golv", "Vägg", "Tak", "Dörr", "Fönster", "Kök", "Badrum", 
  "Värme", "El", "Ventilation", "Tvättmaskin", "Torktumlare", 
  "Diskmaskin", "Kyl/frys", "Spis", "Övrigt"
];

type ComponentSelectionSectionProps = {
  selectedComponent: string;
  setSelectedComponent: (component: string) => void;
};

export function ComponentSelectionSection({
  selectedComponent,
  setSelectedComponent,
}: ComponentSelectionSectionProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="component">Komponent</Label>
      <Select value={selectedComponent} onValueChange={setSelectedComponent}>
        <SelectTrigger id="component">
          <SelectValue placeholder="Välj komponent" />
        </SelectTrigger>
        <SelectContent>
          {roomComponents.map(component => (
            <SelectItem key={component} value={component}>
              {component}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
