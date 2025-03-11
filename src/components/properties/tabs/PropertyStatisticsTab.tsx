
import { PieChart } from "lucide-react";

export const PropertyStatisticsTab = () => {
  return (
    <div className="border rounded-lg p-6 text-center">
      <PieChart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">Statistik</h3>
      <p className="text-muted-foreground">
        Ingen statistik tillgänglig för denna fastighet.
      </p>
    </div>
  );
};
