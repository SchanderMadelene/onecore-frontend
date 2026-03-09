import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComponentDefinition } from "../viewer/types";

// Wrapper needed because Select is a compound component
const SelectDemo = ({ disabled }: { disabled?: boolean }) => (
  <Select disabled={disabled}>
    <SelectTrigger className="w-[200px]">
      <SelectValue placeholder="Välj alternativ..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option-1">Alternativ 1</SelectItem>
      <SelectItem value="option-2">Alternativ 2</SelectItem>
      <SelectItem value="option-3">Alternativ 3</SelectItem>
    </SelectContent>
  </Select>
);

export const selectDefinition: ComponentDefinition = {
  name: "Select",
  description: "Dropdown-meny för att välja ett alternativ ur en lista. Compound component med SelectTrigger, SelectContent och SelectItem.",
  component: SelectDemo,
  props: [
    {
      name: "disabled",
      type: "boolean",
      controlType: "boolean",
      defaultValue: false,
      description: "Inaktivera hela select-komponenten.",
    },
  ],
  defaultCode: `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Välj alternativ..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option-1">Alternativ 1</SelectItem>
    <SelectItem value="option-2">Alternativ 2</SelectItem>
  </SelectContent>
</Select>`,
};
