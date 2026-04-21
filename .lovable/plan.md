

## Audit av hover-states i hela systemet

### Mål
Hitta och åtgärda alla ställen där `variant="ghost"` används på ikon-knappar som ligger på tonade ytor (kort, dialoger, paneler, badges-rader), och ersätta dem med den nya `variant="subtle"`. Säkerställer konsekvens enligt den nya Core-regeln.

### Process

**1. Inventering (read-only sökning)**
- Sök igenom hela `src/` efter `variant="ghost"` i kombination med `size="icon"`.
- Sök även efter ghost-knappar utan explicit `size="icon"` men med ikoner som barn (X, Trash, Pencil, MoreHorizontal, ChevronDown, etc.).
- Kategorisera träffar i tre grupper:
  - **A. På tonad yta** (inuti `Card`, `Dialog`, `Popover`, `bg-muted`, `bg-secondary`, badge-rader) → ska bli `subtle`.
  - **B. På ren `bg-background`** (t.ex. tabellrader, navbar, toolbars) → behåller `ghost` (rätt kontrast).
  - **C. Tveksamma fall** → listas separat för avstämning.

**2. Refaktorering**
- Byt grupp A till `variant="subtle"`.
- Lämna grupp B orört.
- Återkom med grupp C som en kort fråga innan ändring.

**3. Övriga hover-inkonsekvenser**
Under inventeringen noterar jag även:
- Råa `<button>`-element med egen hover-styling som borde använda `Button`-komponenten.
- `hover:bg-accent` / `hover:bg-gray-*` hårdkodade klasser som avviker från systemet.
Dessa rapporteras som en separat lista — inte automatiska ändringar.

### Långsiktigt (förebyggande)
- **Memory-regeln** (redan sparad): `Icon buttons on tinted surfaces use variant="subtle", never ghost`. Den ligger i Core och appliceras automatiskt på alla framtida ändringar.
- **Förslag på lint-regel** (separat task om du vill): ESLint-regel som varnar vid `variant="ghost"` + `size="icon"` inuti `Dialog`/`Card`-kontext. Kräver custom rule, så jag tar det bara om du vill.

### Leverans
1. Lista med alla filer som ändras (grupp A) innan jag rör dem — du godkänner omfattningen.
2. Refaktorering i en sammanhängande commit-batch.
3. Separat rapport om grupp C + eventuella råa `<button>`-fynd.

### Påverkan
Endast visuella hover-ändringar på ikon-knappar. Ingen funktionell logik ändras. Inga nya beroenden.

