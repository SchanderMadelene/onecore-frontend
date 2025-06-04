
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrdersManagement } from "@/components/residence/OrdersManagement";
import { useParams } from "react-router-dom";

interface PropertyOrdersTabProps {
  propertyDetail: any;
}

export const PropertyOrdersTab = ({ propertyDetail }: PropertyOrdersTabProps) => {
  const { city, district, property } = useParams<{ city: string; district: string; property: string }>();
  
  // Skapa property ID från URL-parametrarna för att matcha residenceId i mock data
  const propertyId = city && district && property 
    ? `${city}/${district}/${property}`
    : propertyDetail.id || "property-default";
  
  console.log("PropertyOrdersTab - Using propertyId:", propertyId);
  
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
