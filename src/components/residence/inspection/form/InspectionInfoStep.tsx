
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";

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
  return (
    <form onSubmit={onNext}>
      <div className="space-y-4 py-4">
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
