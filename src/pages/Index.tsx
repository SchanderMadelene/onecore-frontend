
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";

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
      </div>
    </PageLayout>
  );
};

export default Index;
