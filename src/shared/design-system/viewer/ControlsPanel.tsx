import { PropDefinition } from "./types";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ControlsPanelProps {
  props: PropDefinition[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

export const ControlsPanel = ({ props, values, onChange }: ControlsPanelProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Kontroller</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {props.map((prop) => (
          <div key={prop.name} className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{prop.name}</Label>
            {prop.controlType === "select" && prop.options && (
              <Select
                value={String(values[prop.name] ?? prop.defaultValue ?? "")}
                onValueChange={(v) => onChange(prop.name, v)}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {prop.options.map((opt) => (
                    <SelectItem key={opt} value={opt} className="text-xs">
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {prop.controlType === "boolean" && (
              <Switch
                checked={values[prop.name] ?? prop.defaultValue ?? false}
                onCheckedChange={(v) => onChange(prop.name, v)}
              />
            )}
            {prop.controlType === "text" && (
              <Input
                className="h-8 text-xs"
                value={values[prop.name] ?? prop.defaultValue ?? ""}
                onChange={(e) => onChange(prop.name, e.target.value)}
              />
            )}
            {prop.controlType === "number" && (
              <Input
                type="number"
                className="h-8 text-xs"
                value={values[prop.name] ?? prop.defaultValue ?? 0}
                onChange={(e) => onChange(prop.name, Number(e.target.value))}
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
