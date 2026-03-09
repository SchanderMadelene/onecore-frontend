import { Tag } from "@/shared/ui/tag";
import { ComponentDefinition } from "../viewer/types";

export const tagDefinition: ComponentDefinition = {
  name: "Tag",
  description: "Generisk etikett för kategorisering/märkning (byggnadstyper, taggar etc.). Till skillnad från Badge (statusindikator) är Tag avsedd för beskrivande etiketter med anpassade färger.",
  component: Tag,
  props: [
    {
      name: "bg",
      type: "string",
      controlType: "select",
      options: ["bg-muted", "bg-amber-400", "bg-blue-100", "bg-green-100", "bg-red-100", "bg-purple-100", "bg-orange-100"],
      defaultValue: "bg-muted",
      description: "Tailwind bakgrundsfärgklass.",
    },
    {
      name: "color",
      type: "string",
      controlType: "select",
      options: ["text-muted-foreground", "text-black", "text-blue-800", "text-green-800", "text-red-800", "text-purple-800", "text-orange-800"],
      defaultValue: "text-muted-foreground",
      description: "Tailwind textfärgklass.",
    },
    {
      name: "children",
      type: "ReactNode",
      controlType: "text",
      defaultValue: "Bostadsrätt",
      description: "Etikettens innehåll.",
      required: true,
    },
  ],
  defaultCode: '<Tag bg="bg-amber-400" color="text-black">Bostadsrätt</Tag>',
};
