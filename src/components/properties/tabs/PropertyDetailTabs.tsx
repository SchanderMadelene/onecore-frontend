
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, MapPin, FileText, CalendarDays, PieChart, Wrench, Home, BarChart } from "lucide-react";
import { PropertyInfoTab } from "./PropertyInfoTab";
import { PropertyDocumentsTab } from "./PropertyDocumentsTab";
import { PropertyPlanningTab } from "./PropertyPlanningTab";
import { PropertyBuildingsTab } from "./PropertyBuildingsTab";
import { PropertyMapTab } from "./PropertyMapTab";
import { PropertyApartmentsTab } from "./PropertyApartmentsTab";
import { PropertyStatisticsTab } from "./PropertyStatisticsTab";
import { PropertyMaintenanceUnitsTab } from "./PropertyMaintenanceUnitsTab";
import type { PropertyDetail } from "@/types/api";

interface PropertyDetailTabsProps {
  propertyDetail: PropertyDetail;
}

export const PropertyDetailTabs = ({ propertyDetail }: PropertyDetailTabsProps) => {
  return (
    <Tabs defaultValue="info" className="space-y-6">
      <TabsList>
        <TabsTrigger value="info" className="flex items-center gap-1">
          <Building className="h-4 w-4" />
          <span className="hidden sm:inline">Fastighet</span>
          <span className="sm:hidden">Info</span>
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Dokument</span>
          <span className="sm:hidden">Dok</span>
        </TabsTrigger>
        <TabsTrigger value="planning" className="flex items-center gap-1">
          <CalendarDays className="h-4 w-4" />
          <span className="hidden sm:inline">Planering</span>
          <span className="sm:hidden">Plan</span>
        </TabsTrigger>
        <TabsTrigger value="buildings" className="flex items-center gap-1">
          <Building className="h-4 w-4" />
          <span className="hidden sm:inline">Byggnader</span>
          <span className="sm:hidden">Bygg</span>
        </TabsTrigger>
        <TabsTrigger value="maintenance" className="flex items-center gap-1">
          <Wrench className="h-4 w-4" />
          <span className="hidden sm:inline">Underhållsenheter</span>
          <span className="sm:hidden">Underhåll</span>
        </TabsTrigger>
        <TabsTrigger value="map" className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>Ritningar</span>
        </TabsTrigger>
        <TabsTrigger value="apartments" className="flex items-center gap-1">
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Lägenheter</span>
          <span className="sm:hidden">Läg</span>
        </TabsTrigger>
        <TabsTrigger value="statistics" className="flex items-center gap-1">
          <BarChart className="h-4 w-4" />
          <span className="hidden sm:inline">Statistik</span>
          <span className="sm:hidden">Stat</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="info">
        <PropertyInfoTab property={propertyDetail} />
      </TabsContent>

      <TabsContent value="documents">
        <PropertyDocumentsTab />
      </TabsContent>

      <TabsContent value="planning">
        <PropertyPlanningTab />
      </TabsContent>

      <TabsContent value="buildings">
        <PropertyBuildingsTab buildings={propertyDetail.buildings} />
      </TabsContent>

      <TabsContent value="maintenance">
        <PropertyMaintenanceUnitsTab maintenanceUnits={propertyDetail.maintenanceUnits} />
      </TabsContent>

      <TabsContent value="map">
        <PropertyMapTab propertyDetail={propertyDetail} />
      </TabsContent>

      <TabsContent value="apartments">
        <PropertyApartmentsTab buildings={propertyDetail.buildings} />
      </TabsContent>

      <TabsContent value="statistics">
        <PropertyStatisticsTab />
      </TabsContent>
    </Tabs>
  );
};
