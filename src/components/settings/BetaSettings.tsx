import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Beaker, Building, Home, FileText, Users, Key, Palette, ClipboardList, 
  LayoutDashboard, MessageSquare, Calendar, Bell, FileImage, Wallet, 
  StickyNote, Car, Archive, Building2, Box, Settings, ShieldX, DollarSign, 
  Lock, Eye, TrendingUp, Code, Star, RotateCcw, MapPin, ChevronDown,
  LucideIcon
} from "lucide-react";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { useRole } from "@/contexts/RoleContext";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FeatureTogglesInterface {
  [key: string]: boolean;
}


// Reusable toggle item
function ToggleItem({ 
  id, icon: Icon, label, description, checked, disabled, onToggle 
}: { 
  id: string; 
  icon: LucideIcon; 
  label: string; 
  description: string; 
  checked: boolean; 
  disabled?: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <Label htmlFor={id}>{label}</Label>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch id={id} checked={checked} disabled={disabled} onCheckedChange={onToggle} />
    </div>
  );
}

// Collapsible section wrapper
function ToggleSection({ 
  title, icon: Icon, children, defaultOpen = false, toggleKeys
}: { 
  title: string; 
  icon: LucideIcon; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
  toggleKeys?: (keyof FeatureTogglesInterface)[];
}) {
  const { features } = useFeatureToggles();
  const [open, setOpen] = useState(defaultOpen);

  // Count active toggles
  const activeCount = toggleKeys?.filter(key => features[key as string]).length ?? 0;
  const totalCount = toggleKeys?.length ?? 0;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-sm">{title}</span>
          {totalCount > 0 && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {activeCount} av {totalCount}
            </span>
          )}
        </div>
        <ChevronDown className={cn(
          "h-4 w-4 text-muted-foreground transition-transform",
          open && "rotate-180"
        )} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pt-1 pb-2 space-y-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function BetaSettings() {
  const { features, handleFeatureToggle } = useFeatureToggles();
  const { devModeEnabled, setDevModeEnabled } = useRole();
  
  const handleResetToDefaults = () => {
    localStorage.removeItem('featureToggles');
    toast.success("Feature toggles återställda! Laddar om sidan...");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  
  const navDisabled = !features.showNavigation;

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
      <CardContent className="space-y-3">
        {/* General / always-visible toggles */}
        <div className="space-y-1 pb-3 border-b">
          <ToggleItem
            id="dev-mode"
            icon={Code}
            label="Utvecklingsläge"
            description="Aktivera rollbaserad dashboard-testning"
            checked={devModeEnabled}
            onToggle={() => setDevModeEnabled(!devModeEnabled)}
          />
          <ToggleItem
            id="navigation"
            icon={LayoutDashboard}
            label="Navigation"
            description="Visa hierarkisk navigeringsmeny"
            checked={features.showNavigation}
            onToggle={() => handleFeatureToggle('showNavigation')}
          />
        </div>

        {/* Fastigheter */}
        <ToggleSection title="Fastigheter" icon={Building} defaultOpen={false} toggleKeys={['showProperties']}>
          <ToggleItem
            id="properties"
            icon={Building}
            label="Fastigheter"
            description="Visa fastighetsfunktioner"
            checked={features.showProperties}
            disabled={navDisabled}
            onToggle={() => handleFeatureToggle('showProperties')}
          />
        </ToggleSection>

        {/* Byggnader */}
        <ToggleSection title="Byggnadsflikar" icon={Building2} toggleKeys={['showBuildings', 'showBuildingEntrances', 'showBuildingParts', 'showBuildingSpaces', 'showBuildingInstallations', 'showBuildingParking', 'showBuildingDocuments']}>
          <ToggleItem id="buildings" icon={Building} label="Byggnader" description="Visa byggnadskort" checked={features.showBuildings} disabled={!features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showBuildings')} />
          <div className="pl-4 border-l space-y-1">
            <ToggleItem id="building-entrances" icon={Home} label="Uppgångar" description="Visa uppgångsflik på byggnadskort" checked={features.showBuildingEntrances} disabled={!features.showBuildings || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showBuildingEntrances')} />
            <ToggleItem id="building-parts" icon={Building2} label="Byggnadsdelar" description="Visa byggnadsdelarflik" checked={features.showBuildingParts} disabled={!features.showBuildings || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showBuildingParts')} />
            <ToggleItem id="building-spaces" icon={Box} label="Utrymmen" description="Visa utrymmenflik" checked={features.showBuildingSpaces} disabled={!features.showBuildings || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showBuildingSpaces')} />
            <ToggleItem id="building-installations" icon={Settings} label="Installationer" description="Visa installationerflik" checked={features.showBuildingInstallations} disabled={!features.showBuildings || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showBuildingInstallations')} />
            <ToggleItem id="building-parking" icon={Car} label="Parkering" description="Visa parkeringflik" checked={features.showBuildingParking} disabled={!features.showBuildings || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showBuildingParking')} />
            <ToggleItem id="building-documents" icon={FileText} label="Dokument" description="Visa dokumentflik" checked={features.showBuildingDocuments} disabled={!features.showBuildings || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showBuildingDocuments')} />
          </div>
        </ToggleSection>

        {/* Lägenheter */}
        <ToggleSection title="Lägenhetsflikar" icon={Home} toggleKeys={['showApartments', 'showRoomInformation', 'showFloorplan', 'showDocuments', 'showInspections', 'showApartmentIssues', 'showResidenceNotes', 'showTenantInfo', 'showResidenceAccess']}>
          <ToggleItem id="apartments" icon={Home} label="Lägenheter" description="Visa lägenhetskort" checked={features.showApartments} disabled={!features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showApartments')} />
          <div className="pl-4 border-l space-y-1">
            <ToggleItem id="room-information" icon={LayoutDashboard} label="Rumsinformation" description="Visa rumsinformation på lägenhetskortet" checked={features.showRoomInformation} disabled={!features.showApartments || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showRoomInformation')} />
            <ToggleItem id="floorplan" icon={FileImage} label="Planritning" description="Visa planritningsflik" checked={features.showFloorplan} disabled={!features.showApartments || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showFloorplan')} />
            <ToggleItem id="documents" icon={FileText} label="Dokument" description="Visa dokumentflik" checked={features.showDocuments} disabled={!features.showApartments || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showDocuments')} />
            <ToggleItem id="inspections" icon={ClipboardList} label="Besiktning" description="Visa besiktningsfunktioner" checked={features.showInspections} disabled={!features.showApartments || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showInspections')} />
            <ToggleItem id="apartment-issues" icon={MessageSquare} label="Ärenden" description="Visa ärendefunktioner" checked={features.showApartmentIssues} disabled={!features.showApartments || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showApartmentIssues')} />
            <ToggleItem id="residence-notes" icon={StickyNote} label="Noteringar" description="Visa noteringsfunktioner" checked={features.showResidenceNotes} disabled={!features.showApartments || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showResidenceNotes')} />
            <ToggleItem id="tenant-info" icon={Users} label="Hyresgästinformation" description="Visa hyresgästinformation" checked={features.showTenantInfo} disabled={!features.showApartments || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showTenantInfo')} />
            <ToggleItem id="residence-access" icon={Key} label="Lås och passage" description="Visa lås- och passagefunktioner" checked={features.showResidenceAccess} disabled={!features.showApartments || !features.showProperties || navDisabled} onToggle={() => handleFeatureToggle('showResidenceAccess')} />
          </div>
        </ToggleSection>

        {/* Kunder */}
        <ToggleSection title="Kunder" icon={Users} toggleKeys={['showTenants', 'showTenantContracts', 'showTenantQueue', 'showTenantCases', 'showTenantLedger', 'showTenantNotes', 'showTenantKeys', 'showTenantEvents', 'showTenantDocuments']}>
          <ToggleItem id="tenants" icon={Users} label="Kunder" description="Visa kundfunktioner" checked={features.showTenants} disabled={navDisabled} onToggle={() => handleFeatureToggle('showTenants')} />
          <div className="pl-4 border-l space-y-1">
            <ToggleItem id="tenant-contracts" icon={FileText} label="Hyreskontrakt" description="Visa hyreskontrakt på kundkort" checked={features.showTenantContracts} disabled={!features.showTenants || navDisabled} onToggle={() => handleFeatureToggle('showTenantContracts')} />
            <ToggleItem id="tenant-queue" icon={Users} label="Kösystem" description="Visa kösystem på kundkort" checked={features.showTenantQueue} disabled={!features.showTenants || navDisabled} onToggle={() => handleFeatureToggle('showTenantQueue')} />
            <ToggleItem id="tenant-cases" icon={MessageSquare} label="Ärenden" description="Visa ärenden på kundkort" checked={features.showTenantCases} disabled={!features.showTenants || navDisabled} onToggle={() => handleFeatureToggle('showTenantCases')} />
            <ToggleItem id="tenant-ledger" icon={Wallet} label="Kundreskontra" description="Visa kundreskontra på kundkort" checked={features.showTenantLedger} disabled={!features.showTenants || navDisabled} onToggle={() => handleFeatureToggle('showTenantLedger')} />
            <ToggleItem id="tenant-notes" icon={StickyNote} label="Noteringar" description="Visa noteringar på kundkort" checked={features.showTenantNotes} disabled={!features.showTenants || navDisabled} onToggle={() => handleFeatureToggle('showTenantNotes')} />
            <ToggleItem id="tenant-keys" icon={Key} label="Nyckelknippa" description="Visa nyckelknippa på kundkort" checked={features.showTenantKeys} disabled={!features.showTenants || navDisabled} onToggle={() => handleFeatureToggle('showTenantKeys')} />
            <ToggleItem id="tenant-events" icon={Bell} label="Händelselogg" description="Visa händelselogg på kundkort" checked={features.showTenantEvents} disabled={!features.showTenants || navDisabled} onToggle={() => handleFeatureToggle('showTenantEvents')} />
            <ToggleItem id="tenant-documents" icon={FileText} label="Dokument" description="Visa dokument på kundkort" checked={features.showTenantDocuments} disabled={!features.showTenants || navDisabled} onToggle={() => handleFeatureToggle('showTenantDocuments')} />
          </div>
        </ToggleSection>

        {/* Uthyrning */}
        <ToggleSection title="Uthyrning" icon={Key} toggleKeys={['showRentals', 'showRentalsHousing', 'showRentalsParking', 'showRentalsStorage']}>
          <ToggleItem id="rentals" icon={Key} label="Uthyrning" description="Aktivera uthyrningsfunktioner" checked={features.showRentals} disabled={navDisabled} onToggle={() => handleFeatureToggle('showRentals')} />
          <div className="pl-4 border-l space-y-1">
            <ToggleItem id="rentals-housing" icon={Home} label="Bostad" description="Visa bostadsuthyrning" checked={features.showRentalsHousing} disabled={!features.showRentals || navDisabled} onToggle={() => handleFeatureToggle('showRentalsHousing')} />
            <ToggleItem id="rentals-parking" icon={Car} label="Bilplats" description="Visa bilplatsuthyrning" checked={features.showRentalsParking} disabled={!features.showRentals || navDisabled} onToggle={() => handleFeatureToggle('showRentalsParking')} />
            <ToggleItem id="rentals-storage" icon={Archive} label="Förråd" description="Visa förrådsuthyrning" checked={features.showRentalsStorage} disabled={!features.showRentals || navDisabled} onToggle={() => handleFeatureToggle('showRentalsStorage')} />
          </div>
        </ToggleSection>

        {/* Övriga sidor */}
        <ToggleSection title="Övriga sidor" icon={Star} toggleKeys={['showBarriers', 'showTurnover', 'showDesignSystem', 'showAllInspections', 'showFavorites', 'showLeaseContracts', 'showStrofakturaUnderlag', 'showPropertyAreas']}>
          <ToggleItem id="barriers" icon={ShieldX} label="Spärrar" description="Aktivera spärrarfunktioner för bostäder och bilplatser" checked={features.showBarriers} disabled={navDisabled} onToggle={() => handleFeatureToggle('showBarriers')} />
          <ToggleItem id="turnover" icon={Key} label="In- och utflytt" description="Aktivera funktioner för in- och utflytthantering" checked={features.showTurnover} disabled={navDisabled} onToggle={() => handleFeatureToggle('showTurnover')} />
          <ToggleItem id="design-system" icon={Palette} label="Designsystem" description="Visa sidan för designsystem" checked={features.showDesignSystem} disabled={navDisabled} onToggle={() => handleFeatureToggle('showDesignSystem')} />
          <ToggleItem id="all-inspections" icon={ClipboardList} label="Besiktningar (Global vy)" description="Visa global besiktningsvy" checked={features.showAllInspections} disabled={navDisabled} onToggle={() => handleFeatureToggle('showAllInspections')} />
          <ToggleItem id="favorites" icon={Star} label="Favoriter" description="Visa sidan för sparade sökningar" checked={features.showFavorites} disabled={navDisabled} onToggle={() => handleFeatureToggle('showFavorites')} />
          <ToggleItem id="lease-contracts" icon={FileText} label="Hyreskontrakt" description="Visa sidan för hyreskontrakt" checked={features.showLeaseContracts} disabled={navDisabled} onToggle={() => handleFeatureToggle('showLeaseContracts')} />
          <ToggleItem id="strofaktura" icon={Wallet} label="Ströfaktura underlag" description="Visa sidan för ströfaktura underlag" checked={features.showStrofakturaUnderlag} disabled={navDisabled} onToggle={() => handleFeatureToggle('showStrofakturaUnderlag')} />
          <ToggleItem id="property-areas" icon={MapPin} label="Förvaltningsområden" description="Visa sidan för förvaltnings- och kvartersvärdsområden" checked={features.showPropertyAreas} disabled={navDisabled} onToggle={() => handleFeatureToggle('showPropertyAreas')} />
        </ToggleSection>

        {/* Dashboard-kort */}
        <ToggleSection title="Dashboard-kort" icon={LayoutDashboard} toggleKeys={['showProperties', 'showTenants', 'showRentals', 'showBarriers', 'showTurnover', 'showAllInspections', 'showDashboardEconomy', 'showDashboardContracts', 'showDashboardLocks', 'showDashboardOdoo', 'showDashboardGreenview', 'showDashboardCurves']}>
          <p className="text-xs text-muted-foreground pb-1">Välj vilka kort som ska visas på dashboarden</p>
          <ToggleItem id="dashboard-properties" icon={Building} label="Fastigheter" description="Visa fastighetskort på dashboarden" checked={features.showProperties} disabled={navDisabled} onToggle={() => handleFeatureToggle('showProperties')} />
          <ToggleItem id="dashboard-tenants" icon={Users} label="Kunder" description="Visa kundkort på dashboarden" checked={features.showTenants} disabled={navDisabled} onToggle={() => handleFeatureToggle('showTenants')} />
          <ToggleItem id="dashboard-rentals" icon={Key} label="Uthyrning" description="Visa uthyrningskort på dashboarden" checked={features.showRentals} disabled={navDisabled} onToggle={() => handleFeatureToggle('showRentals')} />
          <ToggleItem id="dashboard-barriers" icon={ShieldX} label="Spärrar" description="Visa spärrkort på dashboarden" checked={features.showBarriers} disabled={navDisabled} onToggle={() => handleFeatureToggle('showBarriers')} />
          <ToggleItem id="dashboard-turnover" icon={Key} label="In- och utflytt" description="Visa in- och utflyttskort på dashboarden" checked={features.showTurnover} disabled={navDisabled} onToggle={() => handleFeatureToggle('showTurnover')} />
          <ToggleItem id="dashboard-inspections" icon={ClipboardList} label="Besiktningar" description="Visa besiktningskort på dashboarden" checked={features.showAllInspections} disabled={navDisabled} onToggle={() => handleFeatureToggle('showAllInspections')} />
          <ToggleItem id="dashboard-economy" icon={DollarSign} label="Ekonomi (XLedger)" description="Visa ekonomikort på dashboarden" checked={features.showDashboardEconomy} disabled={navDisabled} onToggle={() => handleFeatureToggle('showDashboardEconomy')} />
          <ToggleItem id="dashboard-contracts" icon={FileText} label="Hyresadministration & avtal (TenFast)" description="Visa hyresadministrationskort" checked={features.showDashboardContracts} disabled={navDisabled} onToggle={() => handleFeatureToggle('showDashboardContracts')} />
          <ToggleItem id="dashboard-locks" icon={Lock} label="Lås & passage (Alliera)" description="Visa lås- och passagekort" checked={features.showDashboardLocks} disabled={navDisabled} onToggle={() => handleFeatureToggle('showDashboardLocks')} />
          <ToggleItem id="dashboard-odoo" icon={MessageSquare} label="Ärendehantering (Odoo)" description="Visa ärendehanteringskort" checked={features.showDashboardOdoo} disabled={navDisabled} onToggle={() => handleFeatureToggle('showDashboardOdoo')} />
          <ToggleItem id="dashboard-greenview" icon={Eye} label="Greenview" description="Visa Greenview-kort" checked={features.showDashboardGreenview} disabled={navDisabled} onToggle={() => handleFeatureToggle('showDashboardGreenview')} />
          <ToggleItem id="dashboard-curves" icon={TrendingUp} label="Curves (IMD)" description="Visa Curves-kort" checked={features.showDashboardCurves} disabled={navDisabled} onToggle={() => handleFeatureToggle('showDashboardCurves')} />
        </ToggleSection>
      </CardContent>
    </Card>
  );
}
