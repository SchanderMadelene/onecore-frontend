
import { Users, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface HistoricalTenant {
  firstName: string;
  lastName: string;
  personalNumber: string;
  moveInDate: string;
  moveOutDate: string;
  contractNumber: string;
}

interface HistoricalTenantsProps {
  tenants: HistoricalTenant[];
}

export function HistoricalTenants({ tenants }: HistoricalTenantsProps) {
  if (!tenants || tenants.length === 0) {
    return (
      <div className="text-center py-8 bg-muted/30 rounded-lg border">
        <p className="text-muted-foreground">Inga tidigare hyresgäster registrerade</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tenants.map((tenant, index) => (
        <Card key={index} className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center mb-3">
                <Users className="h-5 w-5 mr-2 text-slate-500" />
                <h4 className="font-medium">Tidigare hyresgäst</h4>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
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
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{new Date(tenant.moveInDate).toLocaleDateString('sv-SE')}</p>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{new Date(tenant.moveOutDate).toLocaleDateString('sv-SE')}</p>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hyresperiod</p>
                  <p className="font-medium">
                    {Math.round((new Date(tenant.moveOutDate).getTime() - new Date(tenant.moveInDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25 * 12))} månader
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
