import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TabLayout } from "@/components/ui/tab-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { ComponentCard } from "@/components/common";
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
            { label: "Rubrik", value: "Specifikation" },
            { label: "Rubrik", value: "Specifikation" },
            { label: "Rubrik", value: "Specifikation" },
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
                { label: "Statusbesiktning", value: "4" },
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
                { label: "Statusbesiktning", value: "3" },
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
                { label: "Statusbesiktning", value: "5" },
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
            { label: "Rubrik", value: "Specifikation" },
            { label: "Rubrik", value: "Specifikation" },
            { label: "Rubrik", value: "Specifikation" },
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
                { label: "Statusbesiktning", value: "4" },
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
                { label: "Statusbesiktning", value: "4" },
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
            { label: "Statusbesiktning", value: "3" },
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
            { label: "Statusbesiktning", value: "4" },
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
            { label: "Statusbesiktning", value: "Godkänd" },
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
            { label: "Statusbesiktning", value: "4" },
          ],
        },
      ],
    },
    {
      id: "vind",
      name: "Vind",
      totalArea: "250",
      components: [
        {
          id: "vind-1",
          name: "Ventilationssystem",
          type: "component",
          location: "Vind",
          specifications: [
            { label: "Fabrikat", value: "Systemair" },
            { label: "Modell", value: "VTR 300" },
            { label: "Serienummer", value: "VENT-2019-A01" },
            { label: "Installationsdatum", value: "2019-05-12" },
            { label: "A-pris", value: "28 500 kr" },
            { label: "Teknisk livslängd", value: "20 år" },
            { label: "Ekonomisk livslängd", value: "15 år" },
            { label: "Garantitid", value: "5 år" },
            { label: "Serviceavtal", value: "Ja" },
            { label: "Senaste service", value: "2024-03-20" },
            { label: "Nästa planerade service", value: "2025-03-20" },
            { label: "Status", value: "Drift" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Centralt på vinden" },
            { label: "Byggår", value: "2019" },
            { label: "Dokumentation", value: "Serviceavtal, manual" },
            { label: "Statusbesiktning", value: "4" },
          ],
        },
        {
          id: "vind-2",
          name: "Takluckor",
          type: "component",
          location: "Vind",
          specifications: [
            { label: "Fabrikat", value: "Velux" },
            { label: "Modell", value: "GGL MK04" },
            { label: "Serienummer", value: "VLX-2018-250" },
            { label: "Installationsdatum", value: "2018-09-15" },
            { label: "A-pris", value: "8 900 kr" },
            { label: "Teknisk livslängd", value: "30 år" },
            { label: "Ekonomisk livslängd", value: "25 år" },
            { label: "Garantitid", value: "10 år" },
            { label: "Serviceavtal", value: "Nej" },
            { label: "Senaste service", value: "2023-09-10" },
            { label: "Nästa planerade service", value: "2028-09-10" },
            { label: "Status", value: "Gott skick" },
            { label: "Ansvarig", value: "Fastighetsskötsel" },
            { label: "Placering", value: "4 st, jämnt fördelade" },
            { label: "Byggår", value: "2018" },
            { label: "Dokumentation", value: "Manual, garanti" },
            { label: "Statusbesiktning", value: "5" },
          ],
        },
      ],
    },
    {
      id: "trapphus",
      name: "Trapphus",
      totalArea: "120",
      components: [
        {
          id: "trapphus-1",
          name: "Trapphuslampor",
          type: "component",
          location: "Trapphus",
          specifications: [
            { label: "Fabrikat", value: "Philips" },
            { label: "Modell", value: "CoreLine LED WT120C" },
            { label: "Serienummer", value: "PHL-2021-TH" },
            { label: "Installationsdatum", value: "2021-02-18" },
            { label: "A-pris", value: "24 000 kr" },
            { label: "Teknisk livslängd", value: "15 år" },
            { label: "Ekonomisk livslängd", value: "12 år" },
            { label: "Garantitid", value: "3 år" },
            { label: "Serviceavtal", value: "Nej" },
            { label: "Senaste service", value: "2024-02-10" },
            { label: "Nästa planerade service", value: "2027-02-10" },
            { label: "Status", value: "Fungerande" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Alla våningsplan, 20 st" },
            { label: "Byggår", value: "2021" },
            { label: "Dokumentation", value: "Elschema" },
            { label: "Statusbesiktning", value: "3" },
          ],
        },
        {
          id: "trapphus-2",
          name: "Brandvarnare",
          type: "component",
          location: "Trapphus",
          specifications: [
            { label: "Fabrikat", value: "Cavius" },
            { label: "Modell", value: "2103-004" },
            { label: "Serienummer", value: "CAV-2022-BV" },
            { label: "Installationsdatum", value: "2022-01-20" },
            { label: "A-pris", value: "9 000 kr" },
            { label: "Teknisk livslängd", value: "10 år" },
            { label: "Ekonomisk livslängd", value: "10 år" },
            { label: "Garantitid", value: "10 år" },
            { label: "Serviceavtal", value: "Nej" },
            { label: "Senaste service", value: "2024-01-15" },
            { label: "Nästa planerade service", value: "2025-01-15" },
            { label: "Status", value: "Fungerande" },
            { label: "Ansvarig", value: "Fastighetsskötsel" },
            { label: "Placering", value: "Varje våningsplan, 20 st" },
            { label: "Byggår", value: "2022" },
            { label: "Dokumentation", value: "Manual, test-protokoll" },
            { label: "Statusbesiktning", value: "5" },
          ],
        },
      ],
    },
    {
      id: "kallare",
      name: "Källare",
      totalArea: "320",
      components: [
        {
          id: "kallare-1",
          name: "Värmepanna",
          type: "component",
          location: "Pannrum, Källare",
          specifications: [
            { label: "Fabrikat", value: "IVT" },
            { label: "Modell", value: "Greenline HE E20" },
            { label: "Serienummer", value: "IVT-2017-P01" },
            { label: "Installationsdatum", value: "2017-11-25" },
            { label: "A-pris", value: "95 000 kr" },
            { label: "Teknisk livslängd", value: "20 år" },
            { label: "Ekonomisk livslängd", value: "15 år" },
            { label: "Garantitid", value: "5 år" },
            { label: "Serviceavtal", value: "Ja" },
            { label: "Senaste service", value: "2024-10-05" },
            { label: "Nästa planerade service", value: "2025-10-05" },
            { label: "Status", value: "Drift" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Pannrum" },
            { label: "Byggår", value: "2017" },
            { label: "Dokumentation", value: "Serviceavtal, manual, elschema" },
            { label: "Statusbesiktning", value: "4" },
          ],
        },
        {
          id: "kallare-2",
          name: "Elcentral",
          type: "component",
          location: "Elrum, Källare",
          specifications: [
            { label: "Fabrikat", value: "ABB" },
            { label: "Modell", value: "System Pro M compact" },
            { label: "Serienummer", value: "ABB-2016-EC01" },
            { label: "Installationsdatum", value: "2016-08-10" },
            { label: "A-pris", value: "45 000 kr" },
            { label: "Teknisk livslängd", value: "30 år" },
            { label: "Ekonomisk livslängd", value: "25 år" },
            { label: "Garantitid", value: "10 år" },
            { label: "Serviceavtal", value: "Ja" },
            { label: "Senaste service", value: "2023-08-15" },
            { label: "Nästa planerade service", value: "2026-08-15" },
            { label: "Status", value: "Drift" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Elrum" },
            { label: "Byggår", value: "2016" },
            { label: "Dokumentation", value: "Serviceavtal, elschema" },
            { label: "Statusbesiktning", value: "4" },
          ],
        },
      ],
    },
    {
      id: "skyddsrum",
      name: "Skyddsrum",
      totalArea: "85",
      components: [
        {
          id: "skyddsrum-1",
          name: "Skyddsrumsdörr",
          type: "component",
          location: "Skyddsrum",
          specifications: [
            { label: "Fabrikat", value: "Gunnebo" },
            { label: "Modell", value: "SafeGuard SR-100" },
            { label: "Serienummer", value: "GUN-1995-SR01" },
            { label: "Installationsdatum", value: "1995-04-20" },
            { label: "A-pris", value: "65 000 kr" },
            { label: "Teknisk livslängd", value: "50 år" },
            { label: "Ekonomisk livslängd", value: "40 år" },
            { label: "Garantitid", value: "20 år" },
            { label: "Serviceavtal", value: "Ja" },
            { label: "Senaste service", value: "2022-05-10" },
            { label: "Nästa planerade service", value: "2027-05-10" },
            { label: "Status", value: "Godkänt" },
            { label: "Ansvarig", value: "Fastighetsskötsel" },
            { label: "Placering", value: "Ingång skyddsrum" },
            { label: "Byggår", value: "1995" },
            { label: "Dokumentation", value: "Serviceavtal, besiktningsprotokoll" },
            { label: "Statusbesiktning", value: "5" },
          ],
        },
        {
          id: "skyddsrum-2",
          name: "Skyddsrumsventilation",
          type: "component",
          location: "Skyddsrum",
          specifications: [
            { label: "Fabrikat", value: "Swegon" },
            { label: "Modell", value: "GOLD RX-SR" },
            { label: "Serienummer", value: "SWE-1995-V01" },
            { label: "Installationsdatum", value: "1995-04-20" },
            { label: "A-pris", value: "38 000 kr" },
            { label: "Teknisk livslängd", value: "30 år" },
            { label: "Ekonomisk livslängd", value: "25 år" },
            { label: "Garantitid", value: "10 år" },
            { label: "Serviceavtal", value: "Ja" },
            { label: "Senaste service", value: "2023-06-15" },
            { label: "Nästa planerade service", value: "2025-06-15" },
            { label: "Status", value: "Fungerande" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Vägg, centralt" },
            { label: "Byggår", value: "1995" },
            { label: "Dokumentation", value: "Serviceavtal, manual" },
            { label: "Statusbesiktning", value: "4" },
          ],
        },
        {
          id: "skyddsrum-3",
          name: "Filtersystem NBC",
          type: "component",
          location: "Skyddsrum",
          specifications: [
            { label: "Fabrikat", value: "Camfil" },
            { label: "Modell", value: "NBC Filter SR-95" },
            { label: "Serienummer", value: "CAM-2010-F01" },
            { label: "Installationsdatum", value: "2010-03-15" },
            { label: "A-pris", value: "18 500 kr" },
            { label: "Teknisk livslängd", value: "15 år" },
            { label: "Ekonomisk livslängd", value: "12 år" },
            { label: "Garantitid", value: "5 år" },
            { label: "Serviceavtal", value: "Ja" },
            { label: "Senaste service", value: "2023-03-20" },
            { label: "Nästa planerade service", value: "2026-03-20" },
            { label: "Status", value: "Godkänt" },
            { label: "Ansvarig", value: "Teknisk förvaltning" },
            { label: "Placering", value: "Ventilationssystem" },
            { label: "Byggår", value: "2010" },
            { label: "Dokumentation", value: "Serviceavtal, besiktningsprotokoll" },
            { label: "Statusbesiktning", value: "Godkänd" },
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
