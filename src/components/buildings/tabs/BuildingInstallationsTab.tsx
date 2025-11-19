// import { ComponentCard } from "@/components/design-system/showcase/cards/ComponentCard"; // TODO: Replace with new unified component
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TabLayout } from "@/components/ui/tab-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { Settings } from "lucide-react";
import type { Building, SpaceComponent } from "@/types/api";
import { ComponentCard } from "@/components/shared/ComponentCard";
import { Component } from "@/data/components";

interface BuildingInstallationsTabProps {
  building: Building;
}

interface Installation {
  id: string;
  name: string;
  components: Component[];
}

export const BuildingInstallationsTab = ({ building }: BuildingInstallationsTabProps) => {
  // Hitta installationer i spaces
  const installationsSpace = building.spaces?.find(space => space.name === "Installationer");
  const installationComponents = installationsSpace?.components || [];

  // Konvertera till Installation-format med tom components array
  const installations: Installation[] = installationComponents.map(comp => ({
    id: comp.id,
    name: comp.name,
    components: [] // Kommer fyllas på med faktiska komponenter senare
  }));

  if (installations.length === 0) {
    return (
      <TabLayout 
        title="Installationer" 
        count={0}
      >
        <EmptyState
          icon={Settings}
          title="Inga installationer"
          description="Det finns inga installationer registrerade för denna byggnad ännu."
        />
      </TabLayout>
    );
  }

  return (
    <TabLayout 
      title="Installationer" 
      count={installations.length}
      showCard={true}
    >
      <Accordion type="single" collapsible className="space-y-2">
        {installations.map(installation => (
          <AccordionItem 
            key={installation.id} 
            value={installation.id}
            className="rounded-lg border border-slate-200 bg-white"
          >
            <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{installation.name}</span>
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent>
              <div className="px-3 sm:px-4 pb-4 pt-1">
                {installation.components && installation.components.length > 0 ? (
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
                    {installation.components.map(component => (
                      <ComponentCard key={component.id} component={component} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground p-2">
                    Inga komponenter registrerade för denna installation.
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </TabLayout>
  );
};
