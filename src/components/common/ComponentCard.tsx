
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, MoreVertical, FileText, Sparkles, Edit, History } from "lucide-react";
import { useState } from "react";
import { Component } from "@/components/common/components-data";
import { useToast } from "@/hooks/use-toast";
import { PhotoAnalyzeModal, AIAnalysisResult } from "./PhotoAnalyzeModal";
import { UpdateComponentModal } from "@/components/design-system/showcase/components/UpdateComponentModal";
import type { ComponentLocation } from "@/types/api";

interface ComponentCardProps {
  component: Component;
}

export const ComponentCard = ({ component }: ComponentCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoAnalyzeOpen, setPhotoAnalyzeOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [aiSuggestedValues, setAiSuggestedValues] = useState<AIAnalysisResult | null>(null);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const isCategory = component.type === "category";
  const { toast } = useToast();

  // Mock location for UpdateComponentModal
  const mockLocation: ComponentLocation = {
    propertyId: "prop-1",
    propertyName: "Testfastighet",
    level: "building",
  };

  const handleCreateOrder = () => {
    toast({
      title: "Skapa ärende",
      description: `Skapar ärende för ${component.name}`,
    });
  };

  const handlePhotoAnalyze = () => {
    setPhotoAnalyzeOpen(true);
  };

  const handleAnalysisComplete = (result: AIAnalysisResult, imageDataUrl: string) => {
    setAiSuggestedValues(result);
    setAttachedImage(imageDataUrl);
    setUpdateModalOpen(true);
  };

  const handleUpdate = () => {
    setAiSuggestedValues(null);
    setAttachedImage(null);
    setUpdateModalOpen(true);
  };

  const handleShowHistory = () => {
    toast({
      title: "Visa historik",
      description: `Visar historik för ${component.name}`,
    });
  };

  const ComponentActions = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-background z-50">
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          handleCreateOrder();
        }}>
          <FileText className="mr-2 h-4 w-4" />
          Skapa ärende
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          handlePhotoAnalyze();
        }}>
          <Sparkles className="mr-2 h-4 w-4" />
          Fota & analysera
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          handleUpdate();
        }}>
          <Edit className="mr-2 h-4 w-4" />
          Uppdatera
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.stopPropagation();
          handleShowHistory();
        }}>
          <History className="mr-2 h-4 w-4" />
          Visa historik
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
                <div className="flex items-center gap-1">
                  <ComponentActions />
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </div>
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
    <>
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <CardTitle className="text-base">{component.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{component.location}</p>
            </div>
            <ComponentActions />
          </div>
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

      <PhotoAnalyzeModal
        open={photoAnalyzeOpen}
        onOpenChange={setPhotoAnalyzeOpen}
        componentName={component.name}
        onAnalysisComplete={handleAnalysisComplete}
      />

      <UpdateComponentModal
        open={updateModalOpen}
        onOpenChange={setUpdateModalOpen}
        location={mockLocation}
        component={{
          id: component.id,
          name: component.name,
          type: component.type,
        }}
        aiSuggestedValues={aiSuggestedValues || undefined}
        attachedImage={attachedImage || undefined}
      />
    </>
  );
};
