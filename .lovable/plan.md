

## Omstrukturering av designsystemet

### Problem

8 platta flikar på samma nivå blandar helt olika abstraktionsnivåer — färger och typografi (fundament) ligger bredvid tabeller och formulär (mönster). Det skalar inte: varje ny komponent eller kategori lägger till ytterligare en flik.

### Förslag: 3 huvudsektioner

```text
┌─────────────────────────────────────────────────┐
│  Fundament  │  Komponenter  │  Mönster          │
├─────────────────────────────────────────────────┤
│                                                 │
│  (innehåll baserat på vald sektion)             │
│                                                 │
└─────────────────────────────────────────────────┘
```

| Sektion | Innehåll | Beskrivning |
|---------|----------|-------------|
| **Fundament** | Colors, Typography, Grid, Icons, Logos | Visuella byggstenar som inte är komponenter |
| **Komponenter** | Interaktiv viewer (Button, Badge, Tag, Input, Select, Switch, FilterChip, EmptyState) + Responsiva (alla tabellvarianter, MobileAccordion, MobileTabs, CollapsibleInfoCard, TabLayout, BulkActionBar) | Alla återanvändbara UI-komponenter |
| **Mönster** | Forms (StandardizedForm, FormControls), Orders, Accordions, ComponentCard, UpdateComponentModal | Sammansatta kompositioner och arbetsflöden |

### Implementation

1. **`DesignSystemPage.tsx`** — Byt ut 8 flikar mot 3 top-level tabs (Fundament, Komponenter, Mönster). Varje tab renderar sin sektion.

2. **Fundament-sektionen** — Samla Colors, Typography, Grid, Icons, Logos som sub-sektioner med rubriker inuti en scrollbar vy (inga sub-tabs, bara vertikalt flöde med ankarlänkar eller rubriker). Alternativt: behåll sub-tabs om mängden innehåll motiverar det.

3. **Komponenter-sektionen** — Slå ihop InteractiveShowcase och ResponsiveShowcase till en gemensam vy. Gruppera med rubriker: "Interaktiva" (prop-viewer) och "Responsiva" (desktop/mobil-toggle). Alla tabellvarianter hamnar under "Responsiva > Tabeller".

4. **Mönster-sektionen** — Flytta det som idag ligger i ComponentShowcase (forms, orders, accordions, modals) hit.

### Filändringar

- **`DesignSystemPage.tsx`** — 3 tabs istället för 8
- **Skapa `FoundationsShowcase.tsx`** — Wrapper som renderar ColorPalette + Typography + GridSystem + IconsShowcase + LogosShowcase med sektionsrubriker
- **Skapa `PatternsShowcase.tsx`** — Wrapper som renderar det som idag ligger i ComponentShowcase (forms, orders, etc)
- **Skapa `ComponentsShowcase.tsx`** — Wrapper som kombinerar InteractiveShowcase + ResponsiveShowcase under gemensamma rubriker
- **Barrel-fil `index.tsx`** — Uppdatera exports

Befintliga showcase-filer (InteractiveShowcase, ResponsiveShowcase, ColorPalette etc) behålls oförändrade — de nya filerna importerar och komponerar dem.

