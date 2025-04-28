
import { Card, CardContent } from "@/components/ui/card";
import type { Building } from "@/types/api";

interface PropertyResidenceTabProps {
  buildings: Building[];
}

export const PropertyResidenceTab = ({ buildings }: PropertyResidenceTabProps) => {
  // Count total entrances across all buildings
  const totalEntrances = buildings.reduce((total, building) => 
    total + (building.entrances?.length || 0), 0);

  return (
    <div className="space-y-6">
      {buildings.map(building => (
        building.entrances && building.entrances.length > 0 && (
          <div key={building.id} className="space-y-4">
            <h3 className="text-lg font-semibold">{building.name}</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {building.entrances.map(entrance => (
                <Card key={entrance.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-medium">Port {entrance.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {entrance.apartments.length} lgh
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {building.name}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      ))}
      
      {totalEntrances === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-medium mb-2">Inga portar</h3>
            <p className="text-muted-foreground">
              Det finns inga portar registrerade för denna fastighet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
