
import { Info, FileText, Calendar, Building, Wrench, Map, Home, BarChart3, KeyRound } from "lucide-react";
import { PropertyInfoTab } from "@/features/properties/components/tabs/PropertyInfoTab";
import { PropertyDocumentsTab } from "@/features/properties/components/tabs/PropertyDocumentsTab";
import { PropertyPlanningTab } from "@/features/properties/components/tabs/PropertyPlanningTab";
import { PropertyBuildingsTab } from "@/features/properties/components/tabs/PropertyBuildingsTab";
import { PropertyMapTab } from "@/features/properties/components/tabs/PropertyMapTab";
import { PropertyStatisticsTab } from "@/features/properties/components/tabs/PropertyStatisticsTab";
import { PropertyMaintenanceUnitsTab } from "@/features/properties/components/tabs/PropertyMaintenanceUnitsTab";
import { PropertyOrdersTab } from "@/features/properties/components/tabs/PropertyOrdersTab";
import { PropertyAccessTab } from "@/features/properties/components/tabs/PropertyAccessTab";
import { MobileAccordion, MobileAccordionItem } from "@/components/ui/mobile-accordion";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import type { PropertyDetail } from "@/types/api";

interface PropertyDetailTabsMobileProps {
  propertyDetail: PropertyDetail;
}

export const PropertyDetailTabsMobile = ({ propertyDetail }: PropertyDetailTabsMobileProps) => {
  const { features } = useFeatureToggles();

  const accordionItems: MobileAccordionItem[] = [
    features.showPropertyInfo && {
      id: "info",
      icon: Info,
      title: "Fastighet",
      content: <PropertyInfoTab property={propertyDetail} />
    },
    features.showPropertyStatistics && {
      id: "statistics",
      icon: BarChart3,
      title: "Fastighetssammanställning",
      content: <PropertyStatisticsTab property={propertyDetail} />
    },
    features.showPropertyBuildings && {
      id: "buildings",
      icon: Building,
      title: "Byggnader",
      content: <PropertyBuildingsTab buildings={propertyDetail.buildings} />
    },
    features.showPropertyMaintenance && {
      id: "maintenance",
      icon: Wrench,
      title: "Underhållsenheter",
      content: <PropertyMaintenanceUnitsTab maintenanceUnits={propertyDetail.maintenanceUnits} />
    },
    features.showPropertyDocuments && {
      id: "documents",
      icon: FileText,
      title: "Dokument",
      content: <PropertyDocumentsTab />
    },
    features.showPropertyPlanning && {
      id: "planning",
      icon: Calendar,
      title: "Planerat underhåll",
      content: <PropertyPlanningTab />
    },
    features.showPropertyOrders && {
      id: "orders",
      icon: Home,
      title: "Ärenden",
      content: <PropertyOrdersTab propertyDetail={propertyDetail} />
    },
    features.showPropertyAccess && {
      id: "access",
      icon: KeyRound,
      title: "Lås & passage",
      content: <PropertyAccessTab />
    },
    features.showPropertyMap && {
      id: "map",
      icon: Map,
      title: "Ritningar",
      content: <PropertyMapTab propertyDetail={propertyDetail} />
    }
  ].filter(Boolean) as MobileAccordionItem[];

  return (
    <MobileAccordion 
      items={accordionItems} 
      defaultOpen={["info"]} 
      className="space-y-3" 
    />
  );
};
