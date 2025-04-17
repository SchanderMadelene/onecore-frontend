
import { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { LucideIcon } from "lucide-react";

export interface MobileAccordionItem {
  id: string;
  icon: LucideIcon;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface MobileAccordionProps {
  items: MobileAccordionItem[];
  defaultOpen?: string[];
  className?: string;
}

export function MobileAccordion({ 
  items, 
  defaultOpen = [], 
  className = ""
}: MobileAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);
  
  const handleValueChange = (value: string[]) => {
    setOpenItems(value);
  };
  
  return (
    <div className={`space-y-3 ${className}`}>
      <Accordion 
        type="multiple" 
        value={openItems} 
        onValueChange={handleValueChange}
        className="space-y-3"
      >
        {items.map((item) => (
          <AccordionItem 
            key={item.id} 
            value={item.id} 
            disabled={item.disabled}
            className="rounded-lg border border-slate-200 bg-white"
          >
            <AccordionTrigger className="px-4 py-3">
              <div className="flex items-center gap-2">
                <item.icon className="h-5 w-5 text-slate-500" />
                <span className="text-base font-medium">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 pb-4 pt-1">
                {item.content}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
