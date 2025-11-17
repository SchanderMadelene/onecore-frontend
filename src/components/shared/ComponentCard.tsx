import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Component } from "@/data/components";

interface ComponentCardProps {
  component: Component;
}

export const ComponentCard = ({ component }: ComponentCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCategory = component.type === "category";

  if (isCategory && component.components) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="w-full">
          <CollapsibleTrigger className="w-full text-left">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">{component.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {component.componentCount} st
                  </Badge>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                />
              </div>
              <p className="text-sm text-muted-foreground">{component.location}</p>
            </CardHeader>
            <CardContent className="pt-0 pb-4">
              <div className="space-y-1">
                {component.specifications.map((spec, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{spec.label}:</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="border-t border-border mx-6 mb-4"></div>
            <CardContent className="pt-0 space-y-3">
              <p className="text-sm font-medium text-muted-foreground mb-3">Komponenter i kategorin:</p>
              {component.components.map((subComponent) => (
                <Card key={subComponent.id} className="bg-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">{subComponent.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{subComponent.location}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      {subComponent.specifications.map((spec, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{spec.label}:</span>
                          <span className="font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  }

  // Standalone component
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{component.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{component.location}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {component.specifications.map((spec, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{spec.label}:</span>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
