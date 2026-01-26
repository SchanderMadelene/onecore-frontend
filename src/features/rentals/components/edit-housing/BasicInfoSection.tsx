
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UnpublishedHousingSpace } from "../types/unpublished-housing";

interface BasicInfoSectionProps {
  housingSpace: UnpublishedHousingSpace;
}

export function BasicInfoSection({ housingSpace }: BasicInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Grundläggande information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Adress</label>
            <div className="text-sm font-medium mt-1">{housingSpace.address}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Nummer</label>
            <div className="text-sm font-medium mt-1">-</div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Område</label>
            <div className="text-sm font-medium mt-1">{housingSpace.area}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Rum</label>
            <div className="text-sm font-medium mt-1">{housingSpace.rooms}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Yta</label>
            <div className="text-sm font-medium mt-1">{housingSpace.size}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Hiss</label>
            <div className="text-sm font-medium mt-1">Ja/Nej</div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Hyra/månad</label>
            <div className="text-sm font-medium mt-1">{housingSpace.rent || "10 000 kr"}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Byggnadsår</label>
            <div className="text-sm font-medium mt-1">1950</div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Objektsnummer</label>
            <div className="text-sm font-medium mt-1">xxxx</div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Besiktning genomförd</label>
            <div className="text-sm font-medium mt-1">dd-mm-yy</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
