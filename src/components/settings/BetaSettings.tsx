import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Beaker, Building, Home, FileText, Users, Key, Palette } from "lucide-react";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
export function BetaSettings() {
  const {
    features,
    handleFeatureToggle
  } = useFeatureToggles();
  return <Card>
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
            <Switch id="navigation" checked={features.showNavigation} onCheckedChange={() => handleFeatureToggle('showNavigation')} />
          </div>
          
          <div className="pl-6 space-y-4 border-l">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <Label htmlFor="properties">Fastigheter</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Visa fastighetsfunktioner</p>
                </div>
                <Switch id="properties" checked={features.showProperties} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showProperties')} />
              </div>

              <div className="pl-6 space-y-3 border-l">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <Label htmlFor="buildings">Byggnader</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa byggnadskort</p>
                  </div>
                  <Switch id="buildings" checked={features.showBuildings} disabled={!features.showProperties || !features.showNavigation} onCheckedChange={() => handleFeatureToggle('showBuildings')} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      <Label htmlFor="apartments">Lägenheter</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa lägenhetskort</p>
                  </div>
                  <Switch id="apartments" checked={features.showApartments} disabled={!features.showProperties || !features.showNavigation} onCheckedChange={() => handleFeatureToggle('showApartments')} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <Label htmlFor="tenants">Kunder</Label>
                </div>
                <p className="text-sm text-muted-foreground">Visa kundfunktioner</p>
              </div>
              <Switch id="tenants" checked={features.showTenants} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showTenants')} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <Label htmlFor="rentals">Uthyrning</Label>
                </div>
                <p className="text-sm text-muted-foreground">Aktivera uthyrningsfunktioner</p>
              </div>
              <Switch id="rentals" checked={features.showRentals} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showRentals')} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <Label htmlFor="design-system">Designsystem</Label>
                </div>
                <p className="text-sm text-muted-foreground">Visa sidan för designsystem</p>
              </div>
              <Switch id="design-system" checked={features.showDesignSystem} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showDesignSystem')} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
}