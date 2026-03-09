import { ComponentViewer } from "./viewer";
import { 
  buttonDefinition, 
  badgeDefinition, 
  switchDefinition, 
  inputDefinition, 
  selectDefinition,
  tagDefinition,
  filterChipDefinition,
  emptyStateDefinition,
} from "./definitions";

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
      <ComponentViewer definition={tagDefinition} />
      <ComponentViewer definition={filterChipDefinition} />
      <ComponentViewer definition={emptyStateDefinition} />
      <ComponentViewer definition={switchDefinition} />
      <ComponentViewer definition={inputDefinition} />
      <ComponentViewer definition={selectDefinition} />
    </div>
  );
};
