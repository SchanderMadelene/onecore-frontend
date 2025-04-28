
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MaintenanceSubComponent } from "./MaintenanceSubComponent";

interface SubComponent {
  name: string;
  specs: {
    ekonomiskLivslangd: string;
    tekniskLivslangd: string;
    year: string;
    quantity: string;
    brand: string;
    model: string;
  };
}

interface MaintenanceUnitCardProps {
  subComponents: SubComponent[];
}

export const MaintenanceUnitCard = ({ subComponents }: MaintenanceUnitCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">Tak</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Årsintervall:</span>
            <span>2020-2025</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Avskrivningstid:</span>
            <span>25 år</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Fabrikat:</span>
            <span>Takab AB</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Garantitid:</span>
            <span>10 år</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Yta:</span>
            <span>450 m²</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="space-y-3">
            {subComponents.map((component, idx) => (
              <MaintenanceSubComponent
                key={idx}
                name={component.name}
                specs={component.specs}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
