
import { ComponentCard } from "@/components/design-system/showcase/cards/ComponentCard";
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
        icon={Settings}
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
      icon={Settings}
      count={installations.length}
      showCard={false}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {installations.map(installation => (
          <ComponentCard
            key={installation.id}
            title={installation.name}
            description={installation.description}
            type={installation.specs?.["Typ"]}
            specs={installation.specs ? Object.entries(installation.specs)
              .filter(([key]) => key !== "Typ")
              .map(([key, value]) => ({
                label: key,
                value: String(value)
              })) : []}
          />
        ))}
      </div>
    </TabLayout>
  );
};
