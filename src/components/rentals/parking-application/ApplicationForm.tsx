
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ApplicationFormProps {
  applicationType: "Byte" | "Hyra flera";
  onApplicationTypeChange: (value: "Byte" | "Hyra flera") => void;
  notes: string;
  onNotesChange: (value: string) => void;
  applicationTypeError: string;
}

export const ApplicationForm = ({ 
  applicationType, 
  onApplicationTypeChange, 
  notes, 
  onNotesChange, 
  applicationTypeError 
}: ApplicationFormProps) => {
  return (
    <div className="space-y-6">
      {/* Ärendetyp */}
      <div className="space-y-2">
        <Label htmlFor="application-type">Ärendetyp</Label>
        <Select value={applicationType} onValueChange={onApplicationTypeChange}>
          <SelectTrigger className={applicationTypeError ? "border-red-500" : ""}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hyra flera">Hyra flera</SelectItem>
            <SelectItem value="Byte">Byte</SelectItem>
          </SelectContent>
        </Select>
        {applicationTypeError && (
          <p className="text-sm text-red-600 mt-1">{applicationTypeError}</p>
        )}
      </div>

      {/* Anteckningar */}
      <div className="space-y-2">
        <Label htmlFor="notes">Anteckningar (valfritt)</Label>
        <textarea
          id="notes"
          placeholder="Lägg till eventuella anteckningar..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="w-full p-3 border rounded-md min-h-[80px] resize-none"
        />
      </div>
    </div>
  );
};
