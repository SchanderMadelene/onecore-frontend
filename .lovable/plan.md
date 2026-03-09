

## Plan: Studentboenden — separat flik på Ut- & inflytt

### Koncept

Sidan `/turnover` får två flikar högst upp: **Ut- & inflytt** (nuvarande vy) och **Studentboenden**. Flikarna implementeras med `Tabs` från shadcn. Studentfliken visar en förenklad tabell med andra kolumner och en minimal checklist (bara städkontroll).

### Datamodell

Ny typ `StudentTurnoverEntry` i `move-in-list-types.ts`:
- `id`, `type` ('move_in' | 'move_out'), `roomCode` (t.ex. "302-10-1101A"), `propertyName` (t.ex. "Kata"), `gender`, `birthDate`, `email`, `date`
- `cleaningChecklist`: bara `cleaningStatus`, `cleaningCount`, `cleaningBookedDate`, `cleaningApprovedDate` (samma typer som befintligt)

Ny typ `StudentTurnoverRow` som grupperar in/ut per rum.

### Mockdata

Ny fil `mock-student-turnover.ts` med ~10 poster fördelade på 2 fastigheter (Kata, Locus) i KVV-prefix 615.

### Tabell

Ny komponent `StudentTurnoverTable.tsx`:
- **Kolumner (desktop):** Fastighet, Rum, Utflytt (namn, kön, födelsedatum, e-post), Städkontroll, Inflytt (namn, kön, födelsedatum, e-post), Städkontroll
- **Mobilvy:** MobileAccordion med samma mönster som befintlig, men anpassade fält
- Återanvänder `CleaningStatusBadge`, `CleaningEditDialog` etc.

### Filter

Ny komponent `StudentTurnoverFilters.tsx` — samma layout som `MoveInListFilters` men med:
- Sökfält (sök på rum, namn, e-post)
- Datumväljare (start/slut)
- **Fastighetsfilter** (Select med "Alla fastigheter", "Kata", "Locus" etc.) — ny kolumn i tabellen också

### Hook

Ny hook `useStudentTurnover.ts` — liknande `useMoveInList` men för studentdata, med fastighetsfilter.

### Sidstruktur

`TurnoverPage.tsx` uppdateras med `Tabs`:

```text
┌─────────────────────────────────────┐
│ Ut- & inflytt          [⭐ Favorit] │
│ Operativ checklista...              │
├──────────────┬──────────────────────┤
│ Ut- & inflytt│ Studentboenden      │  ← Tabs
├──────────────┴──────────────────────┤
│ [Filter + Tabell beroende på flik]  │
└─────────────────────────────────────┘
```

### Routing

Flikarna styrs via URL-parameter (`?tab=students`) eller Tabs-state. Ingen ny route behövs.

### Feature toggle

Studentfliken visas alltid (flikens label syns) men innehållet kan vara tomt om inga studentposter finns — i linje med regeln att labels inte ska döljas.

### Filer som skapas/ändras

| Fil | Åtgärd |
|-----|--------|
| `src/features/turnover/types/move-in-list-types.ts` | Lägg till `StudentTurnoverEntry`, `StudentTurnoverRow` |
| `src/features/turnover/data/mock-student-turnover.ts` | Ny mockdata |
| `src/features/turnover/hooks/useStudentTurnover.ts` | Ny hook med fastighetsfilter |
| `src/features/turnover/components/StudentTurnoverTable.tsx` | Ny tabell |
| `src/features/turnover/components/StudentTurnoverFilters.tsx` | Nya filter (med fastighetsval) |
| `src/pages/turnover/TurnoverPage.tsx` | Tabs-wrapper runt befintligt + studentflik |
| `src/features/turnover/index.ts` | Exportera nya komponenter |

