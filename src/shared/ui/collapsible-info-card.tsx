import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/shared/lib/utils";

interface CollapsibleInfoCardProps {
  title: string | React.ReactNode;
  titleClassName?: string;
  previewContent?: React.ReactNode;
  children: React.ReactNode;
  /** Gör kortet ihopfällbart även på desktop (default: endast mobil) */
  collapsibleOnDesktop?: boolean;
  /** Starta expanderat (default: ihopfällt) */
  defaultOpen?: boolean;
}

export const CollapsibleInfoCard = ({
  title,
  titleClassName,
  previewContent,
  children,
  collapsibleOnDesktop = false,
  defaultOpen = false,
}: CollapsibleInfoCardProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isMobile = useIsMobile();

  if (!isMobile && !collapsibleOnDesktop) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className={titleClassName}>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6">
          {children}
        </CardContent>
      </Card>
    );
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={`rounded-lg bg-white shadow-sm border-l-[2px] ${isOpen ? '!border-l-primary/40' : '!border-l-transparent'}`}>
        <CollapsibleTrigger className="w-full text-left">
          <div className="px-4 py-3.5">
            <div className="flex items-center justify-between">
              <span className={cn("text-base font-medium", titleClassName)}>{title}</span>
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
              />
            </div>
          </div>
          {previewContent && (
            <div className="px-4 pb-4">
              {previewContent}
            </div>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t border-border mx-4 mb-4"></div>
          <div className="px-4 pb-4">
            {children}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
