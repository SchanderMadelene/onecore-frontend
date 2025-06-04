
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrdersManagement } from "@/components/residence/OrdersManagement";

interface PropertyOrdersTabProps {
  propertyDetail: any;
}

export const PropertyOrdersTab = ({ propertyDetail }: PropertyOrdersTabProps) => {
  // Use the property ID as residence context for orders
  const propertyId = propertyDetail.id || "property-default";
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Ärenden för fastighet</CardTitle>
      </CardHeader>
      <CardContent>
        <OrdersManagement 
          contextType="residence" 
          residenceId={propertyId}
        />
      </CardContent>
    </Card>
  );
};
