import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentViewer } from "./viewer";
import { 
  buttonDefinition, 
  badgeDefinition, 
  switchDefinition, 
  inputDefinition, 
  selectDefinition,
  tagDefinition,
  emptyStateDefinition,
} from "./definitions";
import { TablesShowcase, LayoutShowcase } from "./ResponsiveShowcase";
import { FilterSearchShowcase } from "./FilterSearchShowcase";

export const ComponentsShowcase = () => {
  return (
    <Tabs defaultValue="buttons" className="w-full">
      <TabsList className="mb-6 flex-wrap h-auto gap-1">
        <TabsTrigger value="buttons" className="text-xs">Knappar & Inmatning</TabsTrigger>
        <TabsTrigger value="indicators" className="text-xs">Indikatorer & Etiketter</TabsTrigger>
        <TabsTrigger value="filters" className="text-xs">Filter & Sök</TabsTrigger>
        <TabsTrigger value="tables" className="text-xs">Tabeller</TabsTrigger>
        <TabsTrigger value="layout" className="text-xs">Layout & Navigation</TabsTrigger>
      </TabsList>

      <TabsContent value="buttons">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Knappar & Inmatning</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Interaktiva kontroller för användarinput och åtgärder.
            </p>
          </div>
          <ComponentViewer definition={buttonDefinition} />
          <ComponentViewer definition={inputDefinition} />
          <ComponentViewer definition={selectDefinition} />
          <ComponentViewer definition={switchDefinition} />
        </div>
      </TabsContent>

      <TabsContent value="indicators">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Indikatorer & Etiketter</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Visuella markörer för status, kategorisering och tomma tillstånd.
            </p>
          </div>
          <ComponentViewer definition={badgeDefinition} />
          <ComponentViewer definition={tagDefinition} />
          <ComponentViewer definition={emptyStateDefinition} />
        </div>
      </TabsContent>

      <TabsContent value="tables">
        <TablesShowcase />
      </TabsContent>

      <TabsContent value="layout">
        <LayoutShowcase />
      </TabsContent>
    </Tabs>
  );
};
