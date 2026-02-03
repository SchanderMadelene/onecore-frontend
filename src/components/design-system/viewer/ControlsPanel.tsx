import { PropDefinition, ComponentState } from "./types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface ControlsPanelProps {
  props: PropDefinition[];
  values: ComponentState;
  onChange: (name: string, value: unknown) => void;
  className?: string;
}

export const ControlsPanel = ({
  props,
  values,
  onChange,
  className,
}: ControlsPanelProps) => {
  const renderControl = (prop: PropDefinition) => {
    const value = values[prop.name];

    switch (prop.control) {
      case "select":
        return (
          <Select
            value={String(value ?? prop.default ?? "")}
            onValueChange={(v) => onChange(prop.name, v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Välj..." />
            </SelectTrigger>
            <SelectContent>
              {prop.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "boolean":
        return (
          <div className="flex items-center gap-2">
            <Switch
              checked={Boolean(value ?? (prop.default === "true"))}
              onCheckedChange={(checked) => onChange(prop.name, checked)}
            />
            <span className="text-sm text-muted-foreground">
              {value ? "true" : "false"}
            </span>
          </div>
        );

      case "text":
        return (
          <Input
            value={String(value ?? prop.default ?? "")}
            onChange={(e) => onChange(prop.name, e.target.value)}
            placeholder={prop.default || "Ange värde..."}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            value={String(value ?? prop.default ?? "")}
            onChange={(e) => onChange(prop.name, Number(e.target.value))}
          />
        );

      case "radio":
        return (
          <RadioGroup
            value={String(value ?? prop.default ?? "")}
            onValueChange={(v) => onChange(prop.name, v)}
            className="flex flex-wrap gap-3"
          >
            {prop.options?.map((option) => (
              <div key={option.value} className="flex items-center gap-1.5">
                <RadioGroupItem value={option.value} id={`${prop.name}-${option.value}`} />
                <Label
                  htmlFor={`${prop.name}-${option.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
        Kontroller
      </h3>
      <div className="space-y-4">
        {props.map((prop) => (
          <div key={prop.name} className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              {prop.name}
              {prop.required && (
                <span className="text-destructive text-xs">*</span>
              )}
            </Label>
            {renderControl(prop)}
            <p className="text-xs text-muted-foreground">{prop.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
