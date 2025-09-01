import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { HousingSpace } from "../types/housing";

interface HousingObjectInformationProps {
  housingSpace: HousingSpace;
}

export const HousingObjectInformation = ({ housingSpace }: HousingObjectInformationProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Objektsinformation</h3>
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Adress</Label>
              <p className="font-medium">{housingSpace.address}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Objekts-ID</Label>
              <p className="font-medium">{housingSpace.id}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Område</Label>
              <p className="font-medium">{housingSpace.area}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Bostadstyp</Label>
              <p className="font-medium">{housingSpace.type}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Hyra</Label>
              <p className="font-medium text-green-600">{housingSpace.rent}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Storlek</Label>
              <p className="font-medium">{housingSpace.size}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Rum</Label>
              <p className="font-medium">{housingSpace.rooms}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Våning</Label>
              <p className="font-medium">{housingSpace.floor}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};