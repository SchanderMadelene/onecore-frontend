import { ComponentDefinition } from "../types";

export const badgeDefinition: ComponentDefinition = {
  name: "Badge",
  description: "Små statusmarkörer för att visa tillstånd, kategorier eller antal.",
  category: "ui",
  importPath: "@/components/ui/badge",
  usage: "Använd för att visa status (Aktiv/Inaktiv), kategorier eller notifieringsantal.",
  props: [
    {
      name: "variant",
      type: "default | secondary | destructive | outline | success | priority-low | priority-medium | priority-high",
      default: "default",
      description: "Visuell stil för badge",
      control: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Secondary", value: "secondary" },
        { label: "Destructive", value: "destructive" },
        { label: "Outline", value: "outline" },
        { label: "Success", value: "success" },
        { label: "Priority Low", value: "priority-low" },
        { label: "Priority Medium", value: "priority-medium" },
        { label: "Priority High", value: "priority-high" },
      ],
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Innehållet i badge (text)",
      control: "text",
      required: true,
    },
  ],
  examples: [
    {
      title: "Aktiv status",
      props: { variant: "success", children: "Aktiv" },
    },
    {
      title: "Väntande",
      props: { variant: "secondary", children: "Väntande" },
    },
    {
      title: "Hög prioritet",
      props: { variant: "priority-high", children: "Hög" },
    },
  ],
};
