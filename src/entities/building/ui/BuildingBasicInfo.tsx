
import { Building } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleInfoCard } from "@/components/ui/collapsible-info-card";

interface BuildingBasicInfoProps {
  building: Building;
  propertyName?: string;
  address?: string;
  objectNumber?: string;
}

export const BuildingBasicInfo = ({ 
  building, 
  propertyName, 
  address,
  objectNumber
}: BuildingBasicInfoProps) => {
  // Calculate total apartments across all entrances
  const totalApartments = building.entrances?.reduce((total, entrance) => 
    total + (entrance.apartments?.length || 0), 0) || 0;

  // Calculate total number of spaces/premises
  const totalSpaces = building.spaces?.length || 0;

  // Preview content for mobile
  const previewContent = (
    <div className="space-y-2">
      <div>
        <span className="text-sm text-muted-foreground">Objektsnummer: </span>
        <span className="font-medium">{objectNumber || building.id}</span>
      </div>
      <div>
        <span className="text-sm text-muted-foreground">Fastighet: </span>
        <span className="font-medium">{propertyName || "Okänd fastighet"}</span>
      </div>
    </div>
  );

  // All building information fields
  const allInfoContent = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {/* Grupp 1 - Identifiering */}
      <div>
        <p className="text-sm text-muted-foreground">Objektsnummer</p>
        <p className="font-medium">{objectNumber || building.id}</p>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground">Fastighet</p>
        <p className="font-medium">{propertyName || "Okänd fastighet"}</p>
      </div>
      
      {address && (
        <div>
          <p className="text-sm text-muted-foreground">Adress</p>
          <p className="font-medium">{address}</p>
        </div>
      )}
      
      {/* Grupp 2 - Byggnadsegenskaper */}
      <div>
        <p className="text-sm text-muted-foreground">Byggnadstyp</p>
        <p className="font-medium">{building.type}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Byggnadsår</p>
        <p className="font-medium">{building.constructionYear || "Ej angivet"}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Ombyggnadsår</p>
        <p className="font-medium">{building.renovationYear || "-"}</p>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground">Allmän yta</p>
        <p className="font-medium">{building.area} m²</p>
      </div>

      {/* Grupp 3 - Innehåll/Kapacitet */}
      <div>
        <p className="text-sm text-muted-foreground">Antal lägenheter</p>
        <p className="font-medium">{totalApartments}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Antal lokaler</p>
        <p className="font-medium">{totalSpaces}</p>
      </div>
    </div>
  );

  return (
    <CollapsibleInfoCard
      title="Grundläggande information"
      previewContent={previewContent}
    >
      {allInfoContent}
    </CollapsibleInfoCard>
  );
};
