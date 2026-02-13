import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LucideIcon } from "lucide-react";
export interface MobileAccordionItem {
  id: string;
  title: string | React.ReactNode;
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
  return <div className={`${className}`}>
      <Accordion type="multiple" value={openItems} onValueChange={handleValueChange} className="space-y-2">
        {items.map(item => <AccordionItem key={item.id} value={item.id} disabled={item.disabled} className="rounded-lg border border-slate-200 bg-white shadow-sm border-l-[2px] !border-l-transparent data-[state=open]:!border-l-primary/40">
            <AccordionTrigger className="px-4 py-3.5">
              <div className="flex items-center gap-2">
                <span className="text-base font-medium">{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 pb-4">
                {item.content}
              </div>
            </AccordionContent>
          </AccordionItem>)}
      </Accordion>
    </div>;
}