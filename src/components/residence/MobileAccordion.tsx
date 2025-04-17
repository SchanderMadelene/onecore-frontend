
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
  const [openItems, setOpenItems] = useState<string[]>(["info"]); // Default: info section open
  
  const handleValueChange = (value: string[]) => {
    setOpenItems(value);
  };
  
  const renderAccordionSection = (
    id: string, 
    icon: React.ReactNode, 
    title: string, 
    featureFlag: boolean, 
    content: React.ReactNode,
    disabledMessage: string
  ) => {
    const isOpen = openItems.includes(id);
    
    return (
      <Card className={cn(
        "overflow-hidden transition-all",
        isOpen ? "ring-1 ring-primary/20 shadow-md" : ""
      )}>
        <Accordion 
          type="multiple" 
          value={openItems} 
          onValueChange={handleValueChange}
          className="border-0"
        >
          <AccordionItem value={id} className="border-0">
            <AccordionTrigger className="py-4 px-5 hover:no-underline group">
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "p-1.5 rounded-md",
                  isOpen ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  {icon}
                </div>
                <span className={cn(
                  "font-medium", 
                  isOpen ? "text-primary" : ""
                )}>
                  {title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0 border-t">
              {featureFlag ? (
                <div className="p-5">
                  {content}
                </div>
              ) : (
                <div className="p-5">
                  <p className="text-muted-foreground">
                    {disabledMessage}
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    );
  };
  
  return (
    <div className="space-y-4">
      {renderAccordionSection(
        "info",
        <Info className="h-4 w-4" />,
        "Rumsinformation",
        features.showRoomInformation,
        <ResidenceInfo rooms={rooms} getOrientationText={getOrientationText} />,
        "För att se rumsinformation, aktivera funktionen i inställningarna."
      )}
      
      {renderAccordionSection(
        "inspections",
        <ClipboardList className="h-4 w-4" />,
        "Besiktningar",
        features.showInspections,
        <ResidenceInspection rooms={rooms} />,
        "För att se besiktningar, aktivera funktionen i inställningarna."
      )}
      
      {renderAccordionSection(
        "tenant",
        <Users className="h-4 w-4" />,
        "Hyresgäst",
        features.showTenantInfo,
        <TenantInformation tenant={mockTenant} />,
        "För att se hyresgästinformation, aktivera funktionen i inställningarna."
      )}
      
      {renderAccordionSection(
        "issues",
        <MessageSquare className="h-4 w-4" />,
        "Ärenden",
        features.showApartmentIssues,
        <CreateIssue />,
        "För att se felanmälningar, aktivera funktionen i inställningarna."
      )}
    </div>
  );
}
