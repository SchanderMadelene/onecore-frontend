import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ResidenceInfo } from "./ResidenceInfo";
import { ResidenceInspection } from "./ResidenceInspection";
import { TenantInformation } from "./inspection/form/TenantInformation";
import { OrdersManagement } from "./OrdersManagement";

import { Notes } from "@/components/shared/Notes";
import type { Room } from "@/types/api";
import { mockTenant, mockMultipleTenants, mockSecondHandTenants } from "@/data/tenants";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
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
  
  const accordionItems = [
    {
      id: "info",
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
      title: "Besiktningar",
      content: features.showInspections ? (
        <ResidenceInspection
          rooms={rooms}
          tenant={getTenantData()}
        />
      ) : (
        <p className="text-slate-500 p-1">
          För att se besiktningar, aktivera funktionen i inställningarna.
        </p>
      )
    },
    {
      id: "tenant",
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
      title: "Noteringar",
      content: features.showResidenceNotes ? (
        <Notes 
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
      title: "Lås och passage",
      content: features.showResidenceAccess ? (
        <div className="p-4 text-center text-muted-foreground">
          Funktionaliteten för lås och passage är inte implementerad ännu.
        </div>
      ) : (
        <p className="text-slate-500 p-1">
          För att se lås och passage, aktivera funktionen i inställningarna.
        </p>
      )
    }
  ];
  
  return (
    <div className="w-full">
      <Accordion type="multiple" defaultValue={["info"]} className="space-y-2">
        {accordionItems.map(item => (
          <AccordionItem key={item.id} value={item.id} className="rounded-lg border border-slate-200">
            <AccordionTrigger className="px-2 py-2">
              <div className="flex items-center gap-2">
                <span className="text-base font-medium">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-0 pb-2">
                {item.content}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}