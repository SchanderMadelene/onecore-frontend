

## Plan: Visa ikon-alternativ för Uppgång i preview

Skapa en tillfällig visuell jämförelse som visar kandidat-ikoner för "Uppgång" sida vid sida, så du kan välja.

### Vad som visas

En enkel panel med dessa ikoner renderade i samma storlek och stil som trädvyn:

| Ikon | Lucide-komponent | Beskrivning |
|------|-----------------|-------------|
| Home (nuvarande) | `Home` | Hus — kan förväxlas med lägenhet |
| Layers | `Layers` | Lager/nivåer |
| ArrowUpFromLine | `ArrowUpFromLine` | Pil uppåt — "uppgång" |
| Columns2 | `Columns2` | Vertikala sektioner |
| LayoutList | `LayoutList` | Listelement |
| Hash | `Hash` | Numrering |
| GitBranch | `GitBranch` | Förgreningspunkt |
| Stairs | `Stairs` | Trappa — bokstavlig uppgång |

### Genomförande

**1 fil ändras:** `src/pages/properties/BuildingDetailPage.tsx` (eller liknande synlig sida)

Lägg till en tillfällig sektion längst ner som renderar alla ikoner med namn och beskrivning i ett grid, liknande IconsShowcase-formatet. Sektionen tas bort efter beslut.

Alternativt skapas en ny tillfällig route `/icon-test` med en minimal komponent som visar jämförelsen.

### Filer
- **Ny:** `src/pages/IconComparisonPage.tsx` — tillfällig sida med ikonjämförelse
- `src/App.tsx` — lägg till route `/icon-test`

