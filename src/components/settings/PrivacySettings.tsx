
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function PrivacySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integritet och säkerhet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="profile-visibility">Profilsynlighet</Label>
          <Switch id="profile-visibility" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="data-sharing">Datadelning</Label>
          <Switch id="data-sharing" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="analytics">Analysdata</Label>
          <Switch id="analytics" />
        </div>
      </CardContent>
    </Card>
  );
}
