
import { Info, ClipboardList, Users, MessageSquare, FileText, LockKeyhole } from "lucide-react";
import { ResidenceInfo } from "./ResidenceInfo";
import { ResidenceInspection } from "./ResidenceInspection";
import { TenantInformation } from "./inspection/form/TenantInformation";
import { OrdersManagement } from "./OrdersManagement";
import { ResidenceAccessControl } from "./ResidenceAccessControl";
import { NotesSimple } from "@/components/shared/Notes/NotesSimple";
import type { Room } from "@/types/api";
import { mockTenant, mockMultipleTenants, mockSecondHandTenants } from "@/data/tenants";
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
  
  // Välj tenant data baserat på lägenhets-ID
  const getTenantData = () => {
    switch(id) {
      case "lgh-1001":
        return mockMultipleTenants;
      case "lgh-1002":
        return mockSecondHandTenants;
      default:
        return mockTenant;
    }
  };
  
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
        <TenantInformation tenant={getTenantData()} />
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
        <OrdersManagement residenceId={id} />
      ) : (
        <p className="text-slate-500 p-1">
          För att se felanmälningar, aktivera funktionen i inställningarna.
        </p>
      )
    },
    {
      id: "notes",
      icon: FileText,
      title: "Noteringar",
      content: features.showResidenceNotes ? (
        <NotesSimple 
          entityType="residence"
          entityId={id || ""}
          title="Noteringar för lägenheten"
          placeholder="Skriv en notering om lägenheten..."
          emptyMessage="Inga noteringar har lagts till för denna lägenhet ännu."
        />
      ) : (
        <p className="text-slate-500 p-1">
          För att se noteringar, aktivera funktionen i inställningarna.
        </p>
      )
    },
    {
      id: "access",
      icon: LockKeyhole,
      title: "Lås och passage",
      content: features.showResidenceAccess ? (
        <ResidenceAccessControl />
      ) : (
        <p className="text-slate-500 p-1">
          För att se lås och passage, aktivera funktionen i inställningarna.
        </p>
      )
    }
  ];
  
  return (
    <GenericMobileAccordion items={accordionItems} defaultOpen={["info"]} className="space-y-3" />
  );
}
