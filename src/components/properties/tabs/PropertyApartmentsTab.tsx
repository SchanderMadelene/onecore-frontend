
import { DoorOpen, Home } from "lucide-react";
import type { Building } from "@/types/api";

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
          <div key={apartment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold">{apartment.code}</h3>
            <p className="text-sm text-muted-foreground">{building.name}</p>
            <div className="mt-2 text-sm">
              <div className="flex justify-between">
                <span>Area:</span>
                <span>{apartment.area} m²</span>
              </div>
              <div className="flex justify-between">
                <span>Rum:</span>
                <span>{apartment.rooms}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span>{apartment.status}</span>
              </div>
            </div>
          </div>
        ))
      )}
      {totalApartments === 0 && (
        <div className="col-span-3 border rounded-lg p-6 text-center">
          <Home className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Inga lägenheter</h3>
          <p className="text-muted-foreground">
            Det finns inga lägenheter registrerade för denna fastighet.
          </p>
        </div>
      )}
    </div>
  );
};
