
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ApplicationFormProps {
  applicationType: "Byte" | "Hyra flera";
  onApplicationTypeChange: (value: "Byte" | "Hyra flera") => void;
  notes: string;
  onNotesChange: (value: string) => void;
  applicationTypeError: string;
  hasAreaRestriction?: boolean;
}

export const ApplicationForm = ({ 
  applicationType, 
  onApplicationTypeChange, 
  notes, 
  onNotesChange, 
  applicationTypeError,
  hasAreaRestriction = true // Default to true to show the example
}: ApplicationFormProps) => {
  
  const showAreaRestrictionError = hasAreaRestriction && applicationType === "Hyra flera";

  return (
    <div className="space-y-6">
      {/* Ärendetyp */}
      <div className="space-y-3">
        <Label>Ärendetyp</Label>
        <RadioGroup
          value={applicationType}
          onValueChange={onApplicationTypeChange}
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Byte" id="byte" />
            <Label htmlFor="byte" className="cursor-pointer">Byte</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Hyra flera" id="hyra-flera" />
            <Label htmlFor="hyra-flera" className="cursor-pointer">Hyra flera</Label>
          </div>
        </RadioGroup>
        
        {/* Area restriction error message */}
        {showAreaRestrictionError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
            Kunden kan ej hyra flera bilplatser då denne redan har bilplats i ett begränsat område.
          </div>
        )}
        
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
