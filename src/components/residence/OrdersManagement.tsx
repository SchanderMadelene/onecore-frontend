import { Button } from "@/components/ui/button";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";
import { useOrdersService } from "@/hooks/useOrdersService";
import { OrderCard } from "@/components/orders/OrderCard";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TabLayout } from "@/components/ui/tab-layout";
import { ClipboardList } from "lucide-react";

export interface OrdersManagementProps {
  contextType?: "tenant" | "residence" | "building";
  residenceId?: string;
  tenant?: any; // Adding the missing tenant prop
}

export function OrdersManagement({ contextType = "residence", residenceId, tenant }: OrdersManagementProps) {
  const { id } = useParams<{ id: string }>();
  const { getOrdersByResidence } = useOrdersService();
  const [refreshKey, setRefreshKey] = useState(0);

  // Get the actual ID, either from props or URL params
  const effectiveResidenceId = residenceId || id;
  
  // Get orders filtered by residence ID
  const { activeOrders, historicalOrders } = getOrdersByResidence(effectiveResidenceId);

  const handleOrderCreated = () => {
    // Force a re-render to show the new order
    setRefreshKey(prev => prev + 1);
  };

  return (
    <TabLayout 
      title="Ärenden" 
      icon={ClipboardList}
      count={activeOrders.length + historicalOrders.length}
      showCard={true}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-start">
          <CreateOrderDialog 
            contextType={contextType}
            onOrderCreated={handleOrderCreated}
            residenceId={effectiveResidenceId}
          />
        </div>
        
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
              <p className="text-slate-500 p-2">Inga aktiva ärenden.</p>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {historicalOrders.length > 0 ? (
              <OrdersTable orders={historicalOrders} />
            ) : (
              <p className="text-slate-500 p-2">Ingen ärendehistorik.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </TabLayout>
  );
}
