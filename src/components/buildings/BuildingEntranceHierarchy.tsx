
import { Building, Entrance, EntranceAddress, EntranceComponent, ComponentType, ApartmentType } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, Home, Monitor, Mail, Package, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { ComponentCard } from "@/components/design-system/showcase/cards/ComponentCard";

interface BuildingEntranceHierarchyProps {
  building: Building;
  basePath: string;
}

// Helper function to get icon for component type
const getComponentIcon = (type: ComponentType) => {
  switch (type) {
    case "Digital bokningstavla":
      return <Monitor className="h-4 w-4 text-blue-600" />;
    case "Postboxar":
    case "Brevlådor":
      return <Mail className="h-4 w-4 text-green-600" />;
    case "Cykelrum":
    case "Barnvagnsförvaring":
    case "Soprum":
      return <Package className="h-4 w-4 text-gray-600" />;
    case "El-mätare":
    case "Värme-mätare":
    case "Ventilation":
      return <Wrench className="h-4 w-4 text-orange-600" />;
    default:
      return <Package className="h-4 w-4 text-gray-600" />;
  }
};

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
      <Accordion type="multiple" className="space-y-4">
        {building.entrances.map(entrance => (
          <AccordionItem key={entrance.id} value={entrance.id} className="rounded-lg border border-slate-200 bg-white">
            <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
              <div className="flex justify-between items-center w-full mr-4">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{entrance.name}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  {entrance.components && entrance.components.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {entrance.components.length} komponenter
                    </Badge>
                  )}
                  <Badge className="text-xs">
                    {entrance.addresses?.reduce((total, addr) => total + addr.apartments.length, 0) || entrance.apartments.length} lgh
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent>
              <div className="px-4 pb-4 space-y-4">
                {/* Direct apartments */}
                <div className="bg-white rounded-lg border border-slate-200 p-3">
                  <div className="space-y-2">
                    {entrance.apartments.map(aptId => {
                      const apartment = getApartment(aptId);
                      return apartment ? (
                        <div key={aptId} className={`flex justify-between items-center p-2 rounded-md hover:bg-slate-50 transition-colors border border-slate-100 ${getApartmentTypeStyle(apartment.apartmentType)}`}>
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4 text-slate-600" />
                            <span className="font-medium">{apartment.code}</span>
                            {apartment.apartmentType && apartment.apartmentType !== "Standard" && (
                              <Badge variant="outline" className="text-xs">
                                {apartment.apartmentType}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{apartment.area}m² • {apartment.rooms} rum</span>
                            <Link to={`${basePath}/${apartment.id}`}>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div key={aptId} className="flex justify-between items-center p-2 rounded-md border border-destructive/30 bg-destructive/5">
                          <span className="text-muted-foreground">Lägenhet saknas (ID: {aptId})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Components */}
                {entrance.components && entrance.components.length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-3">
                    <h5 className="text-sm font-medium text-slate-700 mb-3">Komponenter</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {entrance.components.map(component => (
                        <ComponentCard
                          key={component.id}
                          title={component.name}
                          description={component.description}
                          type={component.type}
                          location={entrance.name}
                          specs={[
                            { label: "Status", value: component.status || "Aktiv" }
                          ]}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
