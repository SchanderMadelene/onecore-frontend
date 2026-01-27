
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profilinställningar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Namn</Label>
          <Input id="name" placeholder="Ditt namn" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-post</Label>
          <Input id="email" type="email" placeholder="din@email.se" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" placeholder="Ditt telefonnummer" />
        </div>
        <Button>Spara ändringar</Button>
      </CardContent>
    </Card>
  );
}
