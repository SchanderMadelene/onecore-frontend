

# Statusbaserad städkontroll

## Oversikt

Byt ut checkbox + räknare mot en kompakt **Select-dropdown** med tre statusar. Varje status visas som en färgkodad badge, och vid "Omkontroll" visas även räknaren (antal kontroller).

## Design

```text
Desktop-kolumn "Städkontr.":
  [Icke utförd ▼]     -- grå/neutral badge
  [Godkänd ▼]         -- grön badge  
  [Omkontroll (2) ▼]  -- gul/orange badge med räknare

Mobil:
  Städkontroll: [Omkontroll (2) ▼]
```

Statusfärgerna:
- **Icke utförd** -- `bg-muted text-muted-foreground` (grå)
- **Godkänd** -- `bg-emerald-100 text-emerald-800` (grön)
- **Omkontroll** -- `bg-amber-100 text-amber-800` (gul/orange)

Vid "Omkontroll" visas ett litet nummerfält bredvid för att ange antal genomförda kontroller (samma kompakta input som idag).

## Tekniska detaljer

### 1. Uppdatera typer (`move-in-list-types.ts`)

Ersätt `cleaningDone: boolean` med `cleaningStatus`:

```typescript
export type CleaningStatus = 'not_done' | 'approved' | 'reinspection';

export interface MoveInListChecklist {
  cleaningStatus: CleaningStatus;
  cleaningCount: number;
  welcomeCallDone: boolean;
  welcomeVisitDone: boolean;
  nameAndIntercomDone: boolean;
}
```

### 2. Uppdatera `CleaningCheckCell.tsx`

Byt ut checkbox+input mot en kompakt Select med tre alternativ. Vid `reinspection` visas räknaren bredvid. Hela komponenten renderas med färgkodad styling baserat på vald status.

### 3. Uppdatera hook (`useMoveInList.ts`)

- Ersätt `cleaningDone`-logik med `cleaningStatus`-hantering.
- `updateCleaningStatus(entryId, status)` -- ny funktion.
- Vid byte till `reinspection`: sätt `cleaningCount` till 1 om den är 0.
- Vid byte från `reinspection`: behåll `cleaningCount` (historik).

### 4. Uppdatera mockdata (`mock-move-in-list.ts`)

Ersätt `cleaningDone: true/false` med `cleaningStatus: 'not_done' | 'approved' | 'reinspection'`.

### 5. Uppdatera `CombinedTurnoverTable.tsx`

Skicka `cleaningStatus` istället för `checked` till `CleaningCheckCell`. Uppdatera callback-props.

### 6. Uppdatera `MoveOutSection.tsx` och `TurnoverPage.tsx`

Anpassa props för ny status-funktion.

### Ändrade filer

| Fil | Ändring |
|-----|---------|
| `src/features/turnover/types/move-in-list-types.ts` | Ny `CleaningStatus` typ, ersätt `cleaningDone` |
| `src/features/turnover/components/CleaningCheckCell.tsx` | Byt till Select + färgkodad badge |
| `src/features/turnover/hooks/useMoveInList.ts` | Ny `updateCleaningStatus`, ta bort gammal `cleaningDone`-logik |
| `src/features/turnover/data/mock-move-in-list.ts` | Uppdatera mockdata med `cleaningStatus` |
| `src/features/turnover/components/CombinedTurnoverTable.tsx` | Anpassa props |
| `src/features/turnover/components/MoveOutSection.tsx` | Anpassa props |
| `src/pages/turnover/TurnoverPage.tsx` | Koppla ny statusfunktion |
