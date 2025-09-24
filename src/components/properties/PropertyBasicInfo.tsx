import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleInfoCard } from "@/components/ui/collapsible-info-card";
import type { PropertyDetail } from "@/types/api";
interface PropertyBasicInfoProps {
  propertyDetail: PropertyDetail;
  showBasicInfoOnly?: boolean;
  showDetailedInfo?: boolean;
}
export const PropertyBasicInfo = ({
  propertyDetail,
  showBasicInfoOnly = false,
  showDetailedInfo = false
}: PropertyBasicInfoProps) => {
  // Extract the current route information from the window location
  const routeParts = window.location.pathname.split('/');
  const propertyKey = routeParts.slice(2).join('/');

  // Preview content for mobile
  const previewContent = (
    <div className="space-y-2">
      <div>
        <span className="text-sm text-muted-foreground">Fastighetsnummer: </span>
        <span className="font-medium">{propertyDetail.propertyNumber}</span>
      </div>
      <div>
        <span className="text-sm text-muted-foreground">Adress: </span>
        <span className="font-medium">{propertyDetail.address || "-"}</span>
      </div>
    </div>
  );

  // All property information fields
  const allInfoContent = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <div>
        <p className="text-sm text-muted-foreground">Fastighetsbeteckning</p>
        <p className="font-medium">{propertyDetail.designation}</p>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground">Fastighetsnummer</p>
        <p className="font-medium">{propertyDetail.propertyNumber}</p>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground">Kommun</p>
        <p className="font-medium">{propertyDetail.municipality}</p>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground">Distrikt</p>
        <p className="font-medium">{propertyDetail.district || "-"}</p>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground">Församling</p>
        <p className="font-medium">{propertyDetail.parish}</p>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground">Stadsdel/Marknadsområde</p>
        <p className="font-medium">{propertyDetail.marketArea || "-"}</p>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground">Förvaltare/kvartersvärd</p>
        <p className="font-medium">{propertyDetail.propertyManager || "-"}</p>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground">Adress</p>
        <p className="font-medium">{propertyDetail.address || "-"}</p>
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Fastighetsstatus</p>
        <p className="font-medium">Aktiv</p>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground">Antal byggnader</p>
        <p className="font-medium">{propertyDetail.buildings.length}</p>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground">Byggnadsår</p>
        <p className="font-medium">
          {propertyDetail.buildings.length > 0 ? propertyDetail.buildings[0].constructionYear : "-"}
        </p>
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground">Ombyggnadsår</p>
        <p className="font-medium">
          {propertyDetail.buildings.length > 0 && propertyDetail.buildings[0].renovationYear 
            ? propertyDetail.buildings[0].renovationYear 
            : "-"}
        </p>
      </div>
    </div>
  );

  // Basic information card that should always show at the top
  const renderBasicInfoCard = () => (
    <div className="mb-6">
      <CollapsibleInfoCard
        title="Grundläggande information"
        previewContent={previewContent}
      >
        {allInfoContent}
      </CollapsibleInfoCard>
    </div>
  );

  // Detailed property information card that should show at the bottom
  const renderDetailedInfoCard = () => <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle>Fastighet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Fastighetsnr:</p>
              <p className="font-medium">{propertyDetail.code}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kommun:</p>
              <p className="font-medium">{propertyDetail.municipality}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Församling:</p>
              <p className="font-medium">{propertyDetail.parish || "DOMKYRKOFÖRSAMLING"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ägan/Inhyrd:</p>
              <p className="font-medium">Egen</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Till datum:</p>
              <p className="font-medium">-</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sammanföringsnr:</p>
              <p className="font-medium">-</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Typ av sträckkod:</p>
              <p className="font-medium">(Ej angivet)</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Fastighetsbeteckning:</p>
              
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Trakt:</p>
              <p className="font-medium">{propertyDetail.parish || "Lundby"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hyresid:</p>
              <p className="font-medium">{propertyDetail.code}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fastighetsägare:</p>
              <p className="font-medium">-</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inskrivningsdatum:</p>
              <p className="font-medium">-</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Värdeområde:</p>
              <p className="font-medium">-</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sträckkod:</p>
              <p className="font-medium">-</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Block:</p>
              <p className="font-medium">{propertyDetail.parish || "Lundby"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hyresobjekttyp:</p>
              <p className="font-medium">STD</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mt-1">Standard hyresobjekttyp</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Från datum:</p>
              <p className="font-medium">-</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fångesdatum:</p>
              <p className="font-medium">-</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;

  // If we're only showing the basic info card
  if (showBasicInfoOnly) {
    return renderBasicInfoCard();
  }

  // If we're only showing the detailed info card
  if (showDetailedInfo) {
    return renderDetailedInfoCard();
  }

  // Default: show both cards (for backwards compatibility)
  return <div className="space-y-6">
      {renderBasicInfoCard()}
      {renderDetailedInfoCard()}
    </div>;
};