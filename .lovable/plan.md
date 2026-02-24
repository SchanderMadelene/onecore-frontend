

# Notera antal stadkontroller vid utflytt

## Oversikt

Lagga till ett numeriskt falt for att registrera hur manga stadkontroller som gjorts pa varje utflytt. Idag ar stadkontroll bara en checkbox (klart/inte klart). Med den har andringen kan anvandaren aven notera antalet kontroller, t.ex. om det kravdes 2-3 kontroller innan stadningen godkandes.

## Design

Pa desktop visas en liten siffra bredvid checkboxen i stadkontroll-kolumnen. Nar checkboxen ar ikryssad syns antalet som en klickbar/andringsbar liten raknare. Pa mobil visas samma raknare intill "Stadkontroll"-texten.

```text
Desktop:
[x] 2

Mobil:
[x] Stadkontroll (2 kontroller)
```

Raknaren visas bara nar checkboxen ar ikryssad (stadkontroll genomford). Standardvarde ar 1 nar man kryssar i.

## Tekniska detaljer

### 1. Utoka typer (`move-in-list-types.ts`)

Lagg till `cleaningCount` i `MoveInListChecklist`:

```typescript
export interface MoveInListChecklist {
  cleaningDone: boolean;
  cleaningCount: number;  // Antal genomforda kontroller
  welcomeCallDone: boolean;
  welcomeVisitDone: boolean;
  nameAndIntercomDone: boolean;
}
```

### 2. Uppdatera hook (`useMoveInList.ts`)

Andra `updateChecklist` sa att nar `cleaningDone` satts till `true` och `cleaningCount` ar 0, satt den automatiskt till 1. Lagg till en ny funktion `updateCleaningCount` for att andra antalet direkt.

### 3. Uppdatera mockdata (`mock-move-in-list.ts`)

Lagg till `cleaningCount: 0` (eller lampligt varde) i alla befintliga mockposter.

### 4. Skapa `CleaningCheckCell`-komponent

Ny komponent som kombinerar checkbox + raknare. Visar:
- Checkbox for `cleaningDone`
- Nar ikryssad: en liten input/stepper (+/-) for antal kontroller
- Nar ej ikryssad: inget antal visas

### 5. Uppdatera `CombinedTurnoverTable.tsx`

Byt ut `ChecklistCell` for stadkontroll mot den nya `CleaningCheckCell` i bade desktop- och mobilvyn.

### 6. Uppdatera `TurnoverPage.tsx` och `MoveOutSection.tsx`

Skicka med `updateCleaningCount` fran hooken och anvand den nya komponenten.

### Andrade filer

| Fil | Andring |
|-----|---------|
| `src/features/turnover/types/move-in-list-types.ts` | Lagg till `cleaningCount: number` |
| `src/features/turnover/hooks/useMoveInList.ts` | Lagg till `updateCleaningCount`, auto-satt count=1 vid check |
| `src/features/turnover/data/mock-move-in-list.ts` | Lagg till `cleaningCount` i mockdata |
| `src/features/turnover/components/CleaningCheckCell.tsx` | Ny komponent: checkbox + raknare |
| `src/features/turnover/components/CombinedTurnoverTable.tsx` | Anvand `CleaningCheckCell` istallet for `ChecklistCell` |
| `src/features/turnover/components/MoveOutSection.tsx` | Anvand `CleaningCheckCell` |

