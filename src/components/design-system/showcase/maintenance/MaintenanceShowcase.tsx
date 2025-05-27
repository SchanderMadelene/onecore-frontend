
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MaintenanceUnitCard } from "./MaintenanceUnitCard";

const mockSubComponents = [
  {
    name: "Takpapp",
    specs: {
      ekonomiskLivslangd: "15 år",
      tekniskLivslangd: "20 år",
      year: "2020",
      quantity: "450 m²",
      brand: "Icopal",
      model: "Elastoflex SA"
    }
  },
  {
    name: "Stuprör",
    specs: {
      ekonomiskLivslangd: "30 år",
      tekniskLivslangd: "40 år",
      year: "2015",
      quantity: "12 st",
      brand: "Lindab",
      model: "Steel"
    }
  },
  {
    name: "Takränna",
    specs: {
      ekonomiskLivslangd: "25 år",
      tekniskLivslangd: "35 år",
      year: "2018",
      quantity: "85 m",
      brand: "Plannja",
      model: "Original"
    }
  }
];

export const MaintenanceShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Unit Cards</CardTitle>
        <CardDescription>Components for displaying maintenance unit information with sub-components</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <MaintenanceUnitCard subComponents={mockSubComponents} />
          <MaintenanceUnitCard subComponents={mockSubComponents.slice(0, 2)} />
        </div>
      </CardContent>
    </Card>
  );
};
