
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MaintenanceUnitCard } from "@/components/design-system/showcase/maintenance/MaintenanceUnitCard";
import type { Building } from "@/types/api";

interface BuildingPartsTabProps {
  building: Building;
}

export const BuildingPartsTab = ({ building }: BuildingPartsTabProps) => {
  const buildingParts = [
    {
      subComponents: [{
        name: "Tak",
        specs: {
          ekonomiskLivslangd: "30 år",
          tekniskLivslangd: "50 år", 
          year: "1973",
          quantity: "1450 m²",
          brand: "Skanditegel AB",
          model: "Betongpannor standard"
        }
      }]
    },
    {
      subComponents: [{
        name: "Fasad",
        specs: {
          ekonomiskLivslangd: "25 år",
          tekniskLivslangd: "40 år",
          year: "1973", 
          quantity: "2800 m²",
          brand: "Ytong AB",
          model: "Gasbetong puts"
        }
      }]
    },
    {
      subComponents: [{
        name: "Fönster",
        specs: {
          ekonomiskLivslangd: "20 år",
          tekniskLivslangd: "30 år",
          year: "1995",
          quantity: "96 st",
          brand: "Elitfönster AB", 
          model: "Trä/aluminium 3-glas"
        }
      }]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Byggnadsdelar</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {buildingParts.map((part, index) => (
            <MaintenanceUnitCard
              key={index}
              subComponents={part.subComponents}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
