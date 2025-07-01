
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
      <TabsList className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-100/70 p-1 text-muted-foreground w-full">
        <TabsTrigger value="entrances" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-1.5">
          <Home className="h-4 w-4" />
          Uppgångar
        </TabsTrigger>
        <TabsTrigger value="parts" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-1.5">
          <Building2 className="h-4 w-4" />
          Byggnadsdelar
        </TabsTrigger>
        <TabsTrigger value="spaces" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-1.5">
          <Box className="h-4 w-4" />
          Utrymmen
        </TabsTrigger>
        <TabsTrigger value="installations" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-1.5">
          <Settings className="h-4 w-4" />
          Installationer
        </TabsTrigger>
        <TabsTrigger value="parking" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm gap-1.5">
          <Car className="h-4 w-4" />
          Parkering
        </TabsTrigger>
      </TabsList>

      <TabsContent value="entrances" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <BuildingEntrances building={building} basePath={basePath} />
      </TabsContent>

      <TabsContent value="parts" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <BuildingPartsTab building={building} />
      </TabsContent>

      <TabsContent value="spaces" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <BuildingSpacesTab building={building} />
      </TabsContent>

      <TabsContent value="installations" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <BuildingInstallationsTab building={building} />
      </TabsContent>

      <TabsContent value="parking" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <BuildingParkingTab building={building} />
      </TabsContent>
    </Tabs>
  );
};
