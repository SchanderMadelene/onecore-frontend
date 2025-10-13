import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateComponentModal } from "./UpdateComponentModal";

export const UpdateComponentModalShowcase = () => {
  const [isOpen, setIsOpen] = useState(false);

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

        <div className="pt-4">
          <Button onClick={() => setIsOpen(true)} size="lg">
            Öppna Modal
          </Button>
        </div>

        <UpdateComponentModal open={isOpen} onOpenChange={setIsOpen} />
      </CardContent>
    </Card>
  );
};
