
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function AppearanceSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Utseende</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="system" className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Ljust läge</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark">Mörkt läge</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="system" />
            <Label htmlFor="system">Systemets läge</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
