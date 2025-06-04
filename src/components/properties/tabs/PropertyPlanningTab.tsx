
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PropertyPlanningTab = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Planerat underhåll</CardTitle>
      </CardHeader>
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
