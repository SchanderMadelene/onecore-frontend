
import { OrdersManagement } from "@/components/residence/OrdersManagement";
import { useParams } from "react-router-dom";

interface PropertyOrdersTabProps {
  propertyDetail: any;
}

export const PropertyOrdersTab = ({ propertyDetail }: PropertyOrdersTabProps) => {
  const { property } = useParams<{ property: string }>();
  
  // Use property directly as the property ID
  const propertyId = property || propertyDetail.id || "property-default";
  
  console.log("PropertyOrdersTab - Using propertyId:", propertyId);
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3">Ärenden för fastighet</h3>
      <OrdersManagement 
        contextType="residence" 
        residenceId={propertyId}
      />
    </div>
  );
};
