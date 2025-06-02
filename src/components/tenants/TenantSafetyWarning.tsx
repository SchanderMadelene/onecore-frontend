
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function TenantSafetyWarning() {
  return (
    <Alert className="mb-6 border-amber-200 bg-amber-50">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800">
        <strong>Säkerhetsvarning:</strong> Åk aldrig ensam till kund. Ta alltid med dig en kollega vid hembesök.
      </AlertDescription>
    </Alert>
  );
}
