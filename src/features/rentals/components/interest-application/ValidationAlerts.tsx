
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import type { ValidationResult } from "./types";
import type { TenantValidation } from "@/hooks/useTenantValidation";

interface ValidationAlertsProps {
  tenantValidation: TenantValidation;
}

export const ValidationAlerts = ({ tenantValidation }: ValidationAlertsProps) => {
  const getValidationMessage = (result: ValidationResult) => {
    switch (result) {
      case 'has-at-least-one-parking-space':
        return 'Kunden har redan bilplats. Välj "Byte" eller "Hyra flera"';
      case 'needs-replace-by-property':
        return 'Kunden måste byta bilplats eftersom denna bilplats ligger i ett begränsat område eller fastighet.';
      case 'needs-replace-by-residential-area':
        return 'Kunden måste byta bilplats eftersom denna bilplats ligger i ett begränsat område eller fastighet.';
      case 'no-contract':
        return 'Kunden saknar kontrakt i detta område eller denna fastighet.';
      default:
        return '';
    }
  };

  const tenantHasValidContractForTheDistrict = () => {
    return tenantValidation.hasContractInDistrict || tenantValidation.hasUpcomingContractInDistrict;
  };

  const renderWarningIfDistrictsMismatch = () => {
    if (tenantHasValidContractForTheDistrict()) {
      return null;
    }
    return 'Observera att kunden saknar boendekontrakt i området för parkeringsplatsen';
  };

  const hasValidationIssues = tenantValidation.validationResult !== 'ok';

  return (
    <>
      {hasValidationIssues && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {getValidationMessage(tenantValidation.validationResult)}
          </AlertDescription>
        </Alert>
      )}

      {tenantValidation.isAboutToLeave && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Kunden saknar giltigt bostadskontrakt. Det går endast att söka bilplats med gällande och kommande bostadskontrakt
          </AlertDescription>
        </Alert>
      )}

      {renderWarningIfDistrictsMismatch() && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {renderWarningIfDistrictsMismatch()}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
