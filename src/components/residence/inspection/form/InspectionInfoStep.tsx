
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { TenantInformation } from "./TenantInformation";

interface InspectionInfoStepProps {
  inspectorName: string;
  onInspectorNameChange: (value: string) => void;
  onNext: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function InspectionInfoStep({
  inspectorName,
  onInspectorNameChange,
  onNext,
  onCancel,
}: InspectionInfoStepProps) {
  // Temporär hyresgästdata för demonstration
  const mockTenant = {
    firstName: "Anna",
    lastName: "Andersson",
    phone: "070-123 45 67",
    email: "anna.andersson@example.com",
    contractStatus: "permanent" as const,
  };

  return (
    <form onSubmit={onNext}>
      <div className="space-y-6 py-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inspectorName">Besiktningsman</Label>
            <Input
              id="inspectorName"
              value={inspectorName}
              onChange={(e) => onInspectorNameChange(e.target.value)}
              placeholder="Ange ditt namn"
              required
            />
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
          <div className="space-y-2">
            <Label>Huvudnyckel</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                data-state="active"
              >
                Ja
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Nej
              </Button>
            </div>
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
