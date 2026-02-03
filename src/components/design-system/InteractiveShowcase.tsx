import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ComponentViewer } from "./viewer";
import { buttonDefinition, badgeDefinition } from "./viewer/definitions";
import { Loader2 } from "lucide-react";

export const InteractiveShowcase = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Interaktiva Komponenter</h2>
        <p className="text-muted-foreground">
          Testa komponenter med olika props i realtid. Ändra inställningarna till höger för att se hur komponenten förändras.
        </p>
      </div>

      {/* Button Component Viewer */}
      <ComponentViewer
        definition={buttonDefinition}
        defaultProps={{ children: "Klicka här" }}
      >
        {(props) => {
          const variant = props.variant as "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
          const size = props.size as "default" | "sm" | "lg" | "icon";
          
          // For icon size, show a loading icon
          if (size === "icon") {
            return (
              <Button 
                variant={variant} 
                size={size} 
                disabled={Boolean(props.disabled)}
              >
                <Loader2 className="h-4 w-4" />
              </Button>
            );
          }
          
          return (
            <Button 
              variant={variant} 
              size={size} 
              disabled={Boolean(props.disabled)}
            >
              {String(props.children || "Button")}
            </Button>
          );
        }}
      </ComponentViewer>

      {/* Badge Component Viewer */}
      <ComponentViewer
        definition={badgeDefinition}
        defaultProps={{ children: "Status" }}
      >
        {(props) => {
          const variant = props.variant as "default" | "secondary" | "destructive" | "outline" | "success" | "priority-low" | "priority-medium" | "priority-high";
          
          return (
            <Badge variant={variant}>
              {String(props.children || "Badge")}
            </Badge>
          );
        }}
      </ComponentViewer>
    </div>
  );
};
