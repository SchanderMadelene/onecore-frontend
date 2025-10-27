import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";
import { useOrdersService } from "@/hooks/useOrdersService";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { TabLayout } from "@/components/ui/tab-layout";

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

  // Combine all orders
  const allOrders = [...activeOrders, ...historicalOrders];

  return (
    <TabLayout 
      title="Ärenden" 
      count={allOrders.length}
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
        
        <div key={refreshKey}>
          {allOrders.length > 0 ? (
            <OrdersTable orders={allOrders} />
          ) : (
            <p className="text-slate-500 p-2">Inga ärenden.</p>
          )}
        </div>
      </div>
    </TabLayout>
  );
}
