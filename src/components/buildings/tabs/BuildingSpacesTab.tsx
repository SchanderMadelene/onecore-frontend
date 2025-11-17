import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TabLayout } from "@/components/ui/tab-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { ComponentCard } from "@/components/shared/ComponentCard";
import { Box } from "lucide-react";
import type { Building } from "@/types/api";
import type { Component } from "@/data/components";

interface BuildingSpacesTabProps {
  building: Building;
}

interface Space {
  id: string;
  name: string;
  totalArea?: string;
  components: Component[];
}

export const BuildingSpacesTab = ({ building }: BuildingSpacesTabProps) => {
  // Mock data för gemensamma utrymmen
  const spaces: Space[] = [
    {
      id: "tvattstuga",
      name: "Tvättstuga",
      totalArea: "32",
      components: [
        {
          id: "tvatt-1",
          name: "Tvättmaskiner",
          type: "category",
          location: "Tvättstuga",
          componentCount: 3,
          specifications: [
            { label: "Antal", value: "3 st" },
            { label: "Budget", value: "135 000 kr" },
            { label: "Status", value: "I drift" },
          ],
          components: [
            {
              id: "tvatt-1-1",
              name: "Tvättmaskin 1",
              type: "component",
              location: "Tvättstuga",
              specifications: [
                { label: "Fabrikat", value: "Miele" },
                { label: "Modell", value: "Professional WS 5080" },
                { label: "Serienummer", value: "TM-2020-1001" },
                { label: "Installationsdatum", value: "2020-03-15" },
                { label: "A-pris", value: "45 000 kr" },
                { label: "Teknisk livslängd", value: "20 år" },
                { label: "Ekonomisk livslängd", value: "15 år" },
                { label: "Garantitid", value: "3 år" },
                { label: "Serviceavtal", value: "Ja" },
                { label: "Senaste service", value: "2024-09-10" },
                { label: "Nästa planerade service", value: "2025-03-10" },
                { label: "Status", value: "Fungerande" },
                { label: "Ansvarig", value: "Fastighetsskötsel" },
                { label: "Placering", value: "Position 1" },
                { label: "Byggår", value: "2020" },
                { label: "Dokumentation", value: "Serviceavtal, manual" },
              ],
            },
            {
              id: "tvatt-1-2",
              name: "Tvättmaskin 2",
              type: "component",
              location: "Tvättstuga",
              specifications: [
                { label: "Fabrikat", value: "Miele" },
                { label: "Modell", value: "Professional WS 5080" },
                { label: "Serienummer", value: "TM-2020-1002" },
                { label: "Installationsdatum", value: "2020-03-15" },
                { label: "A-pris", value: "45 000 kr" },
                { label: "Teknisk livslängd", value: "20 år" },
                { label: "Ekonomisk livslängd", value: "15 år" },
                { label: "Garantitid", value: "3 år" },
                { label: "Serviceavtal", value: "Ja" },
                { label: "Senaste service", value: "2024-09-10" },
                { label: "Nästa planerade service", value: "2025-03-10" },
                { label: "Status", value: "Fungerande" },
                { label: "Ansvarig", value: "Fastighetsskötsel" },
                { label: "Placering", value: "Position 2" },
                { label: "Byggår", value: "2020" },
                { label: "Dokumentation", value: "Serviceavtal, manual" },
              ],
            },
            {
              id: "tvatt-1-3",
              name: "Tvättmaskin 3",
              type: "component",
              location: "Tvättstuga",
              specifications: [
                { label: "Fabrikat", value: "Miele" },
                { label: "Modell", value: "Professional WS 5080" },
                { label: "Serienummer", value: "TM-2020-1003" },
                { label: "Installationsdatum", value: "2020-03-15" },
                { label: "A-pris", value: "45 000 kr" },
                { label: "Teknisk livslängd", value: "20 år" },
                { label: "Ekonomisk livslängd", value: "15 år" },
                { label: "Garantitid", value: "3 år" },
                { label: "Serviceavtal", value: "Ja" },
                { label: "Senaste service", value: "2024-09-10" },
                { label: "Nästa planerade service", value: "2025-03-10" },
                { label: "Status", value: "Fungerande" },
                { label: "Ansvarig", value: "Fastighetsskötsel" },
                { label: "Placering", value: "Position 3" },
                { label: "Byggår", value: "2020" },
                { label: "Dokumentation", value: "Serviceavtal, manual" },
              ],
            },
          ],
        },
        {
          id: "tvatt-2",
          name: "Torktumlare",
          type: "category",
          location: "Tvättstuga",
          componentCount: 2,
          specifications: [
            { label: "Antal", value: "2 st" },
            { label: "Status", value: "I drift" },
          ],
          components: [
            {
              id: "tvatt-2-1",
              name: "Torktumlare 1",
              type: "component",
              location: "Tvättstuga",
              specifications: [
                { label: "Fabrikat", value: "Miele" },
                { label: "Modell", value: "Professional PT 8337" },
                { label: "Serienummer", value: "TT-2020-2001" },
                { label: "Installationsdatum", value: "2020-03-18" },
                { label: "A-pris", value: "38 000 kr" },
                { label: "Teknisk livslängd", value: "15 år" },
                { label: "Ekonomisk livslängd", value: "12 år" },
                { label: "Garantitid", value: "2 år" },
                { label: "Serviceavtal", value: "Ja" },
                { label: "Senaste service", value: "2024-09-10" },
                { label: "Nästa planerade service", value: "2025-03-10" },
                { label: "Status", value: "Fungerande" },
                { label: "Ansvarig", value: "Fastighetsskötsel" },
                { label: "Placering", value: "Position 1" },
                { label: "Byggår", value: "2020" },
                { label: "Dokumentation", value: "Serviceavtal, manual" },
              ],
            },
            {
              id: "tvatt-2-2",
              name: "Torktumlare 2",
              type: "component",
              location: "Tvättstuga",
              specifications: [
                { label: "Fabrikat", value: "Miele" },
                { label: "Modell", value: "Professional PT 8337" },
                { label: "Serienummer", value: "TT-2020-2002" },
                { label: "Installationsdatum", value: "2020-03-18" },
                { label: "A-pris", value: "38 000 kr" },
                { label: "Teknisk livslängd", value: "15 år" },
                { label: "Ekonomisk livslängd", value: "12 år" },
                { label: "Garantitid", value: "2 år" },
                { label: "Serviceavtal", value: "Ja" },
                { label: "Senaste service", value: "2024-09-10" },
                { label: "Nästa planerade service", value: "2025-03-10" },
                { label: "Status", value: "Fungerande" },
                { label: "Ansvarig", value: "Fastighetsskötsel" },
                { label: "Placering", value: "Position 2" },
                { label: "Byggår", value: "2020" },
                { label: "Dokumentation", value: "Serviceavtal, manual" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "cykelrum",
      name: "Cykelrum",
      totalArea: "48",
      components: [
        {
          id: "cykel-1",
          name: "Cykelställ",
          type: "component",
          location: "Cykelrum",
          specifications: [
            { label: "Fabrikat", value: "Falco" },
            { label: "Modell", value: "Delta 2-vånings" },
            { label: "Serienummer", value: "-" },
            { label: "Installationsdatum", value: "2015-08-20" },
            { label: "A-pris", value: "85 000 kr" },
            { label: "Teknisk livslängd", value: "25 år" },
            { label: "Ekonomisk livslängd", value: "20 år" },
            { label: "Garantitid", value: "5 år" },
            { label: "Serviceavtal", value: "Nej" },
            { label: "Senaste service", value: "2023-06-15" },
            { label: "Nästa planerade service", value: "2028-06-15" },
            { label: "Status", value: "Gott skick" },
            { label: "Ansvarig", value: "Fastighetsskötsel" },
            { label: "Placering", value: "Hela rummet, 60 platser" },
            { label: "Byggår", value: "2015" },
            { label: "Dokumentation", value: "Monteringsanvisning" },
          ],
        },
        {
          id: "cykel-2",
          name: "Belysning LED",
          type: "component",
          location: "Cykelrum",
          specifications: [
            { label: "Fabrikat", value: "Philips" },
            { label: "Modell", value: "CoreLine LED 4000K" },
            { label: "Serienummer", value: "-" },
            { label: "Installationsdatum", value: "2022-04-10" },
            { label: "A-pris", value: "18 500 kr" },
            { label: "Teknisk livslängd", value: "20 år" },
            { label: "Ekonomisk livslängd", value: "15 år" },
            { label: "Garantitid", value: "5 år" },
            { label: "Serviceavtal", value: "Nej" },
            { label: "Senaste service", value: "-" },
            { label: "Nästa planerade service", value: "2027-04-10" },
            { label: "Status", value: "Fungerande" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Tak, 12 armaturer" },
            { label: "Byggår", value: "2022" },
            { label: "Dokumentation", value: "Elschema" },
          ],
        },
      ],
    },
    {
      id: "forrad",
      name: "Källarförråd",
      totalArea: "120",
      components: [
        {
          id: "forrad-1",
          name: "Förrådsboxar",
          type: "component",
          location: "Källarförråd",
          specifications: [
            { label: "Fabrikat", value: "Specialbyggda" },
            { label: "Modell", value: "Nät 2x3 m" },
            { label: "Serienummer", value: "-" },
            { label: "Installationsdatum", value: "1973-10-01" },
            { label: "A-pris", value: "180 000 kr" },
            { label: "Teknisk livslängd", value: "40 år" },
            { label: "Ekonomisk livslängd", value: "30 år" },
            { label: "Garantitid", value: "-" },
            { label: "Serviceavtal", value: "Nej" },
            { label: "Senaste service", value: "2020-05-15" },
            { label: "Nästa planerade service", value: "-" },
            { label: "Status", value: "Renoverade 2020" },
            { label: "Ansvarig", value: "Fastighetsskötsel" },
            { label: "Placering", value: "Källare, 30 boxar" },
            { label: "Byggår", value: "1973" },
            { label: "Dokumentation", value: "Ritningar" },
          ],
        },
        {
          id: "forrad-2",
          name: "Ventilation",
          type: "component",
          location: "Källarförråd",
          specifications: [
            { label: "Fabrikat", value: "Systemair" },
            { label: "Modell", value: "DVEX 315" },
            { label: "Serienummer", value: "VN-2018-0456" },
            { label: "Installationsdatum", value: "2018-11-20" },
            { label: "A-pris", value: "45 000 kr" },
            { label: "Teknisk livslängd", value: "20 år" },
            { label: "Ekonomisk livslängd", value: "15 år" },
            { label: "Garantitid", value: "2 år" },
            { label: "Serviceavtal", value: "Ja" },
            { label: "Senaste service", value: "2024-05-10" },
            { label: "Nästa planerade service", value: "2025-05-10" },
            { label: "Status", value: "Fungerande" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Tak, centralt" },
            { label: "Byggår", value: "2018" },
            { label: "Dokumentation", value: "Serviceavtal, elschema" },
          ],
        },
      ],
    },
  ];

  if (!spaces || spaces.length === 0) {
    return (
      <TabLayout 
        title="Utrymmen" 
        count={0}
      >
        <EmptyState
          icon={Box}
          title="Inga utrymmen"
          description="Det finns inga utrymmen registrerade för denna byggnad."
        />
      </TabLayout>
    );
  }

  return (
    <TabLayout 
      title="Utrymmen" 
      count={spaces.length}
      showCard={true}
    >
      <Accordion type="single" collapsible className="space-y-2">
        {spaces.map(space => (
          <AccordionItem 
            key={space.id} 
            value={space.id}
            className="rounded-lg border border-slate-200 bg-white"
          >
            <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{space.name}</span>
                  {space.totalArea && (
                    <span className="text-sm text-muted-foreground">({space.totalArea} m²)</span>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent>
              <div className="px-3 sm:px-4 pb-4 pt-1">
                {space.components && space.components.length > 0 ? (
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2">
                    {space.components.map(component => (
                      <ComponentCard key={component.id} component={component} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground p-2">
                    Inga komponenter registrerade för detta utrymme.
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </TabLayout>
  );
};
