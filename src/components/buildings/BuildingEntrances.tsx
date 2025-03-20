
import { Building, Apartment } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BuildingEntrancesProps {
  building: Building;
  basePath: string;
}

export const BuildingEntrances = ({ building, basePath }: BuildingEntrancesProps) => {
  // Return early if no entrances
  if (!building.entrances || building.entrances.length === 0) {
    return (
      <Card className="mt-8">
        <CardContent className="pt-6 text-center">
          <h3 className="text-xl font-medium mb-2">Inga uppgångar</h3>
          <p className="text-muted-foreground">
            Det finns inga uppgångar registrerade för denna byggnad.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Function to find apartment by ID
  const getApartment = (id: string): Apartment | undefined => {
    return building.apartments?.find(apt => apt.id === id);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Uppgångar</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {building.entrances.map(entrance => (
          <Card key={entrance.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {entrance.name}
                </div>
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                  {entrance.apartments.length} lgh
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {entrance.apartments.map(aptId => {
                  const apartment = getApartment(aptId);
                  
                  return apartment ? (
                    <div key={aptId} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 transition-colors">
                      <div>
                        <span className="font-medium">{apartment.code}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{apartment.area}m² • {apartment.rooms} rum</span>
                        <Link to={`${basePath}/${apartment.id}`}>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <span className="sr-only">View details</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div key={aptId} className="flex justify-between items-center p-2 rounded-md border border-destructive/30 bg-destructive/5">
                      <div>
                        <span className="text-muted-foreground">Lägenhet saknas (ID: {aptId})</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
