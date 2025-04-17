
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
import { cn } from "@/lib/utils";

interface MobileAccordionProps {
  rooms: Room[];
  getOrientationText: (orientation: number) => string;
}

export function MobileAccordion({ rooms, getOrientationText }: MobileAccordionProps) {
  const { features } = useFeatureToggles();
  const [openItem, setOpenItem] = useState<string>("info"); // Default open item
  
  return (
    <div className="space-y-4">
      <Card className={cn(
        "overflow-hidden transition-all",
        openItem === "info" ? "ring-2 ring-primary/10" : ""
      )}>
        <Accordion type="single" collapsible value={openItem} 
          onValueChange={(value) => value && setOpenItem(value)}
          className="border-0">
          <AccordionItem value="info" className="border-0">
            <div className="border-b-0">
              <AccordionTrigger className="py-3 px-4 hover:no-underline">
                <div className="flex items-center gap-1.5">
                  <Info className="h-4 w-4" />
                  <span>Rumsinformation</span>
                </div>
              </AccordionTrigger>
            </div>
            <AccordionContent className="pb-0 border-t">
              {features.showRoomInformation ? (
                <div className="px-4 py-4">
                  <ResidenceInfo 
                    rooms={rooms}
                    getOrientationText={getOrientationText}
                  />
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-muted-foreground">
                    För att se rumsinformation, aktivera funktionen i inställningarna.
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
      
      <Card className={cn(
        "overflow-hidden transition-all",
        openItem === "inspections" ? "ring-2 ring-primary/10" : ""
      )}>
        <Accordion type="single" collapsible value={openItem === "inspections" ? "inspections" : ""} 
          onValueChange={(value) => value && setOpenItem(value)}
          className="border-0">
          <AccordionItem value="inspections" className="border-0">
            <div className="border-b-0">
              <AccordionTrigger className="py-3 px-4 hover:no-underline">
                <div className="flex items-center gap-1.5">
                  <ClipboardList className="h-4 w-4" />
                  <span>Besiktningar</span>
                </div>
              </AccordionTrigger>
            </div>
            <AccordionContent className="pb-0 border-t">
              {features.showInspections ? (
                <div className="px-4 py-4">
                  <ResidenceInspection
                    rooms={rooms}
                  />
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-muted-foreground">
                    För att se besiktningar, aktivera funktionen i inställningarna.
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
      
      <Card className={cn(
        "overflow-hidden transition-all",
        openItem === "tenant" ? "ring-2 ring-primary/10" : ""
      )}>
        <Accordion type="single" collapsible value={openItem === "tenant" ? "tenant" : ""} 
          onValueChange={(value) => value && setOpenItem(value)}
          className="border-0">
          <AccordionItem value="tenant" className="border-0">
            <div className="border-b-0">
              <AccordionTrigger className="py-3 px-4 hover:no-underline">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>Hyresgäst</span>
                </div>
              </AccordionTrigger>
            </div>
            <AccordionContent className="pb-0 border-t">
              {features.showTenantInfo ? (
                <div className="px-4 py-4">
                  <TenantInformation tenant={mockTenant} />
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-muted-foreground">
                    För att se hyresgästinformation, aktivera funktionen i inställningarna.
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
      
      <Card className={cn(
        "overflow-hidden transition-all",
        openItem === "issues" ? "ring-2 ring-primary/10" : ""
      )}>
        <Accordion type="single" collapsible value={openItem === "issues" ? "issues" : ""} 
          onValueChange={(value) => value && setOpenItem(value)}
          className="border-0">
          <AccordionItem value="issues" className="border-0">
            <div className="border-b-0">
              <AccordionTrigger className="py-3 px-4 hover:no-underline">
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4" />
                  <span>Ärenden</span>
                </div>
              </AccordionTrigger>
            </div>
            <AccordionContent className="pb-0 border-t">
              {features.showApartmentIssues ? (
                <div className="px-4 py-4">
                  <CreateIssue />
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-muted-foreground">
                    För att se felanmälningar, aktivera funktionen i inställningarna.
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
