
import { useState } from "react";
import { MaintenanceUnitCard } from "@/components/design-system/showcase/maintenance/MaintenanceUnitCard";
import { MaintenanceUnit } from "@/types/api";

interface PropertyMaintenanceUnitsTabProps {
  maintenanceUnits?: MaintenanceUnit[];
}

export const PropertyMaintenanceUnitsTab = ({ maintenanceUnits }: PropertyMaintenanceUnitsTabProps) => {
  // Skapa subkomponenter för återvinning
  const getSubComponentsForUnit = (unit: MaintenanceUnit) => {
    if (unit.type === "Återvinning") {
      return [
        {
          name: "Miljöbod",
          specs: {
            ekonomiskLivslangd: "20 år",
            tekniskLivslangd: "25 år",
            year: "2018",
            quantity: "1 st",
            brand: "EcoContainers",
            model: "EcoBod 2000"
          }
        },
        {
          name: "Markbehållare",
          specs: {
            ekonomiskLivslangd: "15 år",
            tekniskLivslangd: "20 år",
            year: "2020",
            quantity: "4 st",
            brand: "WasteManager",
            model: "Underground 500L"
          }
        }
      ];
    }
    
    // För andra enhetstyper, returnera en tom array eller standardkomponent
    return [
      {
        name: unit.name,
        specs: {
          ekonomiskLivslangd: "25 år",
          tekniskLivslangd: "30 år",
          year: unit.constructionYear.toString(),
          quantity: unit.area > 0 ? `${unit.area} m²` : "1 st",
          brand: "Standard AB",
          model: "Standard Model"
        }
      }
    ];
  };

  if (!maintenanceUnits || maintenanceUnits.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-muted-foreground">
          Inga underhållsenheter registrerade för denna fastighet
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {maintenanceUnits.map(unit => (
          <MaintenanceUnitCard
            key={unit.id}
            subComponents={getSubComponentsForUnit(unit)}
          />
        ))}
      </div>
    </div>
  );
};
