
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Filter, Check } from "lucide-react";

export const HoverShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hover Effects</CardTitle>
        <CardDescription>
          Demonstration av hover-effekter i systemet med kontrast-förbättringar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Button Hover Effects */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Button Hover Effects</h3>
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Current Implementation */}
            <div className="space-y-3">
              <h4 className="font-medium text-muted-foreground">Nuvarande implementation</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="default" className="hover:bg-primary/90">
                  Primary Hover
                </Button>
                <Button variant="outline" className="border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                  Outline Hover (Dålig kontrast)
                </Button>
                <Button variant="ghost" className="hover:bg-accent hover:text-accent-foreground">
                  Ghost Hover (Dålig kontrast)
                </Button>
                <Button variant="secondary" className="hover:bg-secondary/80">
                  Secondary Hover
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Problem: Outline och Ghost buttons har vit text på grå bakgrund vid hover
              </p>
            </div>

            {/* Improved Implementation */}
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">Förbättrad implementation</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="default" className="hover:bg-primary/90">
                  Primary Hover
                </Button>
                <Button variant="outline" className="border border-input bg-background hover:bg-accent hover:text-primary">
                  Outline Hover (Bättre kontrast)
                </Button>
                <Button variant="ghost" className="hover:bg-accent hover:text-primary">
                  Ghost Hover (Bättre kontrast)
                </Button>
                <Button variant="secondary" className="hover:bg-secondary/80">
                  Secondary Hover
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Lösning: Använd mörk text (#1A1F2C) istället för vit på grå hover-bakgrund
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Table Header Hover Effects */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Table Header Hover Effects</h3>
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Current FilterableTableHead */}
            <div className="space-y-3">
              <h4 className="font-medium text-muted-foreground">Nuvarande FilterableTableHead</h4>
              <div className="border rounded p-4 bg-muted/50">
                <div className="flex items-center justify-between group">
                  <span className="font-medium">Kolumnrubrik</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-accent-foreground"
                  >
                    <Filter className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Problem: Filter-ikonen blir svårläslig vid hover (vit på grå)
              </p>
            </div>

            {/* Improved FilterableTableHead */}
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">Förbättrad FilterableTableHead</h4>
              <div className="border rounded p-4 bg-muted/50">
                <div className="flex items-center justify-between group">
                  <span className="font-medium">Kolumnrubrik</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-primary"
                  >
                    <Filter className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Lösning: Mörk text för bättre läsbarhet på grå hover-bakgrund
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Interactive Hover Examples */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Interaktiva Hover-exempel</h3>
          <div className="space-y-4">
            
            {/* Card Hover */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Card Hover Effect</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Hover för att se skugga-effekt
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Card Background Hover</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Hover för att se bakgrunds-förändring
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* List Item Hover */}
            <div className="space-y-2">
              <h4 className="font-medium">List Item Hover Effects</h4>
              <div className="border rounded-md">
                {['Första objektet', 'Andra objektet', 'Tredje objektet'].map((item, index) => (
                  <div 
                    key={index}
                    className="p-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <span>{item}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-primary"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Contrast Guidelines */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Kontrast-riktlinjer</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-red-600">❌ Undvik</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Vit text (#FFFFFF) på grå bakgrund (#6B7280)</li>
                <li>• Ljusgrå text på ljusgrå bakgrund</li>
                <li>• Kontrast-förhållande under 4.5:1</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">✅ Använd istället</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Mörk text (#1A1F2C) på grå bakgrund (#6B7280)</li>
                <li>• Vit text på mörk bakgrund</li>
                <li>• Kontrast-förhållande över 4.5:1</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
