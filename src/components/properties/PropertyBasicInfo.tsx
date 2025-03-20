
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Calendar, Home, MapPin } from "lucide-react";
import type { PropertyDetail } from "@/types/api";

interface PropertyBasicInfoProps {
  propertyDetail: PropertyDetail;
}

export const PropertyBasicInfo = ({ propertyDetail }: PropertyBasicInfoProps) => {
  // Extract the current route information from the window location
  const routeParts = window.location.pathname.split('/');
  const propertyKey = routeParts.slice(2).join('/');
  
  return (
    <div className="space-y-6">
      <Card className="mb-6">
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
                <p className="font-medium">{propertyDetail.designation}</p>
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
      </Card>
      
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle>Grundläggande information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Fastighetsbeteckning</p>
                <p className="font-medium">{propertyDetail.designation}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kommun</p>
                <p className="font-medium">{propertyDetail.municipality}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Adress</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{propertyDetail.address || "-"}</p>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Fastighetsstatus</p>
                <p className="font-medium">
                  Aktiv
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Antal byggnader</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{propertyDetail.buildings.length}</p>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Byggnadsår</p>
                <p className="font-medium">
                  {propertyDetail.buildings.length > 0 
                    ? propertyDetail.buildings[0].constructionYear 
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
