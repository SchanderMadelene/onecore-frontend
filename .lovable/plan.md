

## Problem

Button, Badge och Tag finns på **två ställen**: dels i Komponenter-fliken (interaktiv ComponentViewer) och dels i Mönster-fliken (statiska showcases som ButtonShowcase, BadgeShowcase, TagShowcase). Det är dubbletter — inte mönster.

Grundproblemet: vid omstruktureringen kopierades gamla ComponentShowcase rakt in i PatternsShowcase utan att separera enskilda komponenter från sammansatta mönster.

## Förslag: Underkategorier i Komponenter + rensat Mönster

### Komponenter-fliken — grupperad med rubriker

| Underkategori | Innehåll |
|---|---|
| **Knappar & Inmatning** | Button, Input, Select, Switch, FilterChip |
| **Indikatorer & Etiketter** | Badge, Tag, EmptyState |
| **Tabeller** | Table/Base, Table/Filterable, Table/Selectable, Table/Expandable, Table/Split |
| **Layout & Navigation** | MobileAccordion, MobileTabs, CollapsibleInfoCard, TabLayout, BulkActionBar |

Varje komponent visas **en gång** — via ComponentViewer (interaktiv) där det finns en definition, via DemoWrapper (responsiv) för tabeller/layout.

### Mönster-fliken — bara sammansatta kompositioner

Ta bort ButtonShowcase, BadgeShowcase, TagShowcase (dubbletter). Behåll:
- StandardizedFormShowcase
- FormControlsShowcase  
- OrdersShowcase
- AccordionShowcase (som mönster för collapsible content)
- UpdateComponentModalShowcase
- ComponentsAndCategoriesShowcase

### Filändringar

1. **`ComponentsShowcase.tsx`** — Ersätt "Interaktiva"/"Responsiva"-uppdelningen med semantiska underkategorier. Gruppera ComponentViewer-instanser under rubriker (Knappar & Inmatning, Indikatorer, etc.) och infoga tabeller/layout-demos efter.

2. **`PatternsShowcase.tsx`** — Ta bort ButtonShowcase, BadgeShowcase, TagShowcase.

3. **`InteractiveShowcase.tsx`** — Tas bort som separat wrapper, dess innehåll (ComponentViewer-instanserna) flyttas direkt in i ComponentsShowcase under respektive underkategori.

