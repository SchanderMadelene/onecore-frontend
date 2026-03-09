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
import { ResponsiveShowcase } from "./ResponsiveShowcase";

export const ComponentsShowcase = () => {
  return (
    <div className="space-y-10">
      {/* Knappar & Inmatning */}
      <section>
        <h2 className="text-xl font-semibold mb-1">Knappar & Inmatning</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Interaktiva kontroller för användarinput och åtgärder.
        </p>
        <div className="space-y-6">
          <ComponentViewer definition={buttonDefinition} />
          <ComponentViewer definition={inputDefinition} />
          <ComponentViewer definition={selectDefinition} />
          <ComponentViewer definition={switchDefinition} />
          <ComponentViewer definition={filterChipDefinition} />
        </div>
      </section>

      {/* Indikatorer & Etiketter */}
      <section>
        <h2 className="text-xl font-semibold mb-1">Indikatorer & Etiketter</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Visuella markörer för status, kategorisering och tomma tillstånd.
        </p>
        <div className="space-y-6">
          <ComponentViewer definition={badgeDefinition} />
          <ComponentViewer definition={tagDefinition} />
          <ComponentViewer definition={emptyStateDefinition} />
        </div>
      </section>

      {/* Tabeller & Layout (responsiva) */}
      <section>
        <ResponsiveShowcase />
      </section>
    </div>
  );
};
