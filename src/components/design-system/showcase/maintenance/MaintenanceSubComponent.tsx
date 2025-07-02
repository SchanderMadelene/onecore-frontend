
import { Separator } from "@/components/ui/separator";

interface SubComponentSpecs {
  ekonomiskLivslangd: string;
  tekniskLivslangd: string;
  year: string;
  quantity: string;
  brand: string;
  model: string;
}

interface MaintenanceSubComponentProps {
  name: string;
  specs: SubComponentSpecs;
}

export const MaintenanceSubComponent = ({ name, specs }: MaintenanceSubComponentProps) => {
  return (
    <div className="bg-muted/20 rounded p-3">
      <h5 className="font-medium mb-3 text-sm">{name}</h5>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <div className="text-muted-foreground">Ekonomisk livslängd:</div>
        <div className="text-right">{specs.ekonomiskLivslangd}</div>
        
        <div className="text-muted-foreground">Teknisk livslängd:</div>
        <div className="text-right">{specs.tekniskLivslangd}</div>
        
        <div className="text-muted-foreground">Startår:</div>
        <div className="text-right">{specs.year}</div>
        
        <div className="text-muted-foreground">Mängd:</div>
        <div className="text-right">{specs.quantity}</div>
        
        <div className="text-muted-foreground">Märke:</div>
        <div className="text-right">{specs.brand}</div>
        
        <div className="text-muted-foreground">Modell:</div>
        <div className="text-right">{specs.model}</div>
      </div>
    </div>
  );
};
