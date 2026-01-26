
import { TabLayout } from "@/components/ui/tab-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { FileImage } from "lucide-react";

export const ResidenceFloorplan = () => {
  return (
    <TabLayout 
      title="Planritning"
    >
      <EmptyState
        icon={FileImage}
        title="Planritning inte tillgänglig"
        description="Planritning för denna lägenhet är inte tillgänglig för tillfället."
      />
    </TabLayout>
  );
};
