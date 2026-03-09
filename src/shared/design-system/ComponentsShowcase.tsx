import { InteractiveShowcase } from "./InteractiveShowcase";
import { ResponsiveShowcase } from "./ResponsiveShowcase";

export const ComponentsShowcase = () => {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-semibold mb-1">Interaktiva</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Utforska komponenter genom att ändra props i realtid.
        </p>
        <InteractiveShowcase />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-1">Responsiva</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Komponenter med viewport-beroende beteende. Växla mellan desktop och mobil.
        </p>
        <ResponsiveShowcase />
      </section>
    </div>
  );
};
