
import type { Building } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { Settings, Car, Lock, Wrench, Waves } from "lucide-react";

interface PropertyBuildingCardProps {
  building: Building;
}

// Helper function to get icon for installation type
const getInstallationIcon = (type: string) => {
  switch (type) {
    case "Lås & Passage":
      return <Lock className="h-3 w-3" />;
    case "Hissar":
      return <Settings className="h-3 w-3" />;
    case "VVS":
      return <Waves className="h-3 w-3" />;
    default:
      return <Wrench className="h-3 w-3" />;
  }
};

export const PropertyBuildingCard = ({ building }: PropertyBuildingCardProps) => {
  const navigate = useNavigate();
  const { property } = useParams();
  
  const handleOpenBuilding = () => {
    // Create a URL-friendly building name
    const buildingSlug = building.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/properties/${property}/${buildingSlug}`);
  };

  const totalParkingSpaces = building.parking?.reduce((total, p) => total + p.spaces, 0) || 0;
  const activeInstallations = building.installations?.filter(i => i.status === "Aktiv").length || 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{building.name}</CardTitle>
        <div className="text-sm text-muted-foreground">
          {building.constructionYear} • {building.area} m² • {building.units} lägenheter
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        {/* Installations info */}
        {building.installations && building.installations.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm font-medium">
              <Settings className="h-4 w-4" />
              Installationer ({activeInstallations} aktiva)
            </div>
            <div className="flex flex-wrap gap-1">
              {building.installations.map(installation => (
                <Badge 
                  key={installation.id} 
                  variant={installation.status === "Aktiv" ? "default" : "secondary"}
                  className="text-xs flex items-center gap-1"
                >
                  {getInstallationIcon(installation.type)}
                  {installation.type}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Parking info */}
        {building.parking && building.parking.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm font-medium">
              <Car className="h-4 w-4" />
              Parkering ({totalParkingSpaces} platser)
            </div>
            <div className="flex flex-wrap gap-1">
              {building.parking.map(parking => (
                <Badge 
                  key={parking.id} 
                  variant="outline" 
                  className="text-xs"
                >
                  {parking.type}: {parking.spaces} platser
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Button 
          variant="outline" 
          size="sm"
          onClick={handleOpenBuilding}
          className="w-full"
        >
          Öppna byggnad
        </Button>
      </CardContent>
    </Card>
  );
};
