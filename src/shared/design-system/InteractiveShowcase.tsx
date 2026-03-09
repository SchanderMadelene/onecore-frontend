import { ComponentViewer } from "./viewer";
import { buttonDefinition, badgeDefinition } from "./definitions";

export const InteractiveShowcase = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Interaktiv komponentdokumentation</h2>
        <p className="text-sm text-muted-foreground">
          Utforska komponenter genom att ändra props i realtid. Växla mellan Canvas, Code och Props för att se förhandsvisning, genererad kod och API-dokumentation.
        </p>
      </div>
      <ComponentViewer definition={buttonDefinition} />
      <ComponentViewer definition={badgeDefinition} />
    </div>
  );
};
