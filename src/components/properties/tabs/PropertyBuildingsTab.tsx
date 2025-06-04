
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyBuildingsList } from "@/components/properties";
import type { Building } from "@/types/api";

interface PropertyBuildingsTabProps {
  buildings: Building[];
}

export const PropertyBuildingsTab = ({ buildings }: PropertyBuildingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Byggnader</CardTitle>
      </CardHeader>
      <PropertyBuildingsList buildings={buildings} />
    </Card>
  );
};
