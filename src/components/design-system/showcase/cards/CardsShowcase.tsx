
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentCard } from "./ComponentCard";
import { Monitor, Mail, Camera, Wifi } from "lucide-react";

export const CardsShowcase = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cards</CardTitle>
        <CardDescription>Card components for displaying content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Standard Cards */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Standard Cards</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Example Card</CardTitle>
                <CardDescription>This is a description of the card content</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Main content goes here. The quick brown fox jumps over the lazy dog.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost">Cancel</Button>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
              
              <Tabs defaultValue="tab1" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-100/70 p-1 rounded-lg">
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1" className="p-4 border rounded-md mt-2">
                  Tab 1 content
                </TabsContent>
                <TabsContent value="tab2" className="p-4 border rounded-md mt-2">
                  Tab 2 content
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Component Cards */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Component Cards</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Generella komponentkort för att visa information om systemkomponenter som digital bokningstavla, postboxar, etc.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ComponentCard
              title="Digital bokningstavla"
              description="Interaktiv displayenhet för bokningar"
              status="active"
              icon={Monitor}
              type="Digital display"
              location="Entré A"
              specs={[
                { label: "Modell", value: "TouchScreen Pro 32\"" },
                { label: "Installation", value: "2023-03-15" },
                { label: "Garanti", value: "3 år" }
              ]}
            />
            
            <ComponentCard
              title="Postboxar"
              description="Säkra postlådor för hyresgäster"
              status="active"
              icon={Mail}
              type="Posthantering"
              location="Entré B"
              specs={[
                { label: "Antal", value: "24 st" },
                { label: "Material", value: "Rostfritt stål" },
                { label: "Lås", value: "Elektroniskt" }
              ]}
            />
            
            <ComponentCard
              title="Övervakningskamera"
              description="Säkerhetsövervakning av entré"
              status="maintenance"
              icon={Camera}
              type="Säkerhet"
              location="Entré C"
              specs={[
                { label: "Upplösning", value: "4K Ultra HD" },
                { label: "Nattsyn", value: "Ja" },
                { label: "Lagring", value: "30 dagar" }
              ]}
            />
            
            <ComponentCard
              title="WiFi Access Point"
              description="Trådlös internetuppkoppling"
              status="inactive"
              icon={Wifi}
              type="Nätverk"
              location="Gemensam lokal"
              specs={[
                { label: "Standard", value: "WiFi 6" },
                { label: "Hastighet", value: "1 Gbps" },
                { label: "Räckvidd", value: "50m" }
              ]}
            />
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h5 className="font-medium mb-2">ComponentCard Props</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <code>title</code>: Komponentens namn</li>
              <li>• <code>description</code>: Kort beskrivning (optional)</li>
              <li>• <code>status</code>: "active" | "inactive" | "maintenance"</li>
              <li>• <code>icon</code>: Lucide React ikon (optional)</li>
              <li>• <code>type</code>: Komponenttyp (optional)</li>
              <li>• <code>location</code>: Placering (optional)</li>
              <li>• <code>specs</code>: Array av specifikationer (optional)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
