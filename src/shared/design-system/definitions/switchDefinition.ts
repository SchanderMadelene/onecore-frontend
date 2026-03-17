import { Switch } from "@/components/ui/switch";
import { ComponentDefinition } from "../viewer/types";

export const switchDefinition: ComponentDefinition = {
  name: "Switch",
  description: "Toggle-kontroll för binära val med visuell checkmark-indikator.",
  component: Switch,
  props: [
    {
      name: "checked",
      type: "boolean",
      controlType: "boolean",
      defaultValue: false,
      description: "Om switchen är aktiverad.",
    },
    {
      name: "disabled",
      type: "boolean",
      controlType: "boolean",
      defaultValue: false,
      description: "Inaktivera switchen.",
    },
  ],
  defaultCode: '<Switch checked={false} />',
};
