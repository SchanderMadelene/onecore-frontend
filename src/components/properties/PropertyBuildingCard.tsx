
import type { Building } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{building.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleOpenBuilding}
          className="w-full justify-between"
        >
          Visa detaljer
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
