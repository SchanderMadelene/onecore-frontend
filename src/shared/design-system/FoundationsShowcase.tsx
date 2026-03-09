import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPalette } from "./ColorPalette";
import { Typography } from "./Typography";
import { GridSystem } from "./GridSystem";
import { IconsShowcase } from "./IconsShowcase";
import { LogosShowcase } from "./LogosShowcase";

export const FoundationsShowcase = () => {
  return (
    <Tabs defaultValue="colors" className="w-full">
      <TabsList className="mb-6 flex-wrap h-auto gap-1">
        <TabsTrigger value="colors" className="text-xs">Färger</TabsTrigger>
        <TabsTrigger value="typography" className="text-xs">Typografi</TabsTrigger>
        <TabsTrigger value="grid" className="text-xs">Grid</TabsTrigger>
        <TabsTrigger value="icons" className="text-xs">Ikoner</TabsTrigger>
        <TabsTrigger value="logos" className="text-xs">Logotyper</TabsTrigger>
      </TabsList>

      <TabsContent value="colors"><ColorPalette /></TabsContent>
      <TabsContent value="typography"><Typography /></TabsContent>
      <TabsContent value="grid"><GridSystem /></TabsContent>
      <TabsContent value="icons"><IconsShowcase /></TabsContent>
      <TabsContent value="logos"><LogosShowcase /></TabsContent>
    </Tabs>
  );
};
