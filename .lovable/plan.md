

## Plan: Release Notes-modul på dashboarden

En kompakt, expanderbar "Nyheter och uppdateringar"-sektion på startsidan som visar en preview (senaste 1-2 poster) och kan expanderas för att visa fler.

### Design

- Placeras mellan "Behöver du hjälp?"-tooltipsen och kortkatalogen
- **Collapsed (default)**: Visar rubrik med ikon, antal nyheter, och senaste posten i en kompakt rad
- **Expanded**: Visar alla poster med kategori-badges (färgkodade: Information/gul, Buggfix/grå, Ny funktion/blå), datum och beskrivning
- Paginering med "< 1/7 >" som i referensbilden, eller en enkel "Visa alla" / "Visa färre"
- Max-bredd begränsad (t.ex. `max-w-2xl`, centrerad) så den inte tar hela bredden

### Datamodell

Hårdkodade release notes i en separat fil `src/data/releaseNotes.ts`:

```ts
type ReleaseCategory = 'information' | 'buggfix' | 'ny-funktion';

interface ReleaseNote {
  id: string;
  category: ReleaseCategory;
  title: string;
  description: string;
  date: string; // "3 feb. 2026"
}
```

### Filer

1. **`src/data/releaseNotes.ts`** — Data-array med release notes
2. **`src/features/dashboard/components/ReleaseNotes.tsx`** — Komponenten:
   - Använder `Collapsible` från radix för expand/collapse
   - Kategori-badges med färgkodning (gul för Information, grå för Buggfix, blå/lila för Ny funktion)
   - Ikoner per kategori (AlertTriangle, Wrench, Sparkles)
   - Visar 1 post i collapsed-läge, resten vid expand
   - Paginering om listan blir lång (visa 3-5 åt gången)
3. **`src/pages/Index.tsx`** — Importerar och placerar `ReleaseNotes` mellan hjälp-tooltipsen och kortgridet

### Visuell stil

Följer referensbildens mönster men i kompakt form: tunn border, vit bakgrund, diskret men informativ. Smälter in med dashboardens befintliga design.

