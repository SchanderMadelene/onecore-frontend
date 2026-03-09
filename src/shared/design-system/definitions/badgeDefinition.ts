import { Badge } from "@/components/ui/badge";
import { ComponentDefinition } from "../viewer/types";

export const badgeDefinition: ComponentDefinition = {
  name: "Badge",
  description: "Statusindikator med semantiska varianter för olika användningsområden.",
  component: Badge,
  props: [
    {
      name: "variant",
      type: '"default" | "secondary" | "destructive" | "success" | "outline" | "muted" | "info" | "warning" | "purple"',
      controlType: "select",
      options: ["default", "secondary", "destructive", "success", "outline", "muted", "info", "warning", "purple"],
      defaultValue: "default",
      description: "Visuell stil/semantik för badge.",
    },
    {
      name: "size",
      type: '"default" | "icon"',
      controlType: "select",
      options: ["default", "icon"],
      defaultValue: "default",
      description: "Storlek på badge.",
    },
    {
      name: "children",
      type: "ReactNode",
      controlType: "text",
      defaultValue: "Badge",
      description: "Badge-innehåll.",
      required: true,
    },
  ],
  defaultCode: '<Badge variant="success">Godkänd</Badge>',
};
