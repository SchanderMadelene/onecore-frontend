
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

  // Group tenants by contract number and period
  const groupedTenants = tenants.reduce((acc, tenant) => {
    const key = `${tenant.contractNumber}-${tenant.moveInDate}-${tenant.moveOutDate}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(tenant);
    return acc;
  }, {} as Record<string, HistoricalTenant[]>);

  return (
    <div className="space-y-4">
      {Object.values(groupedTenants).map((contractTenants, index) => {
        const firstTenant = contractTenants[0];
        const isMultipleTenants = contractTenants.length > 1;
        
        return (
          <Card key={index} className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center mb-3">
                  <Users className="h-5 w-5 mr-2 text-slate-500" />
                  <h4 className="font-medium">
                    {isMultipleTenants ? "Tidigare hyresgäster" : "Tidigare hyresgäst"}
                  </h4>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Namn</p>
                    <p className="font-medium">
                      {contractTenants.map(t => `${t.firstName} ${t.lastName}`).join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Personnummer</p>
                    <div className="font-medium">
                      {contractTenants.map((tenant, idx) => (
                        <div key={idx}>{tenant.personalNumber}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Kontraktsnummer</p>
                    <p className="font-medium">{firstTenant.contractNumber}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{new Date(firstTenant.moveInDate).toLocaleDateString('sv-SE')}</p>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{new Date(firstTenant.moveOutDate).toLocaleDateString('sv-SE')}</p>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hyresperiod</p>
                    <p className="font-medium">
                      {Math.round((new Date(firstTenant.moveOutDate).getTime() - new Date(firstTenant.moveInDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25 / 12))} månader
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
