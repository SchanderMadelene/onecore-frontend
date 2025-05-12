
import { Info, ClipboardList, Users, MessageSquare } from "lucide-react";
import { ResidenceInfo } from "./ResidenceInfo";
import { ResidenceInspection } from "./ResidenceInspection";
import { TenantInformation } from "./inspection/form/TenantInformation";
import { OrdersManagement } from "./OrdersManagement";
import type { Room } from "@/types/api";
import { mockTenant, mockMultipleTenants } from "@/data/tenants";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { MobileAccordion as GenericMobileAccordion, MobileAccordionItem } from "@/components/ui/mobile-accordion";
import { useParams } from "react-router-dom";

interface ResidenceMobileAccordionProps {
  rooms: Room[];
  getOrientationText: (orientation: number) => string;
}

export function MobileAccordion({ rooms, getOrientationText }: ResidenceMobileAccordionProps) {
  const { features } = useFeatureToggles();
  const { id } = useParams<{ id: string }>();
  
  // Använd olika tenant data beroende på lägenhets-id
  const tenantData = id === "lgh-1001" ? mockMultipleTenants : mockTenant;
  
  const accordionItems: MobileAccordionItem[] = [
    {
      id: "info",
      icon: Info,
      title: "Rumsinformation",
      content: features.showRoomInformation ? (
        <ResidenceInfo 
          rooms={rooms}
          getOrientationText={getOrientationText}
        />
      ) : (
        <p className="text-slate-500 p-1">
          För att se rumsinformation, aktivera funktionen i inställningarna.
        </p>
      )
    },
    {
      id: "inspections",
      icon: ClipboardList,
      title: "Besiktningar",
      content: features.showInspections ? (
        <ResidenceInspection
          rooms={rooms}
        />
      ) : (
        <p className="text-slate-500 p-1">
          För att se besiktningar, aktivera funktionen i inställningarna.
        </p>
      )
    },
    {
      id: "tenant",
      icon: Users,
      title: "Hyresgäst",
      content: features.showTenantInfo ? (
        <TenantInformation tenant={tenantData} />
      ) : (
        <p className="text-slate-500 p-1">
          För att se hyresgästinformation, aktivera funktionen i inställningarna.
        </p>
      )
    },
    {
      id: "issues",
      icon: MessageSquare,
      title: "Ärenden",
      content: features.showApartmentIssues ? (
        <OrdersManagement />
      ) : (
        <p className="text-slate-500 p-1">
          För att se felanmälningar, aktivera funktionen i inställningarna.
        </p>
      )
    }
  ];
  
  return (
    <GenericMobileAccordion items={accordionItems} defaultOpen={["info"]} className="space-y-3" />
  );
}
