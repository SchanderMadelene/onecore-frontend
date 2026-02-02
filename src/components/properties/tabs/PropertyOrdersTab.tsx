
import { OrdersManagement } from "@/features/residences/components/OrdersManagement";
import { TabLayout } from "@/components/ui/tab-layout";
import { MessageSquare } from "lucide-react";
import { useParams } from "react-router-dom";

interface PropertyOrdersTabProps {
  propertyDetail: any;
}

export const PropertyOrdersTab = ({ propertyDetail }: PropertyOrdersTabProps) => {
  // Use the actual property ID from the propertyDetail object
  const propertyId = propertyDetail?.id || "1";
  
  return (
    <TabLayout 
      title="Ärenden för fastighet" 
      showCard={true}
    >
      <OrdersManagement 
        contextType="residence" 
        residenceId={propertyId}
      />
    </TabLayout>
  );
};
