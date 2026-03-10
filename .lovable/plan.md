

## Plan: Konsolidera expanderbara element

### Steg 1 — Utöka CollapsibleInfoCard

Ändra `title`-prop från `string` till `string | ReactNode` så att komponenter som TenantInformationCard kan skicka in en titel med Badge bredvid. Lägg även till en valfri `desktopTitleVariant`-prop (eller `titleClassName`) för att stödja TenantCommunicationLogs avvikande desktop-titelstil (`text-sm text-muted-foreground`).

### Steg 2 — ResidenceMobileAccordion → MobileAccordion

Ersätt den interna `Accordion`-renderingen i `src/features/residences/components/MobileAccordion.tsx` med den delade `MobileAccordion` från `@/shared/ui/mobile-accordion`. All affärslogik (feature toggles, tenant-val, rooms) behålls oförändrad — bara renderingslagret byts ut. `defaultOpen={["info"]}` mappas till `defaultOpen`-propen.

Inget innehåll förloras.

### Steg 3 — TenantCommunicationLog → CollapsibleInfoCard

Ersätt den manuella `Collapsible`/`Card`-kombinationen med `CollapsibleInfoCard`. Desktop-layouten (horisontell meddelandelista) passeras som `children`. Mobil-layouten (vertikal stack) kan passeras som `previewContent` om vi vill visa en sammanfattning i collapsed-state, annars sätts `previewContent` till null/tom och allt visas i `children`.

Skillnad att hantera: desktop-titeln är idag `text-sm font-medium text-muted-foreground` istället för standard `CardTitle`. Löses genom den nya `titleClassName`-propen.

Inget innehåll förloras.

### Steg 4 — TenantInformationCard → CollapsibleInfoCard

Ersätt `Accordion` med single `AccordionItem` med `CollapsibleInfoCard`. Titeln blir ett `ReactNode` med "Hyresgästinformation" + optional Badge. Tabs-strukturen (Information/Noteringar) passeras som `children`.

`previewContent` kan visa en kort sammanfattning (namn + kontraktstatus) i collapsed-state på mobil.

Inget innehåll förloras.

### Steg 5 — Fixa importvägar

Säkerställ att alla importer av `MobileAccordion` och `CollapsibleInfoCard` pekar på `@/shared/ui/` istället för `@/components/ui/`.

### Påverkan

- 0 data/innehåll förloras
- `CollapsibleInfoCard` utökas med `ReactNode`-titel + `titleClassName`
- 3 komponenter förenklas genom att använda befintliga grundkomponenter
- Importvägar standardiseras

