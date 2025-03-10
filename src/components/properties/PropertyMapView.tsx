
import type { PropertyDetail } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyMap } from "./PropertyMap";

interface PropertyMapViewProps {
  propertyDetail: PropertyDetail;
}

export const PropertyMapView = ({ propertyDetail }: PropertyMapViewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fastighetsritning</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Ritningen visar fastighetens byggnader och placering. Hovra över byggnaderna för detaljer.
        </p>
        
        {propertyDetail.propertyMap && (
          <PropertyMap 
            propertyMap={propertyDetail.propertyMap} 
            buildings={propertyDetail.buildings} 
          />
        )}
      </CardContent>
    </Card>
  );
};
