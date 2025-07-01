
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BuildingEntrances } from "./BuildingEntrances";
import { BuildingPartsTab } from "./tabs/BuildingPartsTab";
import { BuildingSpacesTab } from "./tabs/BuildingSpacesTab";
import { BuildingInstallationsTab } from "./tabs/BuildingInstallationsTab";
import { BuildingParkingTab } from "./tabs/BuildingParkingTab";
import { Home, Building2, Box, Settings, Car } from "lucide-react";
import type { Building } from "@/types/api";

interface BuildingDetailTabsProps {
  building: Building;
  basePath: string;
}

export const BuildingDetailTabs = ({ building, basePath }: BuildingDetailTabsProps) => {
  return (
    <Tabs defaultValue="entrances" className="w-full">
      <TabsList className="mb-4 bg-slate-100/70 p-1 rounded-lg">
        <TabsTrigger value="entrances" className="flex items-center gap-1.5">
          <Home className="h-4 w-4" />
          Uppgångar
        </TabsTrigger>
        <TabsTrigger value="parts" className="flex items-center gap-1.5">
          <Building2 className="h-4 w-4" />
          Byggnadsdelar
        </TabsTrigger>
        <TabsTrigger value="spaces" className="flex items-center gap-1.5">
          <Box className="h-4 w-4" />
          Utrymmen
        </TabsTrigger>
        <TabsTrigger value="installations" className="flex items-center gap-1.5">
          <Settings className="h-4 w-4" />
          Installationer
        </TabsTrigger>
        <TabsTrigger value="parking" className="flex items-center gap-1.5">
          <Car className="h-4 w-4" />
          Parkering
        </TabsTrigger>
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
