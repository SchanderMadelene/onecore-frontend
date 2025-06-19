
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { TenantValidation } from "@/hooks/useTenantValidation";

interface ApplicationTypeSelectionProps {
  applicationType: "Replace" | "Additional";
  onApplicationTypeChange: (value: "Replace" | "Additional") => void;
  tenantValidation: TenantValidation;
}

export const ApplicationTypeSelection = ({ 
  applicationType, 
  onApplicationTypeChange, 
  tenantValidation 
}: ApplicationTypeSelectionProps) => {
  const hasValidationIssues = tenantValidation.validationResult !== 'ok';
  
  if (!hasValidationIssues || tenantValidation.validationResult === 'no-contract') {
    return null;
  }

  return (
    <div className="space-y-3">
      <Label>Ärendetyp</Label>
      <RadioGroup 
        value={applicationType} 
        onValueChange={(value: "Replace" | "Additional") => onApplicationTypeChange(value)}
        className="flex gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="Replace" 
            id="replace"
            disabled={tenantValidation.validationResult === 'no-contract'}
          />
          <Label htmlFor="replace">Byte</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem 
            value="Additional" 
            id="additional"
            disabled={tenantValidation.validationResult === 'no-contract'}
          />
          <Label htmlFor="additional">Hyra flera</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
