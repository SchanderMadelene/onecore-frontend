import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Type, Component, Grid, LibraryIcon } from "lucide-react";

// Import components from the new global location
import { 
  ColorPalette, 
  Typography, 
  ComponentShowcase, 
  GridSystem, 
  IconsShowcase 
} from "@/components/design-system";

const DesignSystemPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6 w-full">
        <div>
          <h1 className="text-3xl font-bold mb-2">Design System</h1>
          <p className="text-muted-foreground mb-6">
            Visual guide for consistent design and development across the application.
          </p>
        </div>

        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Colors</span>
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <span className="hidden sm:inline">Typography</span>
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Component className="h-4 w-4" />
              <span className="hidden sm:inline">Components</span>
            </TabsTrigger>
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <Grid className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </TabsTrigger>
            <TabsTrigger value="icons" className="flex items-center gap-2">
              <LibraryIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Icons</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="mt-6">
            <ColorPalette />
          </TabsContent>
          
          <TabsContent value="typography" className="mt-6">
            <Typography />
          </TabsContent>
          
          <TabsContent value="components" className="mt-6">
            <ComponentShowcase />
          </TabsContent>
          
          <TabsContent value="grid" className="mt-6">
            <GridSystem />
          </TabsContent>
          
          <TabsContent value="icons" className="mt-6">
            <IconsShowcase />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default DesignSystemPage;
