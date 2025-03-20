
import { Building, Apartment } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DoorOpen, Home, User, AlertCircle } from "lucide-react";
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
      <div className="py-8 text-center">
        <DoorOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">Inga uppgångar</h3>
        <p className="text-muted-foreground">
          Det finns inga uppgångar registrerade för denna byggnad.
        </p>
      </div>
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
          <div key={entrance.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 border-b bg-background">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <DoorOpen className="h-5 w-5 text-primary" />
                  {entrance.name}
                </div>
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                  {entrance.apartments.length} lgh
                </span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {entrance.apartments.map(aptId => {
                const apartment = getApartment(aptId);
                
                return apartment ? (
                  <div key={aptId} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{apartment.code}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{apartment.area}m² • {apartment.rooms} rum</span>
                      <Link to={`${basePath}/${apartment.id}`}>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <User className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div key={aptId} className="flex justify-between items-center p-2 rounded-md border border-destructive/30 bg-destructive/5">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      <span className="text-muted-foreground">Lägenhet saknas (ID: {aptId})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
