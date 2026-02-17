import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TabLayout } from "@/components/ui/tab-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { ComponentCard } from "@/components/common";
import { Info } from "lucide-react";
import type { Room } from "@/types/api";
import type { Component } from "@/components/common/components-data";
import { useIsMobile } from "@/hooks/use-mobile";

interface ResidenceInfoProps {
  rooms: Room[];
  getOrientationText: (orientation: number) => string;
}

export const ResidenceInfo = ({ rooms, getOrientationText }: ResidenceInfoProps) => {
  const isMobile = useIsMobile();

  const getComponentsForRoom = (roomId: string): Component[] => {
    if (roomId === "2") { // Kök (RUM-102)
      return [
        {
          id: "kok-1",
          name: "Diskmaskin",
          type: "component",
          location: "Kök",
          specifications: [
            { label: "Fabrikat", value: "Electrolux" },
            { label: "Modell", value: "ESF8650ROW" },
            { label: "Serienummer", value: "DM-2019-0847" },
            { label: "Installationsdatum", value: "2019-03-15" },
            { label: "A-pris", value: "8 500 kr" },
            { label: "Teknisk livslängd", value: "15 år" },
            { label: "Ekonomisk livslängd", value: "12 år" },
            { label: "Garantitid", value: "5 år" },
            { label: "Serviceavtal", value: "Ja" },
            { label: "Senaste service", value: "2024-02-10" },
            { label: "Nästa planerade service", value: "2025-02-10" },
            { label: "Status", value: "Fungerande" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Under bänk" },
            { label: "Byggår", value: "2019" },
            { label: "Dokumentation", value: "Manual tillgänglig" },
            { label: "Statusbesiktning", value: "4" },
          ],
        },
        {
          id: "kok-2",
          name: "Spis",
          type: "component",
          location: "Kök",
          specifications: [
            { label: "Fabrikat", value: "Electrolux" },
            { label: "Modell", value: "EKI6771TOX" },
            { label: "Serienummer", value: "SP-2018-0523" },
            { label: "Installationsdatum", value: "2018-11-08" },
            { label: "A-pris", value: "7 200 kr" },
            { label: "Teknisk livslängd", value: "20 år" },
            { label: "Ekonomisk livslängd", value: "15 år" },
            { label: "Garantitid", value: "3 år" },
            { label: "Serviceavtal", value: "Nej" },
            { label: "Senaste service", value: "-" },
            { label: "Nästa planerade service", value: "2028-11-08" },
            { label: "Status", value: "Fungerande" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Inbyggd" },
            { label: "Byggår", value: "2018" },
            { label: "Dokumentation", value: "Manual, garantibevis" },
            { label: "Statusbesiktning", value: "5" },
          ],
        },
        {
          id: "kok-3",
          name: "Köksbänk",
          type: "component",
          location: "Kök",
          specifications: [
            { label: "Fabrikat", value: "IKEA" },
            { label: "Modell", value: "SÄLJAN" },
            { label: "Serienummer", value: "-" },
            { label: "Installationsdatum", value: "2018-10-20" },
            { label: "A-pris", value: "4 500 kr" },
            { label: "Teknisk livslängd", value: "15 år" },
            { label: "Ekonomisk livslängd", value: "10 år" },
            { label: "Garantitid", value: "25 år" },
            { label: "Serviceavtal", value: "Nej" },
            { label: "Senaste service", value: "-" },
            { label: "Nästa planerade service", value: "-" },
            { label: "Status", value: "Gott skick" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Vägg nord, 3 m" },
            { label: "Byggår", value: "2018" },
            { label: "Dokumentation", value: "Skötselanvisning" },
            { label: "Statusbesiktning", value: "3" },
          ],
        },
        {
          id: "kok-4",
          name: "Köksskåp",
          type: "category",
          location: "Kök",
          componentCount: 2,
          specifications: [
            { label: "Total längd", value: "3.2 m" },
            { label: "Status", value: "Installerade 2018" },
          ],
          components: [
            {
              id: "kok-4-1",
              name: "Överskåp",
              type: "component",
              location: "Kök",
              specifications: [
                { label: "Fabrikat", value: "IKEA" },
                { label: "Modell", value: "METOD" },
                { label: "Serienummer", value: "-" },
                { label: "Installationsdatum", value: "2018-10-20" },
                { label: "A-pris", value: "8 200 kr" },
                { label: "Teknisk livslängd", value: "20 år" },
                { label: "Ekonomisk livslängd", value: "15 år" },
                { label: "Garantitid", value: "10 år" },
                { label: "Serviceavtal", value: "Nej" },
                { label: "Senaste service", value: "-" },
                { label: "Nästa planerade service", value: "-" },
                { label: "Status", value: "Gott skick" },
                { label: "Ansvarig", value: "Teknisk förvaltning" },
                { label: "Placering", value: "Vägg, 6 st" },
                { label: "Byggår", value: "2018" },
                { label: "Dokumentation", value: "Monteringsanvisning" },
                { label: "Statusbesiktning", value: "Godkänd" },
              ],
            },
            {
              id: "kok-4-2",
              name: "Underskåp",
              type: "component",
              location: "Kök",
              specifications: [
                { label: "Fabrikat", value: "IKEA" },
                { label: "Modell", value: "METOD" },
                { label: "Serienummer", value: "-" },
                { label: "Installationsdatum", value: "2018-10-20" },
                { label: "A-pris", value: "12 400 kr" },
                { label: "Teknisk livslängd", value: "20 år" },
                { label: "Ekonomisk livslängd", value: "15 år" },
                { label: "Garantitid", value: "10 år" },
                { label: "Serviceavtal", value: "Nej" },
                { label: "Senaste service", value: "-" },
                { label: "Nästa planerade service", value: "-" },
                { label: "Status", value: "Gott skick" },
                { label: "Ansvarig", value: "Teknisk förvaltning" },
                { label: "Placering", value: "Under bänk, 4 st" },
                { label: "Byggår", value: "2018" },
                { label: "Dokumentation", value: "Monteringsanvisning" },
                { label: "Statusbesiktning", value: "Godkänd" },
              ],
            },
          ],
        },
      ];
    }
    
    if (roomId === "3") { // Badrum
      return [
        {
          id: "bad-1",
          name: "Toalettstol",
          type: "component",
          location: "Badrum",
          specifications: [
            { label: "Fabrikat", value: "Gustavsberg" },
            { label: "Modell", value: "Nautic 5530" },
            { label: "Serienummer", value: "WC-2017-0234" },
            { label: "Installationsdatum", value: "2017-06-12" },
            { label: "A-pris", value: "3 200 kr" },
            { label: "Teknisk livslängd", value: "25 år" },
            { label: "Ekonomisk livslängd", value: "20 år" },
            { label: "Garantitid", value: "5 år" },
            { label: "Serviceavtal", value: "Nej" },
            { label: "Senaste service", value: "-" },
            { label: "Nästa planerade service", value: "-" },
            { label: "Status", value: "Fungerande" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Vägg väst" },
            { label: "Byggår", value: "2017" },
            { label: "Dokumentation", value: "Manual, CE-märkning" },
            { label: "Statusbesiktning", value: "Godkänd" },
          ],
        },
        {
          id: "bad-2",
          name: "Tvättställ",
          type: "component",
          location: "Badrum",
          specifications: [
            { label: "Fabrikat", value: "Gustavsberg" },
            { label: "Modell", value: "Artic 4550" },
            { label: "Serienummer", value: "TS-2017-0235" },
            { label: "Installationsdatum", value: "2017-06-12" },
            { label: "A-pris", value: "2 800 kr" },
            { label: "Teknisk livslängd", value: "25 år" },
            { label: "Ekonomisk livslängd", value: "20 år" },
            { label: "Garantitid", value: "10 år" },
            { label: "Serviceavtal", value: "Nej" },
            { label: "Senaste service", value: "-" },
            { label: "Nästa planerade service", value: "-" },
            { label: "Status", value: "Gott skick" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Vägg öst" },
            { label: "Byggår", value: "2017" },
            { label: "Dokumentation", value: "Manual" },
            { label: "Statusbesiktning", value: "Godkänd" },
          ],
        },
        {
          id: "bad-3",
          name: "Duschkabin",
          type: "component",
          location: "Badrum",
          specifications: [
            { label: "Fabrikat", value: "Hafa" },
            { label: "Modell", value: "Igloo Pro 90x90" },
            { label: "Serienummer", value: "DK-2017-0236" },
            { label: "Installationsdatum", value: "2017-06-15" },
            { label: "A-pris", value: "8 900 kr" },
            { label: "Teknisk livslängd", value: "20 år" },
            { label: "Ekonomisk livslängd", value: "15 år" },
            { label: "Garantitid", value: "5 år" },
            { label: "Serviceavtal", value: "Nej" },
            { label: "Senaste service", value: "2023-04-20" },
            { label: "Nästa planerade service", value: "2028-04-20" },
            { label: "Status", value: "Gott skick" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Hörn nord-öst" },
            { label: "Byggår", value: "2017" },
            { label: "Dokumentation", value: "Manual, monteringsanvisning" },
            { label: "Statusbesiktning", value: "Godkänd" },
          ],
        },
        {
          id: "bad-4",
          name: "Kakel",
          type: "component",
          location: "Badrum",
          specifications: [
            { label: "Fabrikat", value: "Höganäs" },
            { label: "Modell", value: "Artic White 30x60" },
            { label: "Serienummer", value: "-" },
            { label: "Installationsdatum", value: "2017-06-08" },
            { label: "A-pris", value: "12 500 kr" },
            { label: "Teknisk livslängd", value: "40 år" },
            { label: "Ekonomisk livslängd", value: "25 år" },
            { label: "Garantitid", value: "-" },
            { label: "Serviceavtal", value: "Nej" },
            { label: "Senaste service", value: "-" },
            { label: "Nästa planerade service", value: "-" },
            { label: "Status", value: "Utmärkt skick" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Väggar, 18 m²" },
            { label: "Byggår", value: "2017" },
            { label: "Dokumentation", value: "Ritningar" },
            { label: "Statusbesiktning", value: "Godkänd" },
          ],
        },
      ];
    }
    
    return [];
  };

  if (!rooms || rooms.length === 0) {
    return (
      <TabLayout 
        title="Rumsinformation" 
        count={0}
      >
        <EmptyState
          icon={Info}
          title="Ingen rumsinformation tillgänglig"
          description="Det finns ingen information om rum i denna lägenhet."
        />
      </TabLayout>
    );
  }

  return (
    <TabLayout 
      title="Rumsinformation" 
      count={rooms.length}
      showCard={true}
    >
      <Accordion type="single" collapsible className="space-y-2">
        {rooms.map(room => (
          <AccordionItem 
            key={room.id} 
            value={room.id}
            className="rounded-lg border border-slate-200 bg-white"
          >
            <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
              <div className="flex items-center gap-2">
                <span className="font-medium">{room.name || room.roomType?.name}</span>
                {room.size && (
                  <span className="text-sm text-muted-foreground">({room.size} m²)</span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-3 sm:px-4 pb-4 pt-1">
                {getComponentsForRoom(room.id).length > 0 ? (
                  <div className="grid gap-3 sm:gap-4 grid-cols-1">
                    {getComponentsForRoom(room.id).map((component) => (
                      <ComponentCard key={component.id} component={component} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground text-sm">Ingen komponentinformation tillgänglig</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </TabLayout>
  );
};
