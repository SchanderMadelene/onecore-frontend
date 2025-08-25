import { publishedHousingSpaces } from "@/data/published-housing";
import { Card, CardContent } from "@/components/ui/card";

export function PublishedHousingTable() {
  return (
    <div className="space-y-3">
      {publishedHousingSpaces.map((housing) => (
        <Card key={housing.id} className="hover:bg-muted/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-medium">{housing.address}</h3>
                <p className="text-sm text-muted-foreground">{housing.area}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{housing.rooms} rum</span>
                  <span>{housing.size}</span>
                  <span>{housing.rent}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">
                  {housing.seekers} sökande
                </div>
                <div className="text-xs text-muted-foreground">
                  Ledig: {housing.availableFrom}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}