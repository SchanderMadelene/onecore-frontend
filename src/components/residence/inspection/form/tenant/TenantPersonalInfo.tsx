
import { Calendar } from "lucide-react";

interface TenantPersonalInfoProps {
  firstName: string;
  lastName: string;
  moveInDate: string;
  moveOutDate?: string;
  personalNumber: string;
  isSecondaryTenant?: boolean;
}

export function TenantPersonalInfo({
  firstName,
  lastName,
  moveInDate,
  moveOutDate,
  personalNumber,
  isSecondaryTenant = false
}: TenantPersonalInfoProps) {
  // For secondary tenants, we only show the dates
  if (isSecondaryTenant) {
    return (
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Godkänd från</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">{new Date(moveInDate).toLocaleDateString('sv-SE')}</p>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        {moveOutDate && (
          <div>
            <p className="text-sm text-muted-foreground">Godkänd till</p>
            <div className="flex items-center gap-2">
              <p className="font-medium">{new Date(moveOutDate).toLocaleDateString('sv-SE')}</p>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
    );
  }

  // For primary tenants, show all information
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">Namn</p>
        <p className="font-medium">{firstName} {lastName}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
        <div className="flex items-center gap-2">
          <p className="font-medium">{new Date(moveInDate).toLocaleDateString('sv-SE')}</p>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      {moveOutDate && (
        <div>
          <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
          <div className="flex items-center gap-2">
            <p className="font-medium">{new Date(moveOutDate).toLocaleDateString('sv-SE')}</p>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
      <div>
        <p className="text-sm text-muted-foreground">Personnummer</p>
        <p className="font-medium">{personalNumber}</p>
      </div>
    </div>
  );
}
