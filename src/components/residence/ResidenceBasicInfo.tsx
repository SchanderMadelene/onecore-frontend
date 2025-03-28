
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Residence } from "@/types/api";

interface ResidenceBasicInfoProps {
  residence: Residence;
  property?: string;
  district?: string;
}

export const ResidenceBasicInfo = ({ residence, property, district }: ResidenceBasicInfoProps) => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-2">Lägenhet {residence.code}</h1>
        <p className="text-muted-foreground">{property?.replace("-", " ")}, {district}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grundinformation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Lägenhetskod</p>
                <p className="font-medium">{residence.code}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Namn</p>
                <p className="font-medium">{residence.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{residence.deleted ? "Borttagen" : "Aktiv"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Giltighetstid</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Giltig från</p>
                <p className="font-medium">
                  {new Date(residence.validityPeriod.fromDate).toLocaleDateString('sv-SE')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Giltig till</p>
                <p className="font-medium">
                  {new Date(residence.validityPeriod.toDate).toLocaleDateString('sv-SE')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
