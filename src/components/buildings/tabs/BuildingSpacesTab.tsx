
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  MoveUp, 
  Mountain, 
  TreePine, 
  Archive, 
  Building2, 
  Shield, 
  Package, 
  Shirt, 
  Recycle, 
  Settings 
} from "lucide-react";
import type { Building, SpaceType } from "@/types/api";
import { ComponentCard } from "@/components/design-system/showcase/cards/ComponentCard";

interface BuildingSpacesTabProps {
  building: Building;
}

// Helper function to get icon for space type
const getSpaceIcon = (type: SpaceType) => {
  switch (type) {
    case "Trapphus":
      return <MoveUp className="h-4 w-4 text-blue-600" />;
    case "Vind":
      return <Mountain className="h-4 w-4 text-gray-600" />;
    case "Terrasser":
      return <TreePine className="h-4 w-4 text-green-600" />;
    case "Källare":
      return <Archive className="h-4 w-4 text-gray-700" />;
    case "Lokaler":
      return <Building2 className="h-4 w-4 text-blue-700" />;
    case "Skyddsrum i byggnaden":
      return <Shield className="h-4 w-4 text-red-600" />;
    case "Förråd i byggnaden":
      return <Package className="h-4 w-4 text-orange-600" />;
    case "Tvättstugor i byggnaden":
      return <Shirt className="h-4 w-4 text-cyan-600" />;
    case "Miljöbodar i byggnaden":
      return <Recycle className="h-4 w-4 text-green-700" />;
    case "Teknikutrymmen":
      return <Settings className="h-4 w-4 text-purple-600" />;
    default:
      return <Building2 className="h-4 w-4 text-gray-600" />;
  }
};

// Helper function to get status badge
const getStatusBadge = (status?: string) => {
  if (!status) return null;
  
  const variant = status === "Aktiv" ? "default" : 
                  status === "Under underhåll" ? "secondary" : "destructive";
  
  return <Badge variant={variant} className="text-xs">{status}</Badge>;
};

// Mock data för demonstration - this would come from API
const mockSpaces = [
  {
    id: "1",
    type: "Trapphus" as SpaceType,
    name: "Trapphus A-C",
    totalArea: 45,
    components: [
      {
        id: "1a",
        name: "Trappor",
        description: "Betongtrappor med räcke",
        area: 30,
        status: "Aktiv" as const,
        specs: { material: "Betong", "Antal våningar": "5" }
      },
      {
        id: "1b", 
        name: "Väggar",
        description: "Målade väggar",
        area: 15,
        status: "Aktiv" as const,
        specs: { färg: "Vit", "Senast målat": "2022" }
      }
    ]
  },
  {
    id: "2",
    type: "Vind" as SpaceType,
    name: "Vindsutrymme",
    totalArea: 120,
    components: [
      {
        id: "2a",
        name: "Förvaringsutrymme",
        description: "Öppet förvaringsutrymme för hyresgäster",
        area: 80,
        status: "Aktiv" as const,
        specs: { "Antal platser": "24", tillgänglighet: "Hyresgäster" }
      },
      {
        id: "2b",
        name: "Ventilation",
        description: "Vindventilation",
        area: 40,
        status: "Under underhåll" as const,
        specs: { typ: "Naturlig", "Senast service": "2023-08" }
      }
    ]
  },
  {
    id: "3",
    type: "Källare" as SpaceType,
    name: "Källarutrymmen",
    totalArea: 200,
    components: [
      {
        id: "3a",
        name: "Förråd",
        description: "Individuella förråd för hyresgäster",
        area: 120,
        status: "Aktiv" as const,
        specs: { "Antal förråd": "18", låstyp: "Hänglås" }
      },
      {
        id: "3b",
        name: "Teknikrum",
        description: "Fastighetsrum för teknik",
        area: 80,
        status: "Aktiv" as const,
        specs: { innehåll: "Värmepump, El", säkerhet: "Låst" }
      }
    ]
  },
  {
    id: "4",
    type: "Tvättstugor i byggnaden" as SpaceType,
    name: "Tvättstuga",
    totalArea: 25,
    components: [
      {
        id: "4a",
        name: "Tvättmaskiner",
        description: "4 tvättmaskiner",
        status: "Aktiv" as const,
        specs: { antal: "4", märke: "Electrolux", "Senast service": "2024-01" }
      },
      {
        id: "4b",
        name: "Torktumlare",
        description: "2 torktumlare",
        status: "Aktiv" as const,
        specs: { antal: "2", märke: "Electrolux", "Senast service": "2024-01" }
      }
    ]
  },
  {
    id: "5",
    type: "Miljöbodar i byggnaden" as SpaceType,
    name: "Miljöstation",
    totalArea: 15,
    components: [
      {
        id: "5a",
        name: "Sopcontainers",
        description: "Containers för olika fraktioner",
        status: "Aktiv" as const,
        specs: { "Antal containers": "6", fraktioner: "Restavfall, Papper, Plast" }
      }
    ]
  }
];

export const BuildingSpacesTab = ({ building }: BuildingSpacesTabProps) => {
  // Use mock data for now - in real implementation this would come from building.spaces
  const spaces = building.spaces || mockSpaces;

  if (!spaces || spaces.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium mb-2">Inga utrymmen</h3>
        <p className="text-muted-foreground">
          Det finns inga utrymmen registrerade för denna byggnad.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="space-y-2">
        {spaces.map(space => (
          <AccordionItem 
            key={space.id} 
            value={space.id}
            className="rounded-lg border border-slate-200 bg-white"
          >
            <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  {getSpaceIcon(space.type)}
                  <span className="font-medium">{space.name}</span>
                  {space.totalArea && (
                    <span className="text-sm text-muted-foreground">({space.totalArea} m²)</span>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent>
              <div className="px-3 sm:px-4 pb-4 pt-1 space-y-4">
                {space.components && space.components.length > 0 ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {space.components.map(component => (
                        <ComponentCard
                          key={component.id}
                          title={component.name}
                          description={component.description}
                          type={space.name}
                          specs={[
                            { label: "Status", value: component.status || "Aktiv" },
                            ...(component.area ? [{ label: "Yta", value: `${component.area} m²` }] : []),
                            ...(component.specs ? Object.entries(component.specs).map(([key, value]) => ({
                              label: key,
                              value: String(value)
                            })) : [])
                          ]}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground p-2">
                    Inga komponenter registrerade för detta utrymme.
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
