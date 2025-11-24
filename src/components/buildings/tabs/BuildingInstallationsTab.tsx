// import { ComponentCard } from "@/components/design-system/showcase/cards/ComponentCard"; // TODO: Replace with new unified component
import { TabLayout } from "@/components/ui/tab-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { Settings } from "lucide-react";
import type { Building } from "@/types/api";

interface BuildingInstallationsTabProps {
  building: Building;
}

export const BuildingInstallationsTab = ({ building }: BuildingInstallationsTabProps) => {
  // Hitta installationer i spaces
  const installationsSpace = building.spaces?.find(space => space.name === "Installationer");
  const installations = installationsSpace?.components || [];

  if (installations.length === 0) {
    return (
      <TabLayout 
        title="Installationer" 
        count={0}
      >
        <EmptyState
          icon={Settings}
          title="Inga installationer"
          description="Det finns inga installationer registrerade för denna byggnad ännu."
        />
      </TabLayout>
    );
  }

  return (
    <TabLayout 
      title="Installationer" 
      count={installations.length}
      showCard={true}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {installations.map(installation => (
          <div key={installation.id} className="p-4 border rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">Komponentkort kommer snart</p>
          </div>
        ))}
      </div>
    </TabLayout>
  );
};
