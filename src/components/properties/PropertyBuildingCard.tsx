
import type { Building } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

interface PropertyBuildingCardProps {
  building: Building;
}

export const PropertyBuildingCard = ({ building }: PropertyBuildingCardProps) => {
  const navigate = useNavigate();
  const { city, district, property } = useParams();
  
  const handleOpenBuilding = () => {
    // Create a URL-friendly building name
    const buildingSlug = building.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/properties/${city}/${district}/${property}/${buildingSlug}`);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{building.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleOpenBuilding}
          className="w-full"
        >
          Öppna byggnad
        </Button>
      </CardContent>
    </Card>
  );
};
