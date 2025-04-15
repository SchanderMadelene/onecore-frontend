
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Beaker } from "lucide-react";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";

export function BetaSettings() {
  const { features, handleFeatureToggle } = useFeatureToggles();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Beaker className="h-5 w-5" />
          <CardTitle>Betafunktioner</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="navigation">Navigation</Label>
              <p className="text-sm text-muted-foreground">Visa hierarkisk navigeringsmeny</p>
            </div>
            <Switch 
              id="navigation"
              checked={features.showNavigation}
              onCheckedChange={() => handleFeatureToggle('showNavigation')}
            />
          </div>
          
          <div className="pl-6 space-y-4 border-l">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="rentals">Uthyrning</Label>
                <p className="text-sm text-muted-foreground">Aktivera uthyrningsfunktioner</p>
              </div>
              <Switch 
                id="rentals"
                checked={features.showRentals}
                disabled={!features.showNavigation}
                onCheckedChange={() => handleFeatureToggle('showRentals')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="design-system">Designsystem</Label>
                <p className="text-sm text-muted-foreground">Visa sidan för designsystem</p>
              </div>
              <Switch 
                id="design-system"
                checked={features.showDesignSystem}
                disabled={!features.showNavigation}
                onCheckedChange={() => handleFeatureToggle('showDesignSystem')}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

