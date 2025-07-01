
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BuildingEntrances } from "./BuildingEntrances";
import { BuildingPartsTab } from "./tabs/BuildingPartsTab";
import { BuildingSpacesTab } from "./tabs/BuildingSpacesTab";
import { BuildingInstallationsTab } from "./tabs/BuildingInstallationsTab";
import { BuildingParkingTab } from "./tabs/BuildingParkingTab";
import type { Building } from "@/types/api";

interface BuildingDetailTabsProps {
  building: Building;
  basePath: string;
}

export const BuildingDetailTabs = ({ building, basePath }: BuildingDetailTabsProps) => {
  return (
    <Tabs defaultValue="entrances" className="space-y-6">
      <TabsList className="bg-slate-100/70 p-1 rounded-lg overflow-x-auto">
        <TabsTrigger value="entrances">
          <span className="hidden sm:inline">Uppgångar</span>
          <span className="sm:hidden">Uppg.</span>
        </TabsTrigger>
        <TabsTrigger value="parts">
          <span className="hidden sm:inline">Byggnadsdelar</span>
          <span className="sm:hidden">Delar</span>
        </TabsTrigger>
        <TabsTrigger value="spaces">
          <span className="hidden sm:inline">Utrymmen</span>
          <span className="sm:hidden">Utrymm.</span>
        </TabsTrigger>
        <TabsTrigger value="installations">
          <span className="hidden sm:inline">Installationer</span>
          <span className="sm:hidden">Install.</span>
        </TabsTrigger>
        <TabsTrigger value="parking">
          <span className="hidden sm:inline">Parkering</span>
          <span className="sm:hidden">Park.</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="entrances">
        <BuildingEntrances building={building} basePath={basePath} />
      </TabsContent>

      <TabsContent value="parts">
        <BuildingPartsTab building={building} />
      </TabsContent>

      <TabsContent value="spaces">
        <BuildingSpacesTab building={building} />
      </TabsContent>

      <TabsContent value="installations">
        <BuildingInstallationsTab building={building} />
      </TabsContent>

      <TabsContent value="parking">
        <BuildingParkingTab building={building} />
      </TabsContent>
    </Tabs>
  );
};
