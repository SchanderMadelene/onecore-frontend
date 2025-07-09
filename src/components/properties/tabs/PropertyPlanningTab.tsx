
import { TabLayout } from "@/components/ui/tab-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { Calendar } from "lucide-react";

export const PropertyPlanningTab = () => {
  return (
    <TabLayout 
      title="Planerat underhåll" 
      icon={Calendar}
    >
      <EmptyState
        icon={Calendar}
        title="Ingen planering tillgänglig"
        description="Det finns ingen planeringsinformation registrerad för denna fastighet."
      />
    </TabLayout>
  );
};
