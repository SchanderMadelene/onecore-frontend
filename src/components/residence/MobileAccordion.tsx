
import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Info, ClipboardList, Users, MessageSquare } from "lucide-react";
import { Card } from "../ui/card";
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
  const [openItem, setOpenItem] = useState<string>("info"); // Default open item
  
  return (
    <Accordion type="single" collapsible defaultValue="info" 
      onValueChange={(value) => value && setOpenItem(value)}>
      <AccordionItem value="info">
        <AccordionTrigger className="py-3 px-4">
          <div className="flex items-center gap-1.5">
            <Info className="h-4 w-4" />
            <span>Rumsinformation</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {features.showRoomInformation ? (
            <ResidenceInfo 
              rooms={rooms}
              getOrientationText={getOrientationText}
            />
          ) : (
            <Card className="p-4">
              <p className="text-muted-foreground">
                För att se rumsinformation, aktivera funktionen i inställningarna.
              </p>
            </Card>
          )}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="inspections">
        <AccordionTrigger className="py-3 px-4">
          <div className="flex items-center gap-1.5">
            <ClipboardList className="h-4 w-4" />
            <span>Besiktningar</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {features.showInspections ? (
            <ResidenceInspection
              rooms={rooms}
            />
          ) : (
            <Card className="p-4">
              <p className="text-muted-foreground">
                För att se besiktningar, aktivera funktionen i inställningarna.
              </p>
            </Card>
          )}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="tenant">
        <AccordionTrigger className="py-3 px-4">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>Hyresgäst</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {features.showTenantInfo ? (
            <Card className="p-4">
              <TenantInformation tenant={mockTenant} />
            </Card>
          ) : (
            <Card className="p-4">
              <p className="text-muted-foreground">
                För att se hyresgästinformation, aktivera funktionen i inställningarna.
              </p>
            </Card>
          )}
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="issues">
        <AccordionTrigger className="py-3 px-4">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" />
            <span>Ärenden</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {features.showApartmentIssues ? (
            <CreateIssue />
          ) : (
            <Card className="p-4">
              <p className="text-muted-foreground">
                För att se felanmälningar, aktivera funktionen i inställningarna.
              </p>
            </Card>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
