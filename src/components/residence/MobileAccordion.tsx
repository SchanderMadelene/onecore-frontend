
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
    <div className="space-y-4">
      <Accordion 
        type="multiple" 
        value={openItems} 
        onValueChange={(value) => setOpenItems(value)}
      >
        <AccordionItem value="info">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              <span className="text-base">Rumsinformation</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {features.showRoomInformation ? (
              <ResidenceInfo 
                rooms={rooms}
                getOrientationText={getOrientationText}
              />
            ) : (
              <p className="text-muted-foreground">
                För att se rumsinformation, aktivera funktionen i inställningarna.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="inspections">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              <span className="text-base">Besiktningar</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {features.showInspections ? (
              <ResidenceInspection
                rooms={rooms}
              />
            ) : (
              <p className="text-muted-foreground">
                För att se besiktningar, aktivera funktionen i inställningarna.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="tenant">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-base">Hyresgäst</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {features.showTenantInfo ? (
              <TenantInformation tenant={mockTenant} />
            ) : (
              <p className="text-muted-foreground">
                För att se hyresgästinformation, aktivera funktionen i inställningarna.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="issues">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span className="text-base">Ärenden</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {features.showApartmentIssues ? (
              <CreateIssue />
            ) : (
              <p className="text-muted-foreground">
                För att se felanmälningar, aktivera funktionen i inställningarna.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
