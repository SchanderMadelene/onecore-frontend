import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contact, Key, ShieldX, ArrowRightLeft, ClipboardList, Building, DollarSign, FileText, Lock, MessageSquare, Eye, ExternalLink, TrendingUp, Database } from "lucide-react";
import { useFeatureToggles } from "@/contexts/FeatureTogglesContext";
import { useRole, roleLabels, UserRole } from "@/contexts/RoleContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import onecoreLogo from "@/assets/logos/stacked/onecore_logo_stacked_color.png";
const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const {
    features
  } = useFeatureToggles();
  const {
    currentRole,
    setCurrentRole,
    devModeEnabled,
    isCardVisibleForRole
  } = useRole();

  // Define card configurations
  const cardConfigs = [{
    id: "properties",
    title: "Fastigheter",
    icon: Building,
    description: "Hantera fastighetsbestånd och byggnader",
    path: "/properties",
    isExternal: false,
    enabled: features.showProperties
  }, {
    id: "tenants",
    title: "Kunder",
    icon: Contact,
    description: "Kundregister och hyresgästinformation",
    path: "/tenants/all",
    isExternal: false,
    enabled: features.showTenants
  }, {
    id: "rentals",
    title: "Uthyrning",
    icon: Key,
    description: "Hantera uthyrning av lägenheter",
    path: "/rentals",
    isExternal: false,
    enabled: features.showRentals
  }, {
    id: "barriers",
    title: "Spärrar",
    icon: ShieldX,
    description: "Hantera spärrar och begränsningar",
    path: "/barriers",
    isExternal: false,
    enabled: features.showBarriers
  }, {
    id: "turnover",
    title: "In- och utflytt",
    icon: ArrowRightLeft,
    description: "Hantera in- och utflyttningsprocesser",
    path: "/turnover",
    isExternal: false,
    enabled: features.showTurnover
  }, {
    id: "inspections",
    title: "Besiktningar",
    icon: ClipboardList,
    description: "Genomför och hantera besiktningar",
    path: "/inspections",
    isExternal: false,
    enabled: features.showAllInspections
  }, {
    id: "xledger",
    title: "Ekonomi",
    icon: DollarSign,
    description: "Ekonomi och redovisning",
    path: "/",
    isExternal: false,
    enabled: features.showDashboardEconomy
  }, {
    id: "tenfast",
    title: "Hyresadministration & avtal",
    icon: FileText,
    description: "Hyreshantering och administration",
    path: "/",
    isExternal: false,
    enabled: features.showDashboardContracts
  }, {
    id: "alliera",
    title: "Lås & passage",
    icon: Lock,
    description: "Låssystem och passagekontroll",
    path: "https://alliera.se",
    isExternal: true,
    enabled: features.showDashboardLocks
  }, {
    id: "odoo",
    title: "Ärendehantering (Odoo)",
    icon: MessageSquare,
    description: "Hantera ärenden och support",
    path: "https://odoo.com",
    isExternal: true,
    enabled: features.showDashboardOdoo
  }, {
    id: "greenview",
    title: "Greenview",
    icon: Eye,
    description: "Översikt och rapportering",
    path: "https://greenview.se",
    isExternal: true,
    enabled: features.showDashboardGreenview
  }, {
    id: "curves",
    title: "Curves",
    icon: TrendingUp,
    description: "IMD",
    path: "https://curves.com",
    isExternal: true,
    enabled: features.showDashboardCurves
  }].filter(config => config.enabled && isCardVisibleForRole(config.id));
  const handleCardClick = (config: typeof cardConfigs[0]) => {
    if (config.isExternal) {
      window.open(config.path, '_blank');
    } else {
      navigate(config.path);
    }
  };
  return <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-10">
        <header className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-center py-0 my-0">
              <div className="text-center my-[8px]">Hej [namn] välkommen till</div>
              <img src={onecoreLogo} alt="OneCore" className="h-20 md:h-24 mt-6 mx-auto" />
            </h1>
            {devModeEnabled && <Badge variant="outline" className="text-xs">
                Dev Mode
              </Badge>}
          </div>
          {devModeEnabled && <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <Select value={currentRole} onValueChange={value => setCurrentRole(value as UserRole)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Välj roll" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(roleLabels).map(([value, label]) => <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>}
        </header>
        
        <div className="max-w-3xl mx-auto">
          <Card className="animate-fade-in hover-scale border-2">
            <CardContent className="p-8 md:p-10 text-center space-y-6">
              <div className="space-y-4">
                <p className="text-xl md:text-2xl font-medium leading-relaxed">
                  Vi är glada att ha dig här!
                </p>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
                  ONECore är din digitala arbetsplats där allt du behöver för att 
                  göra ditt bästa arbete finns samlat på ett ställe. Ta det i din egen takt och utforska 
                  systemet - du kommer att märka hur enkelt det är att navigera mellan olika funktioner.
                </p>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm md:text-base text-muted-foreground">
                  Har du frågor eller behöver hjälp? Tveka inte att höra av dig till
                </p>
                <div className="flex items-center justify-center gap-2 mt-2 text-base md:text-lg font-semibold">
                  <span className="text-primary">David</span>
                  <span className="text-muted-foreground">eller</span>
                  <span className="text-primary">Lina</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Vi finns här för att stötta dig!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cardConfigs.map(config => {
          const IconComponent = config.icon;
          return <Card key={config.id} className={`hover-scale animate-fade-in cursor-pointer transition-all duration-200 ${config.isExternal ? 'bg-gradient-to-br from-background to-muted/20 border-muted-foreground/20' : ''}`} onClick={() => handleCardClick(config)}>
                <CardHeader className="pb-3 relative">
                  <CardTitle className={`flex items-center gap-3 text-lg ${config.isExternal ? 'text-accent-foreground' : ''}`}>
                    <IconComponent className="h-5 w-5 text-primary" />
                    {config.title}
                  </CardTitle>
                  {config.isExternal && <ExternalLink className="h-4 w-4 text-muted-foreground absolute top-4 right-4" />}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                  {config.isExternal && <p className="text-xs text-muted-foreground/70 mt-2 italic">Extern tjänst</p>}
                </CardContent>
              </Card>;
        })}
        </div>
      </div>
    </PageLayout>;
};
export default Index;