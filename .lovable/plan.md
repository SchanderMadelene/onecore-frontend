

## Problem

Nuvarande lösning på annonssidans header staplar alla actions som primärknappar bredvid varandra:
`[Ny anmälan] [Avbryt uthyrning] [⊕ Skicka erbjudande]`

Det skapar tre problem:
1. **Visuell hierarki saknas** — den röda destructive-knappen "Avbryt uthyrning" konkurrerar med (och drar fokus från) den faktiska primära åtgärden "Skicka erbjudande".
2. **Skalbarhet** — när status är "Publicerade" blir det fyra knappar i rad (Ny anmälan, Redigera, Tidigarelägg avpublicering, Avbryt uthyrning). Det blir en knappsoppa.
3. **Bryter mot etablerat mönster** — i tabellraderna har vi medvetet en "primär text-knapp + more-icon"-struktur (se memory `table-action-layout-pattern`). Detaljsidan bör följa samma logik, inte motsatsen.

## Föreslagen lösning

Återinför **samma mönster som tabellraderna** på detaljsidan: **en primär action + en more-icon med resten**. Regeln "alla menyactions ska finnas på detaljsidan" uppfylls fortfarande — men menyn finns kvar som meny, inte som knapprad.

### Layout per status

```text
Publicerade:          [Ny anmälan]        [⋯]   ← menyn: Redigera, Tidigarelägg avpubl., Avbryt uthyrning
Behov av publicering: [Publicera]         [⋯]   ← menyn: Redigera, Ta bort
Klara för erbjudande: [⊕ Skicka erbjudande] [⋯] ← menyn: Ny anmälan, Avbryt uthyrning
Erbjudna:             [Visa erbjudande]   [⋯]   ← menyn: Avbryt uthyrning
Historik:             [Visa annons]              ← ingen meny
```

Den primära actionknappen är alltid **default-variant** (mörk/fylld), aldrig destructive. Destructive actions (Avbryt uthyrning, Ta bort, Återkalla) bor alltid i more-menyn där de får sin röda färg och separator — precis som i tabellen.

### "Skicka erbjudande" som specialfall

På "Klara för erbjudande" är primäråtgärden kontextuell (kräver minst en vald sökande, har egen disabled-logik och ikon). Den behåller sitt egna `<Button>` i `HousingHeader` med `disabled={!hasSelectedApplicants}`. `HousingRowActions` renderar då bara more-iconen för den statusen (inte sin egen primärknapp), så vi inte dubblerar.

## Tekniska ändringar

**`src/features/rentals/components/HousingRowActions.tsx`**
- `variant="detail"` ändras till att rendera `[primary[0]-as-Button] + [DropdownMenu med menu]` istället för en flex-rad av knappar.
- Ny prop `hidePrimary?: boolean` så `HousingHeader` kan stänga av den inbyggda primärknappen för status `klaraForErbjudande` (där headern själv renderar "Skicka erbjudande").
- Primärknappen i detail-läget använder samma `handleMenu`-routing som befintliga menyklick.

**`src/pages/rentals/components/HousingHeader.tsx`**
- Tar bort `flex-wrap` och stapling — layouten blir alltid `[primär] [⋯]`.
- För `klaraForErbjudande`: rendera `<HousingRowActions ... hidePrimary />` följt av "Skicka erbjudande"-knappen.
- För övriga statusar: rendera bara `<HousingRowActions ... />` (som själv inkluderar både primär + meny).

**Memory-uppdatering**
- Uppdatera `mem://features/rentals/detail-page-action-parity` så regeln formuleras korrekt: "Alla actions från radens more-meny ska vara **åtkomliga** på detaljsidan — primäråtgärden som knapp, övriga via more-icon. Destructive-actions ligger alltid i menyn, aldrig som primärknapp."

## Resultat

- Tydlig visuell hierarki: en primär åtgärd dominerar, sekundära är ett klick bort.
- Konsekvens med tabellrader (samma mönster överallt).
- Inga röda knappar som stjäl fokus från det användaren faktiskt ska göra.
- Skalbart — fungerar oavsett om statusen har 2 eller 5 actions.

