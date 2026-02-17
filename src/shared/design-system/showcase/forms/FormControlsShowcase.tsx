
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Info } from "lucide-react";

export const FormControlsShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Controls</CardTitle>
        <CardDescription>Input elements used in forms</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="example-input">Default Input</Label>
            <Input id="example-input" placeholder="Enter text..." />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="disabled-input">Disabled Input</Label>
            <Input id="disabled-input" disabled placeholder="Disabled input" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="with-icon" className="flex items-center gap-2">
              <Info className="h-4 w-4" /> Input with Icon
            </Label>
            <div className="relative">
              <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="with-icon" className="pl-9" placeholder="Input with icon..." />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Switch Example</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
