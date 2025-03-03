
import { PropertyDetail } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyBasicInfoProps {
  propertyDetail: PropertyDetail;
}

const PropertyBasicInfo = ({ propertyDetail }: PropertyBasicInfoProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Fastighetsinformation</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Fastighetsbeteckning</p>
              <p className="font-medium">{propertyDetail.designation}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fastighetsnummer</p>
              <p className="font-medium">{propertyDetail.propertyNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kod</p>
              <p className="font-medium">{propertyDetail.code}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Kommun</p>
              <p className="font-medium">{propertyDetail.municipality}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Församling</p>
              <p className="font-medium">{propertyDetail.parish}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Användning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Användningsområde</p>
              <p className="font-medium">{propertyDetail.purpose || 'Ej angivet'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Byggnadstyp</p>
              <p className="font-medium">{propertyDetail.buildingType || 'Ej angivet'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PropertyBasicInfo;
