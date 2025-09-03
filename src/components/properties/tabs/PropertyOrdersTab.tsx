
import { OrdersManagement } from "@/components/residence/OrdersManagement";
import { TabLayout } from "@/components/ui/tab-layout";
import { MessageSquare } from "lucide-react";
import { useParams } from "react-router-dom";

interface PropertyOrdersTabProps {
  propertyDetail: any;
}

export const PropertyOrdersTab = ({ propertyDetail }: PropertyOrdersTabProps) => {
  const { property } = useParams<{ property: string }>();
  
  // Use property directly as the property ID
  const propertyId = property || propertyDetail.id || "property-default";
  
  return (
    <TabLayout 
      title="Ärenden för fastighet" 
      icon={MessageSquare}
      showCard={false}
    >
      <OrdersManagement 
        contextType="residence" 
        residenceId={propertyId}
      />
    </TabLayout>
  );
};
