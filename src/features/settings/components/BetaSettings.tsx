import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Beaker, Building, Home, FileText, Users, Key, Palette, ClipboardList, LayoutDashboard, MessageSquare, Calendar, Bell, FileImage, Wallet, StickyNote, Car, Archive, Building2, Box, Settings, ShieldX, DollarSign, Lock, Eye, TrendingUp, Code, Star, RotateCcw } from "lucide-react";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { useRole } from "@/contexts/RoleContext";
import { toast } from "sonner";

export function BetaSettings() {
  const {
    features,
    handleFeatureToggle
  } = useFeatureToggles();
  
  const { devModeEnabled, setDevModeEnabled } = useRole();
  
  const handleResetToDefaults = () => {
    localStorage.removeItem('featureToggles');
    toast.success("Feature toggles återställda! Laddar om sidan...");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Beaker className="h-5 w-5" />
            <CardTitle>Betafunktioner</CardTitle>
          </div>
          <Button variant="outline" size="sm" onClick={handleResetToDefaults} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Återställ till standard
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <Label htmlFor="dev-mode">Utvecklingsläge</Label>
              </div>
              <p className="text-sm text-muted-foreground">Aktivera rollbaserad dashboard-testning</p>
            </div>
            <Switch 
              id="dev-mode" 
              checked={devModeEnabled} 
              onCheckedChange={setDevModeEnabled} 
            />
          </div>

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

                <div className="pl-6 space-y-3 border-l">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        <Label htmlFor="building-entrances">Uppgångar</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Visa uppgångsflik på byggnadskort</p>
                    </div>
                    <Switch 
                      id="building-entrances" 
                      checked={features.showBuildingEntrances} 
                      disabled={!features.showBuildings || !features.showProperties || !features.showNavigation}
                      onCheckedChange={() => handleFeatureToggle('showBuildingEntrances')} 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <Label htmlFor="building-parts">Byggnadsdelar</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Visa byggnadsdelarflik på byggnadskort</p>
                    </div>
                    <Switch 
                      id="building-parts" 
                      checked={features.showBuildingParts} 
                      disabled={!features.showBuildings || !features.showProperties || !features.showNavigation}
                      onCheckedChange={() => handleFeatureToggle('showBuildingParts')} 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Box className="h-4 w-4" />
                        <Label htmlFor="building-spaces">Utrymmen</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Visa utrymmenflik på byggnadskort</p>
                    </div>
                    <Switch 
                      id="building-spaces" 
                      checked={features.showBuildingSpaces} 
                      disabled={!features.showBuildings || !features.showProperties || !features.showNavigation}
                      onCheckedChange={() => handleFeatureToggle('showBuildingSpaces')} 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <Label htmlFor="building-installations">Installationer</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Visa installationerflik på byggnadskort</p>
                    </div>
                    <Switch 
                      id="building-installations" 
                      checked={features.showBuildingInstallations} 
                      disabled={!features.showBuildings || !features.showProperties || !features.showNavigation}
                      onCheckedChange={() => handleFeatureToggle('showBuildingInstallations')} 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        <Label htmlFor="building-parking">Parkering</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Visa parkeringflik på byggnadskort</p>
                    </div>
                    <Switch 
                      id="building-parking" 
                      checked={features.showBuildingParking} 
                      disabled={!features.showBuildings || !features.showProperties || !features.showNavigation}
                      onCheckedChange={() => handleFeatureToggle('showBuildingParking')} 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <Label htmlFor="building-documents">Dokument</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Visa dokumentflik på byggnadskort</p>
                    </div>
                    <Switch 
                      id="building-documents" 
                      checked={features.showBuildingDocuments} 
                      disabled={!features.showBuildings || !features.showProperties || !features.showNavigation}
                      onCheckedChange={() => handleFeatureToggle('showBuildingDocuments')} 
                    />
                  </div>
                </div>

              <div className="space-y-3">
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

                  <div className="pl-6 space-y-3 border-l">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <LayoutDashboard className="h-4 w-4" />
                          <Label htmlFor="room-information">Rumsinformation</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Visa rumsinformation på lägenhetskortet</p>
                      </div>
                      <Switch 
                        id="room-information" 
                        checked={features.showRoomInformation} 
                        disabled={!features.showApartments || !features.showProperties || !features.showNavigation}
                        onCheckedChange={() => handleFeatureToggle('showRoomInformation')} 
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <FileImage className="h-4 w-4" />
                          <Label htmlFor="floorplan">Planritning</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Visa planritningsflik på lägenhetskortet</p>
                      </div>
                      <Switch 
                        id="floorplan" 
                        checked={features.showFloorplan} 
                        disabled={!features.showApartments || !features.showProperties || !features.showNavigation}
                        onCheckedChange={() => handleFeatureToggle('showFloorplan')} 
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <Label htmlFor="documents">Dokument</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Visa dokumentflik på lägenhetskortet</p>
                      </div>
                      <Switch 
                        id="documents" 
                        checked={features.showDocuments} 
                        disabled={!features.showApartments || !features.showProperties || !features.showNavigation}
                        onCheckedChange={() => handleFeatureToggle('showDocuments')} 
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <ClipboardList className="h-4 w-4" />
                          <Label htmlFor="inspections">Besiktning</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Visa besiktningsfunktioner på lägenhetskortet</p>
                      </div>
                      <Switch 
                        id="inspections" 
                        checked={features.showInspections} 
                        disabled={!features.showApartments || !features.showProperties || !features.showNavigation}
                        onCheckedChange={() => handleFeatureToggle('showInspections')} 
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <Label htmlFor="apartment-issues">Ärenden</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Visa ärendefunktioner på lägenhetskortet</p>
                      </div>
                      <Switch 
                        id="apartment-issues" 
                        checked={features.showApartmentIssues} 
                        disabled={!features.showApartments || !features.showProperties || !features.showNavigation}
                        onCheckedChange={() => handleFeatureToggle('showApartmentIssues')} 
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <StickyNote className="h-4 w-4" />
                          <Label htmlFor="residence-notes">Noteringar</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Visa noteringsfunktioner på lägenhetskortet</p>
                      </div>
                      <Switch 
                        id="residence-notes" 
                        checked={features.showResidenceNotes} 
                        disabled={!features.showApartments || !features.showProperties || !features.showNavigation}
                        onCheckedChange={() => handleFeatureToggle('showResidenceNotes')} 
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <Label htmlFor="tenant-info">Hyresgästinformation</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Visa hyresgästinformation på lägenhetskortet</p>
                      </div>
                      <Switch 
                        id="tenant-info" 
                        checked={features.showTenantInfo} 
                        disabled={!features.showApartments || !features.showProperties || !features.showNavigation}
                        onCheckedChange={() => handleFeatureToggle('showTenantInfo')} 
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          <Label htmlFor="residence-access">Lås och passage</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Visa lås- och passagefunktioner på lägenhetskortet</p>
                      </div>
                      <Switch 
                        id="residence-access" 
                        checked={features.showResidenceAccess} 
                        disabled={!features.showApartments || !features.showProperties || !features.showNavigation}
                        onCheckedChange={() => handleFeatureToggle('showResidenceAccess')} 
                      />
                    </div>
                  </div>
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

            <div className="pl-6 space-y-3 border-l">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <Label htmlFor="tenant-contracts">Hyreskontrakt</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Visa hyreskontrakt på kundkort</p>
                </div>
                <Switch 
                  id="tenant-contracts" 
                  checked={features.showTenantContracts} 
                  disabled={!features.showTenants || !features.showNavigation}
                  onCheckedChange={() => handleFeatureToggle('showTenantContracts')} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <Label htmlFor="tenant-queue">Kösystem</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Visa kösystem på kundkort</p>
                </div>
                <Switch 
                  id="tenant-queue" 
                  checked={features.showTenantQueue} 
                  disabled={!features.showTenants || !features.showNavigation}
                  onCheckedChange={() => handleFeatureToggle('showTenantQueue')} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <Label htmlFor="tenant-cases">Ärenden</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Visa ärenden på kundkort</p>
                </div>
                <Switch 
                  id="tenant-cases" 
                  checked={features.showTenantCases} 
                  disabled={!features.showTenants || !features.showNavigation}
                  onCheckedChange={() => handleFeatureToggle('showTenantCases')} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    <Label htmlFor="tenant-ledger">Kundreskontra</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Visa kundreskontra på kundkort</p>
                </div>
                <Switch 
                  id="tenant-ledger" 
                  checked={features.showTenantLedger} 
                  disabled={!features.showTenants || !features.showNavigation}
                  onCheckedChange={() => handleFeatureToggle('showTenantLedger')} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <StickyNote className="h-4 w-4" />
                    <Label htmlFor="tenant-notes">Noteringar</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Visa noteringar på kundkort</p>
                </div>
                <Switch 
                  id="tenant-notes" 
                  checked={features.showTenantNotes} 
                  disabled={!features.showTenants || !features.showNavigation}
                  onCheckedChange={() => handleFeatureToggle('showTenantNotes')} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    <Label htmlFor="tenant-keys">Nyckelknippa</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Visa nyckelknippa på kundkort</p>
                </div>
                <Switch 
                  id="tenant-keys" 
                  checked={features.showTenantKeys} 
                  disabled={!features.showTenants || !features.showNavigation}
                  onCheckedChange={() => handleFeatureToggle('showTenantKeys')} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <Label htmlFor="tenant-events">Händelselogg</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Visa händelselogg på kundkort</p>
                </div>
                <Switch 
                  id="tenant-events" 
                  checked={features.showTenantEvents} 
                  disabled={!features.showTenants || !features.showNavigation}
                  onCheckedChange={() => handleFeatureToggle('showTenantEvents')} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <Label htmlFor="tenant-documents">Dokument</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Visa dokument på kundkort</p>
                </div>
                <Switch 
                  id="tenant-documents" 
                  checked={features.showTenantDocuments} 
                  disabled={!features.showTenants || !features.showNavigation}
                  onCheckedChange={() => handleFeatureToggle('showTenantDocuments')} 
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <ShieldX className="h-4 w-4" />
                  <Label htmlFor="barriers">Spärrar</Label>
                </div>
                <p className="text-sm text-muted-foreground">Aktivera spärrarfunktioner för bostäder och bilplatser</p>
              </div>
              <Switch id="barriers" checked={features.showBarriers} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showBarriers')} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <Label htmlFor="turnover">In- och utflytt</Label>
                </div>
                <p className="text-sm text-muted-foreground">Aktivera funktioner för in- och utflytthantering</p>
              </div>
              <Switch id="turnover" checked={features.showTurnover} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showTurnover')} />
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

            <div className="pl-6 space-y-3 border-l">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <Label htmlFor="rentals-housing">Bostad</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Visa bostadsuthyrning</p>
                </div>
                <Switch 
                  id="rentals-housing" 
                  checked={features.showRentalsHousing} 
                  disabled={!features.showRentals || !features.showNavigation}
                  onCheckedChange={() => handleFeatureToggle('showRentalsHousing')} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    <Label htmlFor="rentals-parking">Bilplats</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Visa bilplatsuthyrning</p>
                </div>
                <Switch 
                  id="rentals-parking" 
                  checked={features.showRentalsParking} 
                  disabled={!features.showRentals || !features.showNavigation}
                  onCheckedChange={() => handleFeatureToggle('showRentalsParking')} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Archive className="h-4 w-4" />
                    <Label htmlFor="rentals-storage">Förråd</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">Visa förrådsuthyrning</p>
                </div>
                <Switch 
                  id="rentals-storage" 
                  checked={features.showRentalsStorage} 
                  disabled={!features.showRentals || !features.showNavigation}
                  onCheckedChange={() => handleFeatureToggle('showRentalsStorage')} 
                />
              </div>
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

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  <Label htmlFor="all-inspections">Besiktningar (Global vy)</Label>
                </div>
                <p className="text-sm text-muted-foreground">Visa global besiktningsvy</p>
              </div>
              <Switch id="all-inspections" checked={features.showAllInspections} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showAllInspections')} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <Label htmlFor="favorites">Favoriter</Label>
                </div>
                <p className="text-sm text-muted-foreground">Visa sidan för sparade sökningar</p>
              </div>
              <Switch id="favorites" checked={features.showFavorites} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showFavorites')} />
            </div>

            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-semibold text-sm">Dashboard-kort</h3>
              <p className="text-xs text-muted-foreground">Välj vilka kort som ska visas på dashboarden</p>
              
              <div className="space-y-3 pl-4 border-l">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <Label htmlFor="dashboard-properties">Fastigheter</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa fastighetskort på dashboarden</p>
                  </div>
                  <Switch id="dashboard-properties" checked={features.showProperties} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showProperties')} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <Label htmlFor="dashboard-tenants">Kunder</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa kundkort på dashboarden</p>
                  </div>
                  <Switch id="dashboard-tenants" checked={features.showTenants} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showTenants')} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      <Label htmlFor="dashboard-rentals">Uthyrning</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa uthyrningskort på dashboarden</p>
                  </div>
                  <Switch id="dashboard-rentals" checked={features.showRentals} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showRentals')} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <ShieldX className="h-4 w-4" />
                      <Label htmlFor="dashboard-barriers">Spärrar</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa spärrkort på dashboarden</p>
                  </div>
                  <Switch id="dashboard-barriers" checked={features.showBarriers} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showBarriers')} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      <Label htmlFor="dashboard-turnover">In- och utflytt</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa in- och utflyttskort på dashboarden</p>
                  </div>
                  <Switch id="dashboard-turnover" checked={features.showTurnover} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showTurnover')} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4" />
                      <Label htmlFor="dashboard-inspections">Besiktningar</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa besiktningskort på dashboarden</p>
                  </div>
                  <Switch id="dashboard-inspections" checked={features.showAllInspections} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showAllInspections')} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <Label htmlFor="dashboard-economy">Ekonomi (XLedger)</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa ekonomikort på dashboarden</p>
                  </div>
                  <Switch id="dashboard-economy" checked={features.showDashboardEconomy} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showDashboardEconomy')} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <Label htmlFor="dashboard-contracts">Hyresadministration & avtal (TenFast)</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa hyresadministrationskort på dashboarden</p>
                  </div>
                  <Switch id="dashboard-contracts" checked={features.showDashboardContracts} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showDashboardContracts')} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <Label htmlFor="dashboard-locks">Lås & passage (Alliera)</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa lås- och passagekort på dashboarden</p>
                  </div>
                  <Switch id="dashboard-locks" checked={features.showDashboardLocks} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showDashboardLocks')} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <Label htmlFor="dashboard-odoo">Ärendehantering (Odoo)</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa ärendehanteringskort på dashboarden</p>
                  </div>
                  <Switch id="dashboard-odoo" checked={features.showDashboardOdoo} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showDashboardOdoo')} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <Label htmlFor="dashboard-greenview">Greenview</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa Greenview-kort på dashboarden</p>
                  </div>
                  <Switch id="dashboard-greenview" checked={features.showDashboardGreenview} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showDashboardGreenview')} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <Label htmlFor="dashboard-curves">Curves (IMD)</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Visa Curves-kort på dashboarden</p>
                  </div>
                  <Switch id="dashboard-curves" checked={features.showDashboardCurves} disabled={!features.showNavigation} onCheckedChange={() => handleFeatureToggle('showDashboardCurves')} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
