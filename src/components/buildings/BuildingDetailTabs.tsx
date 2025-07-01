
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
    <Tabs defaultValue="entrances" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="entrances">Uppgångar</TabsTrigger>
        <TabsTrigger value="parts">Byggnadsdelar</TabsTrigger>
        <TabsTrigger value="spaces">Utrymmen</TabsTrigger>
        <TabsTrigger value="installations">Installationer</TabsTrigger>
        <TabsTrigger value="parking">Parkering</TabsTrigger>
      </TabsList>

      <TabsContent value="entrances" className="mt-6">
        <BuildingEntrances building={building} basePath={basePath} />
      </TabsContent>

      <TabsContent value="parts" className="mt-6">
        <BuildingPartsTab building={building} />
      </TabsContent>

      <TabsContent value="spaces" className="mt-6">
        <BuildingSpacesTab building={building} />
      </TabsContent>

      <TabsContent value="installations" className="mt-6">
        <BuildingInstallationsTab building={building} />
      </TabsContent>

      <TabsContent value="parking" className="mt-6">
        <BuildingParkingTab building={building} />
      </TabsContent>
    </Tabs>
  );
};
