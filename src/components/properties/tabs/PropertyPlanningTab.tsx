
import { Card, CardContent } from "@/components/ui/card";

export const PropertyPlanningTab = () => {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Ingen planeringsinformation tillgänglig.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
