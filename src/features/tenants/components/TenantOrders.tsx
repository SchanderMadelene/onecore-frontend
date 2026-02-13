
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrdersManagement } from "@/features/residences/components/OrdersManagement";
import { mockTenant } from "../data/tenants";

interface TenantOrdersProps {
  compact?: boolean;
}

export function TenantOrders({ compact = false }: TenantOrdersProps) {
  const residenceId = "lgh-1001";
  
  if (compact) {
    return (
      <OrdersManagement 
        contextType="tenant" 
        residenceId={residenceId}
        tenant={mockTenant}
        compact
      />
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Ärenden</CardTitle>
      </CardHeader>
      <CardContent>
        <OrdersManagement 
          contextType="tenant" 
          residenceId={residenceId}
          tenant={mockTenant}
        />
      </CardContent>
    </Card>
  );
}
