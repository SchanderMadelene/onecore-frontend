
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
              <div key={idx} className="border rounded-md p-3">
                <h5 className="font-medium mb-2">{component.name}</h5>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div className="text-muted-foreground">Ekonomisk livslängd:</div>
                  <div>{component.specs.ekonomiskLivslangd}</div>
                  
                  <div className="text-muted-foreground">Teknisk livslängd:</div>
                  <div>{component.specs.tekniskLivslangd}</div>
                  
                  <div className="text-muted-foreground">Startår:</div>
                  <div>{component.specs.year}</div>
                  
                  <div className="text-muted-foreground">Mängd:</div>
                  <div>{component.specs.quantity}</div>
                  
                  <div className="text-muted-foreground">Märke:</div>
                  <div>{component.specs.brand}</div>
                  
                  <div className="text-muted-foreground">Modell:</div>
                  <div>{component.specs.model}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
