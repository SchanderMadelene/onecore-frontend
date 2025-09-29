
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contact, Key, ShieldX, ArrowRightLeft, ClipboardList, Building, DollarSign, FileText, Lock, MessageSquare, Eye, ExternalLink } from "lucide-react";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Define card configurations
  const cardConfigs = [
    { id: "properties", title: "Fastigheter", icon: Building, description: "Hantera fastighetsbestånd och byggnader", path: "/properties", isExternal: false },
    { id: "tenants", title: "Kunder", icon: Contact, description: "Kundregister och hyresgästinformation", path: "/tenants/all", isExternal: false },
    { id: "rentals", title: "Uthyrning", icon: Key, description: "Hantera uthyrning av lägenheter", path: "/rentals", isExternal: false },
    { id: "barriers", title: "Spärrar", icon: ShieldX, description: "Hantera spärrar och begränsningar", path: "/barriers", isExternal: false },
    { id: "turnover", title: "In- och utflytt", icon: ArrowRightLeft, description: "Hantera in- och utflyttningsprocesser", path: "/turnover", isExternal: false },
    { id: "inspections", title: "Besiktningar", icon: ClipboardList, description: "Genomför och hantera besiktningar", path: "/inspections", isExternal: false },
    { id: "xledger", title: "Ekonomisystem (Xledger)", icon: DollarSign, description: "Ekonomi och redovisning", path: "/", isExternal: false },
    { id: "tenfast", title: "Hyresadministration (Tenfast)", icon: FileText, description: "Hyreshantering och administration", path: "/", isExternal: false },
    { id: "alliera", title: "Lås & passage (Alliera)", icon: Lock, description: "Låssystem och passagekontroll", path: "https://alliera.se", isExternal: true },
    { id: "odoo", title: "Ärendehantering (Odoo)", icon: MessageSquare, description: "Hantera ärenden och support", path: "https://odoo.com", isExternal: true },
    { id: "greenview", title: "Greenview", icon: Eye, description: "Översikt och rapportering", path: "https://greenview.se", isExternal: true }
  ];

  const handleCardClick = (config: typeof cardConfigs[0]) => {
    if (config.isExternal) {
      window.open(config.path, '_blank');
    } else {
      navigate(config.path);
    }
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <header className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Hej [namn] välkommen till ONECore</h1>
        </header>
        
        <div className="max-w-2xl mx-auto">
          <Card className="animate-fade-in hover-scale">
            <CardContent className="p-8 text-center space-y-4">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Vi är glada att ha dig här! ONECore är din digitala arbetsplats där allt du behöver för att 
                göra ditt bästa arbete finns samlat på ett ställe. Ta det i din egen takt och utforska 
                systemet - du kommer att märka hur enkelt det är att navigera mellan olika funktioner.
              </p>
              <p className="text-base text-muted-foreground">
                Har du frågor eller behöver hjälp? Tveka inte att höra av dig till <span className="font-semibold text-primary">David</span> eller <span className="font-semibold text-primary">Lina</span> - 
                vi finns här för att stötta dig!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cardConfigs.map((config) => {
            const IconComponent = config.icon;
            return (
              <Card 
                key={config.id}
                className={`hover-scale animate-fade-in cursor-pointer transition-all duration-200 ${
                  config.isExternal 
                    ? 'bg-gradient-to-br from-background to-muted/20 border-muted-foreground/20' 
                    : ''
                }`}
                onClick={() => handleCardClick(config)}
              >
                <CardHeader className="pb-3 relative">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <IconComponent className="h-5 w-5 text-primary" />
                    {config.title}
                  </CardTitle>
                  {config.isExternal && (
                    <ExternalLink className="h-4 w-4 text-muted-foreground absolute top-4 right-4" />
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                  {config.isExternal && (
                    <p className="text-xs text-muted-foreground/70 mt-2 italic">Extern tjänst</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
