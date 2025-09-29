
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contact, Key, ShieldX, ArrowRightLeft, ClipboardList, Palette, Building, Home } from "lucide-react";

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          {/* Fastigheter */}
          <Card className="hover-scale animate-fade-in cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Building className="h-5 w-5 text-primary" />
                Fastigheter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Hantera fastighetsbestånd och byggnader</p>
            </CardContent>
          </Card>

          {/* Kunder */}
          <Card className="hover-scale animate-fade-in cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Contact className="h-5 w-5 text-primary" />
                Kunder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kundregister och hyresgästinformation</p>
            </CardContent>
          </Card>

          {/* Uthyrning */}
          <Card className="hover-scale animate-fade-in cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Key className="h-5 w-5 text-primary" />
                Uthyrning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Hantera uthyrning av lägenheter</p>
            </CardContent>
          </Card>

          {/* Spärrar */}
          <Card className="hover-scale animate-fade-in cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <ShieldX className="h-5 w-5 text-primary" />
                Spärrar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Hantera spärrar och begränsningar</p>
            </CardContent>
          </Card>

          {/* In- och utflytt */}
          <Card className="hover-scale animate-fade-in cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <ArrowRightLeft className="h-5 w-5 text-primary" />
                In- och utflytt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Hantera in- och utflyttningsprocesser</p>
            </CardContent>
          </Card>

          {/* Besiktningar */}
          <Card className="hover-scale animate-fade-in cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <ClipboardList className="h-5 w-5 text-primary" />
                Besiktningar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Genomför och hantera besiktningar</p>
            </CardContent>
          </Card>

          {/* Lägenheter */}
          <Card className="hover-scale animate-fade-in cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Home className="h-5 w-5 text-primary" />
                Lägenheter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Översikt och hantering av lägenheter</p>
            </CardContent>
          </Card>

          {/* Design System */}
          <Card className="hover-scale animate-fade-in cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Palette className="h-5 w-5 text-primary" />
                Design System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Designsystem och komponenter</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
