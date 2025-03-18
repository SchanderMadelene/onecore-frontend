
import { Card, CardContent } from "@/components/ui/card";
import { MaintenanceUnit } from "@/types/api";
import { Calendar, Construction, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyMaintenanceUnitsTabProps {
  maintenanceUnits?: MaintenanceUnit[];
}

export const PropertyMaintenanceUnitsTab = ({ maintenanceUnits }: PropertyMaintenanceUnitsTabProps) => {
  if (!maintenanceUnits || maintenanceUnits.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-muted-foreground">
          Inga underhållsenheter registrerade för denna fastighet
        </h3>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aktiv":
        return "bg-green-500";
      case "Under renovering":
        return "bg-orange-500";
      case "Planerad":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Miljöbod":
        return <div className="p-2 bg-green-100 rounded-full"><Construction className="h-5 w-5 text-green-600" /></div>;
      case "Tvättstuga":
        return <div className="p-2 bg-blue-100 rounded-full"><Construction className="h-5 w-5 text-blue-600" /></div>;
      case "Undercentral":
        return <div className="p-2 bg-orange-100 rounded-full"><Construction className="h-5 w-5 text-orange-600" /></div>;
      default:
        return <div className="p-2 bg-gray-100 rounded-full"><Info className="h-5 w-5 text-gray-600" /></div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {maintenanceUnits.map((unit) => (
          <Card key={unit.id} className="hover-transform">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {getTypeIcon(unit.type)}
                  <div>
                    <h3 className="font-semibold text-lg">{unit.name}</h3>
                    <p className="text-sm text-muted-foreground">{unit.type}</p>
                  </div>
                </div>
                <Badge variant="outline" className={`${getStatusColor(unit.status)} text-white`}>
                  {unit.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Area</p>
                  <p className="font-medium">{unit.area} m²</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Byggnadsår</p>
                  <p className="font-medium">{unit.constructionYear}</p>
                </div>
              </div>
              
              {unit.lastRenovated && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Senast renoverad: {unit.lastRenovated}</span>
                </div>
              )}
              
              {unit.description && (
                <div className="pt-2 border-t">
                  <p className="text-sm">{unit.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
