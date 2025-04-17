
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";
import { OrderCard } from "@/components/orders/OrderCard";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { useOrdersService } from "@/hooks/useOrdersService";
import { useState } from "react";

export function TenantOrders() {
  const { activeOrders, historicalOrders } = useOrdersService();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOrderCreated = () => {
    // Force a re-render to show the new order
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Ärenden</CardTitle>
        <CreateOrderDialog 
          buttonSize="sm" 
          contextType="tenant"
          onOrderCreated={handleOrderCreated}
        />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full" key={refreshKey}>
          <TabsList className="mb-4 bg-slate-100/70 p-1 rounded-lg">
            <TabsTrigger value="active">Aktiva ärenden</TabsTrigger>
            <TabsTrigger value="history">Ärendehistorik</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            {activeOrders.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                {activeOrders.map((orderItem) => (
                  <OrderCard key={orderItem.id} orderItem={orderItem} />
                ))}
              </div>
            ) : (
              <p className="text-slate-500 p-2">Inga aktiva ärenden för denna hyresgäst.</p>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {historicalOrders.length > 0 ? (
              <OrdersTable orders={historicalOrders} />
            ) : (
              <p className="text-slate-500 p-2">Ingen ärendehistorik för denna hyresgäst.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
