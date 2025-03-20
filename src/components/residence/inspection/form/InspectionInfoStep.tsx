
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { TenantInformation } from "./TenantInformation";
import { mockTenant } from "@/data/tenants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InspectionInfoStepProps {
  inspectorName: string;
  onInspectorNameChange: (value: string) => void;
  onNext: (e: React.FormEvent) => void;
  onCancel: () => void;
}

// List of available inspectors
const inspectors = [
  "Madelene Schander", // Current logged in user
  "Johan Andersson",
  "Maria Karlsson",
  "Erik Lindberg",
];

export function InspectionInfoStep({
  inspectorName,
  onInspectorNameChange,
  onNext,
  onCancel,
}: InspectionInfoStepProps) {
  return (
    <form onSubmit={onNext}>
      <div className="space-y-6 py-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inspectorName">Besiktningsman</Label>
            <Select 
              value={inspectorName || inspectors[0]} 
              onValueChange={onInspectorNameChange}
              defaultValue={inspectors[0]}
            >
              <SelectTrigger id="inspectorName" className="w-full">
                <SelectValue placeholder="Välj besiktningsman" />
              </SelectTrigger>
              <SelectContent>
                {inspectors.map((inspector) => (
                  <SelectItem key={inspector} value={inspector}>
                    {inspector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Lägenhet</Label>
            <p className="text-sm text-muted-foreground">
              Odenplan 5, lägenhet 1001
            </p>
          </div>
          <div className="space-y-2">
            <Label>Datum</Label>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("sv-SE")}
            </p>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="master-key" className="flex-1">Huvudnyckel finns</Label>
            <Switch id="master-key" defaultChecked />
          </div>
        </div>

        <Separator />
        
        <TenantInformation tenant={mockTenant} />
      </div>
      
      <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Avbryt
        </Button>
        <Button type="submit" disabled={!inspectorName.trim()}>
          Nästa
        </Button>
      </DialogFooter>
    </form>
  );
}
