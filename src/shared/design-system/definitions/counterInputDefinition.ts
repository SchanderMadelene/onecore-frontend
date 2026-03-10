import { ComponentDefinition } from "../viewer/types";
import { CounterInput } from "@/shared/common";

export const counterInputDefinition: ComponentDefinition = {
  name: "CounterInput",
  description: "Numerisk räknare med plus/minus-knappar. Används för antal försök, kvantiteter etc.",
  component: CounterInput,
  props: [
    {
      name: "value",
      type: "number",
      controlType: "number",
      defaultValue: 3,
      description: "Aktuellt värde.",
      required: true,
    },
    {
      name: "min",
      type: "number",
      controlType: "number",
      defaultValue: 1,
      description: "Lägsta tillåtna värde.",
    },
    {
      name: "max",
      type: "number",
      controlType: "number",
      defaultValue: 10,
      description: "Högsta tillåtna värde.",
    },
    {
      name: "label",
      type: "string",
      controlType: "text",
      defaultValue: "Antal försök",
      description: "Valfri etikett ovanför räknaren.",
    },
  ],
  defaultCode: `<CounterInput
  value={3}
  onChange={(v) => console.log(v)}
  min={1}
  max={10}
  label="Antal försök"
/>`,
};
