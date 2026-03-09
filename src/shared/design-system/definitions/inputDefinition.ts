import { Input } from "@/components/ui/input";
import { ComponentDefinition } from "../viewer/types";

export const inputDefinition: ComponentDefinition = {
  name: "Input",
  description: "Textfält för användarinmatning med stöd för olika typer och placeholder.",
  component: Input,
  props: [
    {
      name: "type",
      type: '"text" | "email" | "password" | "number" | "search" | "tel" | "url"',
      controlType: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
      defaultValue: "text",
      description: "HTML input-typ.",
    },
    {
      name: "placeholder",
      type: "string",
      controlType: "text",
      defaultValue: "Skriv här...",
      description: "Placeholder-text som visas när fältet är tomt.",
    },
    {
      name: "disabled",
      type: "boolean",
      controlType: "boolean",
      defaultValue: false,
      description: "Inaktivera fältet.",
    },
  ],
  defaultCode: '<Input type="text" placeholder="Skriv här..." />',
};
