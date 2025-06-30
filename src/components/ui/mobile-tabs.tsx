
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  tabs: Array<{
    value: string;
    label: string;
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
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Välj kategori" />
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => (
              <SelectItem key={tab.value} value={tab.value}>
                {tab.label}
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
      <TabsList className="grid grid-cols-5 mb-8">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
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
