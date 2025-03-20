
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
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
  onApartmentInfoChange: (value: { address: string; hasMainKey: boolean }) => void;
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
  onApartmentInfoChange,
  onNext,
  onCancel,
}: InspectionInfoStepProps) {
  // Format current date with time
  const formatDateWithTime = () => {
    const now = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return now.toLocaleString('sv-SE', dateOptions);
  };

  // Set apartment info when the component renders
  React.useEffect(() => {
    onApartmentInfoChange({
      address: "Odenplan 5, lägenhet 1001",
      hasMainKey: true
    });
  }, [onApartmentInfoChange]);

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
              {formatDateWithTime()}
            </p>
          </div>
          <div className="space-y-2">
            <Label>Huvudnyckel finns</Label>
            <p className="text-sm text-muted-foreground">Ja</p>
          </div>
        </div>

        <Separator />
        
        <TenantInformation tenant={mockTenant} />
      </div>
      
      <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Avbryt
        </Button>
        <Button type="submit">
          Nästa
        </Button>
      </DialogFooter>
    </form>
  );
}
