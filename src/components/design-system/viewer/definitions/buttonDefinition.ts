import { ComponentDefinition } from "../types";

export const buttonDefinition: ComponentDefinition = {
  name: "Button",
  description: "Primär interaktionsknapp för formulär och actions. Stödjer flera varianter och storlekar.",
  category: "ui",
  importPath: "@/components/ui/button",
  usage: "Använd för primära actions som 'Spara', 'Skicka', 'Bekräfta'. Välj variant baserat på action-prioritet.",
  props: [
    {
      name: "variant",
      type: "default | secondary | destructive | outline | ghost | link",
      default: "default",
      description: "Visuell stil för knappen",
      control: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Secondary", value: "secondary" },
        { label: "Destructive", value: "destructive" },
        { label: "Outline", value: "outline" },
        { label: "Ghost", value: "ghost" },
        { label: "Link", value: "link" },
      ],
    },
    {
      name: "size",
      type: "default | sm | lg | icon",
      default: "default",
      description: "Storlek på knappen",
      control: "select",
      options: [
        { label: "Default", value: "default" },
        { label: "Small", value: "sm" },
        { label: "Large", value: "lg" },
        { label: "Icon", value: "icon" },
      ],
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Inaktiverar knappen och förhindrar interaktion",
      control: "boolean",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Innehållet i knappen (text, ikon, etc.)",
      control: "text",
      required: true,
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description: "Renderar som child-element istället för button (för React Router Link etc.)",
      control: "boolean",
    },
  ],
  examples: [
    {
      title: "Primär knapp",
      props: { variant: "default", children: "Spara ändringar" },
    },
    {
      title: "Destruktiv action",
      props: { variant: "destructive", children: "Ta bort" },
    },
    {
      title: "Sekundär knapp",
      props: { variant: "secondary", size: "sm", children: "Avbryt" },
    },
  ],
};
