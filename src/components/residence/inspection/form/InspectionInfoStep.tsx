
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface InspectionInfoStepProps {
  inspectorName: string;
  onInspectorNameChange: (name: string) => void;
  onNext: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const InspectionInfoStep = ({
  inspectorName,
  onInspectorNameChange,
  onNext,
  onCancel
}: InspectionInfoStepProps) => {
  return (
    <form onSubmit={onNext}>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label htmlFor="inspectorName" className="text-sm font-medium">
            Besiktningsman
          </label>
          <input
            id="inspectorName"
            type="text"
            value={inspectorName}
            onChange={(e) => onInspectorNameChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
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
};
