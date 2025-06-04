
import type { Building } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyApartmentsTabProps {
  buildings: Building[];
}

export const PropertyApartmentsTab = ({ buildings }: PropertyApartmentsTabProps) => {
  // Count total apartments across all buildings
  const totalApartments = buildings.reduce((total, building) => 
    total + (building.apartments?.length || 0), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lägenheter</CardTitle>
      </CardHeader>
      <CardContent>
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
                  <Button variant="ghost" size="sm" className="h-7 w-7" />
                </CardContent>
              </Card>
            ))
          )}
          {totalApartments === 0 && (
            <div className="col-span-3">
              <Card>
                <CardContent className="pt-6 text-center">
                  <h3 className="text-xl font-medium mb-2">Inga lägenheter</h3>
                  <p className="text-muted-foreground">
                    Det finns inga lägenheter registrerade för denna fastighet.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
