
import { mockTenant } from "@/data/tenants";

interface BasicInformationProps {
  inspectorName: string;
  roomCount: number;
  apartmentInfo?: {
    address: string;
    hasMainKey: boolean;
  };
  tenant?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    contractStatus: "permanent" | "terminated";
    moveInDate: string;
    moveOutDate?: string;
    contractNumber: string;
    personalNumber: string;
  };
}

export function BasicInformation({ 
  inspectorName, 
  roomCount, 
  apartmentInfo,
  tenant = mockTenant // Default to mockTenant if not provided
}: BasicInformationProps) {
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Besiktningsman</p>
          <p className="font-medium">{inspectorName}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Datum</p>
          <p className="font-medium">{formatDateWithTime()}</p>
        </div>
        {apartmentInfo && (
          <div>
            <p className="text-sm text-muted-foreground">Lägenhet</p>
            <p className="font-medium">{apartmentInfo.address}</p>
          </div>
        )}
        {apartmentInfo && (
          <div>
            <p className="text-sm text-muted-foreground">Huvudnyckel finns</p>
            <p className="font-medium">{apartmentInfo.hasMainKey ? 'Ja' : 'Nej'}</p>
          </div>
        )}
        <div>
          <p className="text-sm text-muted-foreground">Antal rum</p>
          <p className="font-medium">{roomCount}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="font-medium">Pågående</p>
        </div>
      </div>

      {/* Tenant information section */}
      {tenant && (
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Hyresgästinformation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Namn</p>
              <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kontraktstatus</p>
              <p className="font-medium">
                {tenant.contractStatus === "permanent" ? "Tillsvidare" : "Uppsagt"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
              <p className="font-medium">{new Date(tenant.moveInDate).toLocaleDateString('sv-SE')}</p>
            </div>
            {tenant.moveOutDate && (
              <div>
                <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
                <p className="font-medium">{new Date(tenant.moveOutDate).toLocaleDateString('sv-SE')}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Telefon</p>
              <p className="font-medium">{tenant.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">E-post</p>
              <p className="font-medium">{tenant.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
