
import { Building, ApartmentType } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BuildingEntranceHierarchyProps {
  building: Building;
  basePath: string;
}

// Helper function to get status badge color
const getStatusBadge = (status?: string) => {
  if (!status) return null;
  
  const variant = status === "Aktiv" ? "default" : 
                  status === "Under underhåll" ? "secondary" : "destructive";
  
  return <Badge variant={variant} className="text-xs">{status}</Badge>;
};

// Helper function to get apartment type styling
const getApartmentTypeStyle = (type?: ApartmentType) => {
  switch (type) {
    case "Övernattning":
      return "border-l-4 border-blue-500 bg-blue-50";
    case "Korttidsboende":
      return "border-l-4 border-yellow-500 bg-yellow-50";
    default:
      return "";
  }
};

export const BuildingEntranceHierarchy = ({
  building,
  basePath
}: BuildingEntranceHierarchyProps) => {
  // Return early if no entrances
  if (!building.entrances || building.entrances.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium mb-2">Inga uppgångar</h3>
        <p className="text-muted-foreground">
          Det finns inga uppgångar registrerade för denna byggnad.
        </p>
      </div>
    );
  }

  // Function to find apartment by ID
  const getApartment = (id: string) => {
    return building.apartments?.find(apt => apt.id === id);
  };

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="space-y-2">
        {building.entrances.map(entrance => (
          <AccordionItem 
            key={entrance.id} 
            value={entrance.id}
            className="rounded-lg border border-slate-200 bg-white"
          >
            <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{entrance.name}</span>
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent>
              <div className="px-3 sm:px-4 pb-4 pt-1 space-y-4">
                {/* Direct apartments */}
                <div className="p-2">
                  <div className="space-y-2">
                    {entrance.apartments.map(aptId => {
                      const apartment = getApartment(aptId);
                      return apartment ? (
                        <div key={aptId} className={`flex justify-between items-center p-2 rounded-md hover:bg-muted/50 transition-colors ${getApartmentTypeStyle(apartment.apartmentType)}`}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{apartment.code}</span>
                            {apartment.apartmentType && apartment.apartmentType !== "Standard" && (
                              <Badge variant="outline" className="text-xs">
                                {apartment.apartmentType}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{apartment.size}m² • {apartment.rooms} rum</span>
                            <Link to={`${basePath}/${apartment.id}`}>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div key={aptId} className="flex justify-between items-center p-2 rounded-md border border-destructive/20 bg-destructive/5">
                          <span className="text-muted-foreground text-sm">Lägenhet saknas (ID: {aptId})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
