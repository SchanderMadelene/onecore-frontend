
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  tabs: Array<{
    value: string;
    label: string | React.ReactNode;
    content: React.ReactNode;
  }>;
  className?: string;
}

export function MobileTabs({ value, onValueChange, tabs, className = "" }: MobileTabsProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className="w-full min-h-[44px]">
            <SelectValue placeholder="Välj kategori" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            {tabs.map((tab) => (
              <SelectItem key={tab.value} value={tab.value} className="min-h-[44px] py-3">
                {typeof tab.label === 'string' ? tab.label : <span>{tab.label}</span>}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {tabs.map((tab) => (
          <div key={tab.value} className={value === tab.value ? "block" : "hidden"}>
            {tab.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Tabs value={value} onValueChange={onValueChange} className={`w-full ${className}`}>
      <TabsList className="h-auto mb-8 p-1 flex flex-wrap justify-start gap-1">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="min-h-[40px] px-3 py-2 text-sm whitespace-nowrap flex-shrink-0">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
