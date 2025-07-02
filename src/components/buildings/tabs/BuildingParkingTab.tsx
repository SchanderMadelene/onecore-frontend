
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Warehouse, Home, ParkingCircle } from "lucide-react";
import type { Building, ParkingType } from "@/types/api";

interface BuildingParkingTabProps {
  building: Building;
}

const getParkingIcon = (type: ParkingType) => {
  switch (type) {
    case "Garage":
      return <Warehouse className="h-4 w-4 text-blue-600" />;
    case "Car ports":
      return <Home className="h-4 w-4 text-green-600" />;
    case "Centralgarage":
      return <Warehouse className="h-4 w-4 text-purple-600" />;
    case "Utomhusparkering":
      return <ParkingCircle className="h-4 w-4 text-gray-600" />;
    default:
      return <Car className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusBadge = (status: string) => {
  const variant = status === "Tillgänglig" ? "default" : 
                  status === "Full" ? "destructive" : "secondary";
  
  return <Badge variant={variant} className="text-xs">{status}</Badge>;
};

export const BuildingParkingTab = ({ building }: BuildingParkingTabProps) => {
  const parking = building.parking || [];

  if (parking.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-medium mb-2">Ingen parkering</h3>
            <p className="text-muted-foreground">
              Det finns inga parkeringsplatser registrerade för denna byggnad ännu.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalSpaces = parking.reduce((sum, area) => sum + area.spaces, 0);
  const totalAvailable = parking.reduce((sum, area) => sum + (area.availableSpaces || 0), 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{totalSpaces}</div>
            <p className="text-xs text-muted-foreground">Totalt antal platser</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{totalAvailable}</div>
            <p className="text-xs text-muted-foreground">Lediga platser</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-red-600">{totalSpaces - totalAvailable}</div>
            <p className="text-xs text-muted-foreground">Upptagna platser</p>
          </CardContent>
        </Card>
      </div>

      {/* Parking areas */}
      <div className="grid gap-4">
        {parking.map(area => (
          <Card key={area.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getParkingIcon(area.type)}
                  <CardTitle className="text-lg">{area.name}</CardTitle>
                </div>
                {getStatusBadge(area.status)}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {area.description && (
                <p className="text-sm text-muted-foreground mb-4">
                  {area.description}
                </p>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Typ:</span>
                  <span className="ml-1">{area.type}</span>
                </div>
                <div>
                  <span className="font-medium">Totalt:</span>
                  <span className="ml-1">{area.spaces} platser</span>
                </div>
                <div>
                  <span className="font-medium">Lediga:</span>
                  <span className="ml-1">{area.availableSpaces || 0} platser</span>
                </div>
                {area.monthlyRent && (
                  <div>
                    <span className="font-medium">Hyra:</span>
                    <span className="ml-1">{area.monthlyRent} kr/månad</span>
                  </div>
                )}
              </div>

              {area.features && area.features.length > 0 && (
                <div className="mt-3">
                  <span className="text-sm font-medium">Funktioner:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {area.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
