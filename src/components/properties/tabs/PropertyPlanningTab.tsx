
import { Calendar } from "lucide-react";

export const PropertyPlanningTab = () => {
  return (
    <div className="border rounded-lg p-6 text-center">
      <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">Planering</h3>
      <p className="text-muted-foreground">
        Ingen planeringsinformation tillgänglig.
      </p>
    </div>
  );
};
