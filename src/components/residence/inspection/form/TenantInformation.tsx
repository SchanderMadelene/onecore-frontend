
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TenantInformationProps {
  tenant: {
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

export function TenantInformation({ tenant }: TenantInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hyresgästinformation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Namn</p>
              <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Personnummer</p>
              <p className="font-medium">{tenant.personalNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kontraktsnummer</p>
              <p className="font-medium">{tenant.contractNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kontraktsstatus</p>
              <p className="font-medium">
                {tenant.contractStatus === "permanent" ? "Tillsvidare" : "Uppsagt"}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Telefon</p>
              <p className="font-medium">{tenant.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">E-post</p>
              <p className="font-medium">{tenant.email}</p>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
