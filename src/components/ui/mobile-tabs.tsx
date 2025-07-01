
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
      <TabsList className="grid mb-8 min-h-[44px]" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="min-h-[40px] px-2 text-xs sm:text-sm sm:px-3">
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
