

## Ny sub-tab: "Filter & Sök" i Komponenter

### Vad

Lägga till en femte sub-tab **"Filter & Sök"** i Komponenter-sektionen som dokumenterar alla filter- och sökkomponenter som används på samlingssidor.

### Innehåll

Sub-taben visar följande komponenter med interaktiva demos:

| Komponent | Typ | Beskrivning |
|---|---|---|
| **Sökfält** | Demo | `Input` med sökikon (PropertySearch-mönstret) |
| **Select-filter** | Demo | Standard `Select` med `w-[180px]`, placeholder som etikett |
| **DateRangeFilter** | Demo | Kalender-popover med från/till-datum och rensa-knapp |
| **FilterContent** | Demo | Inline kolumnfilter med Command/popover (hover-reveal) |
| **FilterChip** | Flytt | Redan har ComponentViewer-definition — flyttas hit från "Knappar & Inmatning" |

Varje komponent visas med en rubrik, kort beskrivning, och en live-demo (interaktiv state).

Längst ned: ett sammansatt exempel som visar standardmönstret för samlingssidor (sökfält + flex-wrap Select-filter + DateRangeFilter + rensa-knapp).

### Filändringar

1. **Ny fil `src/shared/design-system/FilterSearchShowcase.tsx`**
   - Interaktiva demos för varje filterkomponent med lokal state
   - `ComponentViewer` för FilterChip (redan definierad)
   - Sammansatt demo i slutet

2. **`ComponentsShowcase.tsx`**
   - Lägg till sub-tab `<TabsTrigger value="filters">Filter & Sök</TabsTrigger>`
   - Ta bort `filterChipDefinition` från "Knappar & Inmatning" (flyttas)
   - Importera och rendera `FilterSearchShowcase` i ny `TabsContent`

### Noteringar

- FilterChip har redan en `ComponentDefinition` — återanvänds direkt
- DateRangeFilter, FilterContent och sökfältet saknar definitions — visas som fristående demos med lokal state
- Det sammansatta exemplet i slutet visar det standardiserade mönstret från `ui/collection-page-standard-layout`

