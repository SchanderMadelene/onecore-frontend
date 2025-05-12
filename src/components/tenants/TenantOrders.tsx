
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrdersManagement } from "@/components/residence/OrdersManagement";

export function TenantOrders() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Ärenden</CardTitle>
      </CardHeader>
      <CardContent>
        <OrdersManagement />
      </CardContent>
    </Card>
  );
}
