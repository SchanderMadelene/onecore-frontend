import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateComponentModal } from "./UpdateComponentModal";
import type { ComponentLocation } from "@/types/api";

export const UpdateComponentModalShowcase = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeExample, setActiveExample] = useState<"room" | "entrance" | "building-space">("room");

  const exampleLocations: Record<"room" | "entrance" | "building-space", ComponentLocation> = {
    room: {
      level: "room",
      propertyName: "Älgen 1",
      propertyId: "algen-1",
      buildingName: "Bellmansgatan 1A - 2C",
      buildingId: "bellmansgatan-1a-2c",
      entranceName: "Bellmansgatan 1A",
      entranceId: "E1",
      residenceName: "LGH-001",
      residenceId: "A1",
      currentRoom: { id: "2", name: "Kök" },
      availableRooms: [
        { id: "1", name: "Vardagsrum" },
        { id: "2", name: "Kök" },
        { id: "3", name: "Sovrum 1" },
        { id: "4", name: "Badrum" },
        { id: "5", name: "Sovrum 2" },
        { id: "6", name: "Hall" }
      ]
    },
    entrance: {
      level: "entrance",
      propertyName: "Älgen 1",
      propertyId: "algen-1",
      buildingName: "Bellmansgatan 1A - 2C",
      buildingId: "bellmansgatan-1a-2c",
      currentEntrance: { id: "E1", name: "Bellmansgatan 1A" },
      availableEntrances: [
        { id: "E1", name: "Bellmansgatan 1A" },
        { id: "E2", name: "Bellmansgatan 1B" },
        { id: "E3", name: "Bellmansgatan 1C" }
      ]
    },
    "building-space": {
      level: "building-space",
      propertyName: "Älgen 1",
      propertyId: "algen-1",
      buildingName: "Bellmansgatan 1A - 2C",
      buildingId: "bellmansgatan-1a-2c",
      currentSpace: { id: "8", name: "Tvättstuga", type: "Tvättstugor i byggnaden" },
      availableSpaces: [
        { id: "8", name: "Tvättstuga", type: "Tvättstugor i byggnaden" },
        { id: "9", name: "Miljöstation", type: "Miljöbodar i byggnaden" },
        { id: "10", name: "UC Värme", type: "Teknikutrymmen" }
      ]
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uppdatera Komponent Modal</CardTitle>
        <CardDescription>
          Modal för att uppdatera komponentdata efter att ett ärende är utfört.
          Exemplet visar byte av en diskmaskin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-semibold">Användningsområde</h4>
          <p className="text-sm text-muted-foreground">
            När ett ärende är avslutat i Odoo och användaren väljer att uppdatera
            komponentdata i OneCore, öppnas denna modal. Den visar:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
            <li>Ärendeinformation (read-only) - vad som gjordes</li>
            <li>Komponentinformation före uppdatering (read-only)</li>
            <li>Formulär för att uppdatera komponenten med ny data</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Funktioner</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
            <li>Obligatoriska fält: Status och Åtgärd</li>
            <li>Datumväljare med kalendergränssnitt</li>
            <li>Valfria fält för märke, modell och energiklass</li>
            <li>Kommentarsfält för ytterligare information</li>
            <li>Möjlighet att ladda upp bilder</li>
            <li>Färgkodade status-badges (grön=aktiv, gul=underhåll, röd=ur funktion)</li>
            <li>Responsiv design (två kolumner desktop, stack mobile)</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Dataflöde (framtida implementation)</h4>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 ml-4">
            <li>Odoo anropar OneCore API med ärendeID och komponentID</li>
            <li>OneCore hämtar aktuell komponentdata</li>
            <li>Modal öppnas med förifylld data</li>
            <li>Användaren uppdaterar och sparar</li>
            <li>POST till OneCore API med uppdaterad data + ärendeID</li>
            <li>OneCore sparar och skapar historikpost</li>
            <li>Bekräftelse skickas tillbaka till Odoo</li>
          </ol>
        </div>

        <Tabs value={activeExample} onValueChange={(v) => setActiveExample(v as typeof activeExample)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="room">Rum</TabsTrigger>
            <TabsTrigger value="entrance">Uppgång</TabsTrigger>
            <TabsTrigger value="building-space">Utrymme</TabsTrigger>
          </TabsList>
          <TabsContent value="room" className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Exempel:</strong> Diskmaskin i Kök, LGH-001, Uppgång Bellmansgatan 1A
            </p>
            <Button onClick={() => setIsOpen(true)} size="lg">
              Öppna Modal - Rum
            </Button>
          </TabsContent>
          <TabsContent value="entrance" className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Exempel:</strong> Postbox på Uppgång Bellmansgatan 1A
            </p>
            <Button onClick={() => setIsOpen(true)} size="lg">
              Öppna Modal - Uppgång
            </Button>
          </TabsContent>
          <TabsContent value="building-space" className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <strong>Exempel:</strong> Tvättmaskin i Tvättstuga
            </p>
            <Button onClick={() => setIsOpen(true)} size="lg">
              Öppna Modal - Utrymme
            </Button>
          </TabsContent>
        </Tabs>

        <UpdateComponentModal 
          open={isOpen} 
          onOpenChange={setIsOpen}
          location={exampleLocations[activeExample]}
          component={{
            id: "comp-123",
            name: activeExample === "room" ? "Diskmaskin" : activeExample === "entrance" ? "Postbox" : "Tvättmaskin",
            type: activeExample === "room" ? "Vitvaror" : activeExample === "entrance" ? "Posthantering" : "Tvättutrustning"
          }}
          orderId="ORD-2025-0445"
        />
      </CardContent>
    </Card>
  );
};
