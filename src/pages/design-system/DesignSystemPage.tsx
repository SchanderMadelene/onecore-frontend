
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Type, Component, Grid, Paintbrush } from "lucide-react";

// Components for different design system sections
import { ColorPalette } from "./components/ColorPalette";
import { Typography } from "./components/Typography";
import { ComponentShowcase } from "./components/ComponentShowcase";
import { GridSystem } from "./components/GridSystem";
import { IconsShowcase } from "./components/IconsShowcase";

const DesignSystemPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Design System</h1>
          <p className="text-muted-foreground">
            Visual guide for consistent design and development across the application.
          </p>
        </header>

        <Tabs defaultValue="colors" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
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
              <Paintbrush className="h-4 w-4" />
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
