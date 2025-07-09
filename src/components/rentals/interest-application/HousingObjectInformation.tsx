import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";

export const HousingObjectInformation = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Home className="h-5 w-5 text-muted-foreground" />
          Objektinformation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Typ</p>
          <p className="font-medium">Allmän bostadskö</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Beskrivning</p>
          <p className="text-sm">Intresseanmälan för allmän bostadskö. Kunden kommer att få köpoäng och stå i kön för lediga bostäder.</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Köregler</p>
          <p className="text-sm">Kunder får köpoäng baserat på registreringstid. Vid ledig bostad erbjuds den till kunden med mest köpoäng som uppfyller kraven.</p>
        </div>
      </CardContent>
    </Card>
  );
};