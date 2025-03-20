
import { DoorOpen, Home } from "lucide-react";
import type { Building } from "@/types/api";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyApartmentsTabProps {
  buildings: Building[];
}

export const PropertyApartmentsTab = ({ buildings }: PropertyApartmentsTabProps) => {
  // Count total apartments across all buildings
  const totalApartments = buildings.reduce((total, building) => 
    total + (building.apartments?.length || 0), 0);

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {buildings.flatMap(building => 
        (building.apartments || []).map(apartment => (
          <Card key={apartment.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{apartment.code}</CardTitle>
                <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded-full">
                  {apartment.area} m² • {apartment.rooms} rum
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{building.name}</p>
            </CardHeader>
            <CardContent className="flex justify-end pt-4">
              <Button variant="ghost" size="sm" className="h-7 w-7">
                <User className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))
      )}
      {totalApartments === 0 && (
        <div className="col-span-3">
          <Card>
            <CardContent className="pt-6 text-center">
              <Home className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Inga lägenheter</h3>
              <p className="text-muted-foreground">
                Det finns inga lägenheter registrerade för denna fastighet.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
