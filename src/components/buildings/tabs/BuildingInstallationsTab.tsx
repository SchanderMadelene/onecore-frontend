
import { ComponentCard } from "@/components/design-system/showcase/cards/ComponentCard";
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
      <div className="text-center py-10">
        <h3 className="text-xl font-medium mb-2">Inga installationer</h3>
        <p className="text-muted-foreground">
          Det finns inga installationer registrerade för denna byggnad ännu.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
    </div>
  );
};
