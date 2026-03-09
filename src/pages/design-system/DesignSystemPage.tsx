import { useState } from "react";
import { PageLayout } from "@/layouts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, Component, Workflow } from "lucide-react";

import { 
  FoundationsShowcase, 
  ComponentsShowcase, 
  PatternsShowcase,
} from "@/shared/design-system";

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

        <Tabs defaultValue="foundations" className="w-full">
          <TabsList>
            <TabsTrigger value="foundations" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Fundament
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Component className="h-4 w-4" />
              Komponenter
            </TabsTrigger>
            <TabsTrigger value="patterns" className="flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              Mönster
            </TabsTrigger>
          </TabsList>

          <TabsContent value="foundations" className="mt-6">
            <FoundationsShowcase />
          </TabsContent>

          <TabsContent value="components" className="mt-6">
            <ComponentsShowcase />
          </TabsContent>

          <TabsContent value="patterns" className="mt-6">
            <PatternsShowcase />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default DesignSystemPage;
