// import { ComponentCard } from "@/components/design-system/showcase/cards/ComponentCard"; // TODO: Replace with new unified component
import { TabLayout } from "@/components/ui/tab-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { Settings } from "lucide-react";
import type { Building, SpaceComponent } from "@/types/api";
import { ComponentCard } from "@/components/shared/ComponentCard";
import { Component } from "@/data/components";

interface BuildingInstallationsTabProps {
  building: Building;
}

export const BuildingInstallationsTab = ({ building }: BuildingInstallationsTabProps) => {
  // Hitta installationer i spaces
  const installationsSpace = building.spaces?.find(space => space.name === "Installationer");
  const installations = installationsSpace?.components || [];

  // Konvertera SpaceComponent till Component-format för ComponentCard
  const convertToComponentFormat = (spaceComp: SpaceComponent): Component => {
    const specs = Object.entries(spaceComp.specs || {}).map(([label, value]) => ({
      label,
      value: String(value)
    }));

    return {
      id: spaceComp.id,
      name: spaceComp.name,
      type: "category",
      location: building.name,
      componentCount: 0,
      specifications: specs
    };
  };

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
          <ComponentCard 
            key={installation.id}
            component={convertToComponentFormat(installation)}
          />
        ))}
      </div>
    </TabLayout>
  );
};
