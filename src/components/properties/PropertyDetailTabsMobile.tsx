
import { Info, FileText, Calendar, Building, Wrench, Map, Home, BarChart3 } from "lucide-react";
import { PropertyInfoTab } from "./tabs/PropertyInfoTab";
import { PropertyDocumentsTab } from "./tabs/PropertyDocumentsTab";
import { PropertyPlanningTab } from "./tabs/PropertyPlanningTab";
import { PropertyBuildingsTab } from "./tabs/PropertyBuildingsTab";
import { PropertyMapTab } from "./tabs/PropertyMapTab";
import { PropertyStatisticsTab } from "./tabs/PropertyStatisticsTab";
import { PropertyMaintenanceUnitsTab } from "./tabs/PropertyMaintenanceUnitsTab";
import { PropertyOrdersTab } from "./tabs/PropertyOrdersTab";
import { PropertyAccessTab } from "./tabs/PropertyAccessTab";
import { MobileAccordion, MobileAccordionItem } from "@/components/ui/mobile-accordion";
import type { PropertyDetail } from "@/types/api";

interface PropertyDetailTabsMobileProps {
  propertyDetail: PropertyDetail;
}

export const PropertyDetailTabsMobile = ({ propertyDetail }: PropertyDetailTabsMobileProps) => {
  const accordionItems: MobileAccordionItem[] = [
    {
      id: "info",
      icon: Info,
      title: "Fastighet",
      content: <PropertyInfoTab property={propertyDetail} />
    },
    {
      id: "statistics",
      icon: BarChart3,
      title: "Fastighetssammanställning",
      content: <PropertyStatisticsTab property={propertyDetail} />
    },
    {
      id: "buildings",
      icon: Building,
      title: "Byggnader",
      content: <PropertyBuildingsTab buildings={propertyDetail.buildings} />
    },
    {
      id: "maintenance",
      icon: Wrench,
      title: "Underhållsenheter",
      content: <PropertyMaintenanceUnitsTab maintenanceUnits={propertyDetail.maintenanceUnits} />
    },
    {
      id: "documents",
      icon: FileText,
      title: "Dokument",
      content: <PropertyDocumentsTab />
    },
    {
      id: "planning",
      icon: Calendar,
      title: "Planerat underhåll",
      content: <PropertyPlanningTab />
    },
    {
      id: "orders",
      icon: Home,
      title: "Ärenden",
      content: <PropertyOrdersTab propertyDetail={propertyDetail} />
    },
    {
      id: "access",
      icon: Info,
      title: "Lås & passage",
      content: <PropertyAccessTab />
    },
    {
      id: "map",
      icon: Map,
      title: "Ritningar",
      content: <PropertyMapTab propertyDetail={propertyDetail} />
    }
  ];

  return (
    <MobileAccordion 
      items={accordionItems} 
      defaultOpen={["info"]} 
      className="space-y-3" 
    />
  );
};
