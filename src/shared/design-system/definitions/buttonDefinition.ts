import { Button } from "@/components/ui/button";
import { ComponentDefinition } from "../viewer/types";

export const buttonDefinition: ComponentDefinition = {
  name: "Button",
  description: "Primär interaktionskomponent med flera varianter och storlekar.",
  component: Button,
  props: [
    {
      name: "variant",
      type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
      controlType: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
      defaultValue: "default",
      description: "Visuell stil för knappen.",
    },
    {
      name: "size",
      type: '"default" | "sm" | "lg" | "icon"',
      controlType: "select",
      options: ["default", "sm", "lg", "icon"],
      defaultValue: "default",
      description: "Storlek på knappen.",
    },
    {
      name: "disabled",
      type: "boolean",
      controlType: "boolean",
      defaultValue: false,
      description: "Inaktivera knappen.",
    },
    {
      name: "children",
      type: "ReactNode",
      controlType: "text",
      defaultValue: "Button",
      description: "Knappens innehåll.",
      required: true,
    },
  ],
  defaultCode: '<Button variant="default">Klicka här</Button>',
};
