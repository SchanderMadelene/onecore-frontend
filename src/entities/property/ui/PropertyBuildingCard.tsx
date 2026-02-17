import type { Building } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

interface PropertyBuildingCardProps {
  building: Building;
}

export const PropertyBuildingCard = ({ building }: PropertyBuildingCardProps) => {
  const navigate = useNavigate();
  const { property } = useParams();
  
  const handleOpenBuilding = () => {
    // Create a URL-friendly building name
    const buildingSlug = building.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/properties/${property}/${buildingSlug}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{building.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleOpenBuilding}
        >
          Öppna byggnad
        </Button>
      </CardContent>
    </Card>
  );
};
