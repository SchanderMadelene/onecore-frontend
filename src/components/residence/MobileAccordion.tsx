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
  // Change to array of open item IDs instead of single string or null
  const [openItems, setOpenItems] = useState<string[]>(["info"]); // Default: info section open
  
  const handleValueChange = (value: string) => {
    setOpenItems(current => {
      // If item is already open, remove it from the array (close it)
      if (current.includes(value)) {
        return current.filter(item => item !== value);
      } 
      // Otherwise add it to the array (open it)
      return [...current, value];
    });
  };
  
  return (
    <div className="space-y-4">
      <Card className={cn(
        "overflow-hidden transition-all",
        openItems.includes("info") ? "ring-2 ring-primary/10" : ""
      )}>
        <Accordion 
          type="multiple" 
          value={openItems} 
          onValueChange={(value) => setOpenItems(value)}
          className="border-0"
        >
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
        openItems.includes("inspections") ? "ring-2 ring-primary/10" : ""
      )}>
        <Accordion 
          type="multiple" 
          value={openItems.includes("inspections") ? ["inspections"] : []}
          onValueChange={(value) => {
            if (value.includes("inspections")) {
              if (!openItems.includes("inspections")) {
                setOpenItems([...openItems, "inspections"]);
              }
            } else {
              setOpenItems(openItems.filter(item => item !== "inspections"));
            }
          }}
          className="border-0"
        >
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
        openItems.includes("tenant") ? "ring-2 ring-primary/10" : ""
      )}>
        <Accordion 
          type="multiple" 
          value={openItems.includes("tenant") ? ["tenant"] : []}
          onValueChange={(value) => {
            if (value.includes("tenant")) {
              if (!openItems.includes("tenant")) {
                setOpenItems([...openItems, "tenant"]);
              }
            } else {
              setOpenItems(openItems.filter(item => item !== "tenant"));
            }
          }}
          className="border-0"
        >
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
        openItems.includes("issues") ? "ring-2 ring-primary/10" : ""
      )}>
        <Accordion 
          type="multiple" 
          value={openItems.includes("issues") ? ["issues"] : []}
          onValueChange={(value) => {
            if (value.includes("issues")) {
              if (!openItems.includes("issues")) {
                setOpenItems([...openItems, "issues"]);
              }
            } else {
              setOpenItems(openItems.filter(item => item !== "issues"));
            }
          }}
          className="border-0"
        >
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
