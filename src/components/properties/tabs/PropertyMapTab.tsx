import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";
import { PropertyMapView } from "@/components/properties";
import type { PropertyDetail } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface PropertyMapTabProps {
  propertyDetail: PropertyDetail;
}
export const PropertyMapTab = ({
  propertyDetail
}: PropertyMapTabProps) => {
  return <Card>
      <CardHeader>
        <CardTitle>Ritningar</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mark" className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full mb-6">
            <TabsTrigger value="mark" className="text-xs md:text-sm">
              Mark
            </TabsTrigger>
            <TabsTrigger value="byggnader" className="text-xs md:text-sm">
              Byggnader
            </TabsTrigger>
            <TabsTrigger value="brand" className="text-xs md:text-sm">
              Brand
            </TabsTrigger>
            <TabsTrigger value="el" className="text-xs md:text-sm">
              El
            </TabsTrigger>
            <TabsTrigger value="ventilation" className="text-xs md:text-sm">
              Ventilation
            </TabsTrigger>
            <TabsTrigger value="vvs" className="text-xs md:text-sm">
              VVS
            </TabsTrigger>
            <TabsTrigger value="drift" className="text-xs md:text-sm whitespace-normal h-auto py-2">DU-handlingar</TabsTrigger>
            <TabsTrigger value="bofaktablad" className="text-xs md:text-sm whitespace-normal h-auto py-2">
              Bofaktablad för alla lägenheter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mark">
            {propertyDetail.propertyMap ? <PropertyMapView propertyDetail={propertyDetail} /> : <EmptyDrawingState label="Mark" />}
          </TabsContent>
          
          <TabsContent value="byggnader">
            <EmptyDrawingState label="Byggnader" />
          </TabsContent>
          
          <TabsContent value="brand">
            <EmptyDrawingState label="Brand" />
          </TabsContent>
          
          <TabsContent value="el">
            <EmptyDrawingState label="El" />
          </TabsContent>
          
          <TabsContent value="ventilation">
            <EmptyDrawingState label="Ventilation" />
          </TabsContent>
          
          <TabsContent value="vvs">
            <EmptyDrawingState label="VVS" />
          </TabsContent>
          
          <TabsContent value="drift">
            <EmptyDrawingState label="Drift och underhållshandlingar" />
          </TabsContent>
          
          <TabsContent value="bofaktablad">
            <EmptyDrawingState label="Bofaktablad för alla lägenheter" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>;
};
const EmptyDrawingState = ({
  label
}: {
  label: string;
}) => {
  return <div className="border rounded-lg p-6 text-center">
      <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">Ritningar saknas</h3>
      <p className="text-muted-foreground">
        Ritningar för {label} finns inte tillgängliga för denna fastighet.
      </p>
    </div>;
};