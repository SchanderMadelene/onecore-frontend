
import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Info, ClipboardList, Users, MessageSquare } from "lucide-react";
import { ResidenceInfo } from "./ResidenceInfo";
import { ResidenceInspection } from "./ResidenceInspection";
import { TenantInformation } from "./inspection/form/TenantInformation";
import { CreateIssue } from "./CreateIssue";
import type { Room } from "@/types/api";
import { mockTenant } from "@/data/tenants";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";

interface MobileAccordionProps {
  rooms: Room[];
  getOrientationText: (orientation: number) => string;
}

export function MobileAccordion({ rooms, getOrientationText }: MobileAccordionProps) {
  const { features } = useFeatureToggles();
  const [openItems, setOpenItems] = useState<string[]>(["info"]); // Default: info section open
  
  const handleValueChange = (value: string) => {
    setOpenItems(current => {
      if (current.includes(value)) {
        return current.filter(item => item !== value);
      } 
      return [...current, value];
    });
  };
  
  return (
    <Accordion 
      type="multiple" 
      value={openItems} 
      onValueChange={(value) => setOpenItems(value)}
      className="w-full space-y-2"
    >
      <AccordionItem value="info" className="border rounded-md overflow-hidden">
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            <span className="text-base font-medium">Rumsinformation</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="border-t">
          {features.showRoomInformation ? (
            <ResidenceInfo 
              rooms={rooms}
              getOrientationText={getOrientationText}
            />
          ) : (
            <p className="px-4 py-3 text-muted-foreground">
              För att se rumsinformation, aktivera funktionen i inställningarna.
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="inspections" className="border rounded-md overflow-hidden">
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            <span className="text-base font-medium">Besiktningar</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="border-t">
          {features.showInspections ? (
            <ResidenceInspection
              rooms={rooms}
            />
          ) : (
            <p className="px-4 py-3 text-muted-foreground">
              För att se besiktningar, aktivera funktionen i inställningarna.
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="tenant" className="border rounded-md overflow-hidden">
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span className="text-base font-medium">Hyresgäst</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="border-t">
          {features.showTenantInfo ? (
            <div className="px-4 py-3">
              <TenantInformation tenant={mockTenant} />
            </div>
          ) : (
            <p className="px-4 py-3 text-muted-foreground">
              För att se hyresgästinformation, aktivera funktionen i inställningarna.
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="issues" className="border rounded-md overflow-hidden">
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            <span className="text-base font-medium">Ärenden</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="border-t">
          {features.showApartmentIssues ? (
            <div className="px-4 py-3">
              <CreateIssue />
            </div>
          ) : (
            <p className="px-4 py-3 text-muted-foreground">
              För att se felanmälningar, aktivera funktionen i inställningarna.
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
