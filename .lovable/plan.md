

## Byt ⋯-meny till redigerings-ikon med samlad modal

Ersätt dropdown-menyn (MoreHorizontal) med en penna-ikon (Pencil) som öppnar **en enda modal** med samtliga redigerbara fält för den hyresgästen.

### Nya komponenter

**1. `MoveOutEditDialog.tsx`** -- samlad modal for utflyttshyresgäst
- Rubrik: "Redigera utflytt -- [hyresgästnamn]"
- Innehall:
  - **Stadkontroll**: Status-select + datumvaljare (vid bokad/omkontroll) + godkannandedatum (vid godkand)
  - **Notering**: Textfalt for att lagga till notering
- Spara-knapp committar allt och stanger

**2. `MoveInEditDialog.tsx`** -- samlad modal for inflyttshyresgast
- Rubrik: "Redigera inflytt -- [hyresgastnamn]"
- Innehall:
  - **Kontakt**: Status-select (framat-only) + antal forsok (vid ej nadd) + datum+tid (vid besok bokat)
  - **Namn/Port**: Checkbox
  - **Valkommen hem**: Select (ingen/digital/manuell)
  - **Notering**: Textfalt
- Spara-knapp committar allt och stanger

### Andringar i befintliga filer

**`TurnoverRowActions.tsx`** -- refaktoreras helt:
- Ta bort DropdownMenu
- Ersatt med en enkel `Button` med `Pencil`-ikon
- Klick oppnar ratt dialog baserat pa props (move-out eller move-in)
- Notering integreras i den samlade modalen istallet for separat dialog
- Nya props for Namn/Port och Valkommen hem (for move-in)

**`CombinedTurnoverTable.tsx`**:
- **Desktop**: Ta bort inline `ChecklistCell` (Namn/Port) och `WelcomeHomeCell` -- dessa flyttar in i modalen. Kolumnerna kan antingen tas bort eller visa read-only varden.
- Skicka Namn/Port- och Valkommen hem-callbacks till `TurnoverRowActions` for move-in
- **Mobil**: Samma -- ta bort inline-kontroller, visa read-only varden, redigering via penna-ikonen

**`CleaningEditDialog.tsx` och `ContactEditDialog.tsx`**:
- Behalls som byggstenar -- importeras i de nya samlade dialogerna, eller sa flyttas logiken direkt in i de nya komponenterna.

### Visuellt resultat (desktop)

```text
| Uppgang | Typ | Hyresgast (ut) | Sista deb. | Stadkontr.    | [pencil] | Hyresgast (in) | Kontrakt | Kontakt          | Namn/Port | Valkommen hem | [pencil] |
| Storg 1 | 2rk | Svensson Eva   | 31 mar     | [Bokad 20mar] |    ✏     | Andersson K    | 1 apr    | [Besok bokat..] |    ✓      |   Digital     |    ✏     |
```

Namn/Port och Valkommen hem visas som read-only text/ikon i tabellen. All redigering sker i modalen.

### Teknisk approach

- De samlade dialogerna hanterar temporar local state for samtliga falt
- Vid "Spara" anropas alla relevanta callbacks pa en gang
- Pencil-ikonen ersatter MoreHorizontal -- samma storlek (h-8 w-8 ghost button)
- Inga andringar i typer eller hooks -- enbart UI-lagret

