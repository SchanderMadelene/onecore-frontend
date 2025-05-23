
import { Card, CardContent } from "@/components/ui/card";

interface BasicInformationProps {
  inspectorName: string;
  roomCount: number;
  apartmentInfo?: {
    address: string;
    hasMainKey: boolean;
  };
}

export function BasicInformation({
  inspectorName,
  roomCount,
  apartmentInfo
}: BasicInformationProps) {
  const address = apartmentInfo?.address || "Odenplan 5, lägenhet 1001";
  const hasMainKey = apartmentInfo?.hasMainKey !== undefined ? apartmentInfo.hasMainKey : true;

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Adress</p>
              <p className="font-medium">{address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Huvudnyckel</p>
              <p className="font-medium">{hasMainKey ? "Ja" : "Nej"}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Besiktningsman</p>
              <p className="font-medium">{inspectorName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Antal rum</p>
              <p className="font-medium">{roomCount}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
