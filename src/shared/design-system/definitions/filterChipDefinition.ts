import { FilterChip } from "@/shared/ui/filter-chip";
import { ComponentDefinition } from "../viewer/types";

export const filterChipDefinition: ComponentDefinition = {
  name: "FilterChip",
  description: "Klickbar filterknapp i pill-form. Växlar mellan vald och icke-vald status.",
  component: FilterChip,
  props: [
    {
      name: "selected",
      type: "boolean",
      controlType: "boolean",
      defaultValue: false,
      description: "Om filtret är aktivt/valt.",
    },
    {
      name: "children",
      type: "ReactNode",
      controlType: "text",
      defaultValue: "Lediga",
      description: "Filterchippets text.",
      required: true,
    },
  ],
  defaultCode: '<FilterChip selected={true}>Lediga</FilterChip>',
};
