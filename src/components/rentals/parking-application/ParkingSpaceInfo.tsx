
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { ParkingSpace } from "../types/parking";

interface ParkingSpaceInfoProps {
  parkingSpace: ParkingSpace;
}

export const ParkingSpaceInfo = ({ parkingSpace }: ParkingSpaceInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Objektsinformation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-muted-foreground">Adress</Label>
            <p className="font-medium">{parkingSpace.address}</p>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Objekts-ID</Label>
            <p className="font-medium">{parkingSpace.id}</p>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Område</Label>
            <p className="font-medium">{parkingSpace.area}</p>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Bilplatstyp</Label>
            <p className="font-medium">{parkingSpace.type}</p>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Hyra</Label>
            <p className="font-medium text-green-600">{parkingSpace.rent}</p>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground">Kötyp</Label>
            <p className="font-medium">{parkingSpace.queueType}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
