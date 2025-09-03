import { OrdersManagement } from "@/components/residence/OrdersManagement";
import { TabLayout } from "@/components/ui/tab-layout";
import { MessageSquare } from "lucide-react";
import type { Building } from "@/types/api";

interface BuildingOrdersTabProps {
  building: Building;
}

export const BuildingOrdersTab = ({ building }: BuildingOrdersTabProps) => {
  return (
    <TabLayout 
      title="Ärenden för byggnad" 
      icon={MessageSquare}
      showCard={false}
    >
      <OrdersManagement 
        contextType="building" 
        residenceId={building.id}
      />
    </TabLayout>
  );
};