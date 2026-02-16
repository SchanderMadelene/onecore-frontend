
# Inflyttslista — ersatter innehallet pa In- och utflytt-sidan

## Sammanfattning

Istallet for att skapa en ny route och navigationspunkt ersatter vi allt innehall pa den befintliga sidan **In- och utflytt** (`/turnover`). Routen, navigationen och feature toggle (`showTurnover`) behalls som de ar. Bara sidans innehall byts ut.

De befintliga komponenterna (TurnoverDashboard, TurnoverKanban, TurnoverList, etc.) tas bort och ersatts med den nya inflyttslistan.

## Vad den nya sidan visar

1. **Periodfilter** — dropdown med manadshalvor (16/1-15/2, 16/2-15/3, etc.), aktuell period forvald
2. **KVV-omradesfilter** — dropdown med befintliga KVV-nummer fran `kvv-mapping.ts`
3. **Utflyttningar** — tabell med adress, hyresgast, datum, checkbox for stadkontroll
4. **Inflyttningar** — tabell med adress, hyresgast, datum, checkboxar for valkomstsamtal, valkomstbesok, namn/porttelefon
5. Pa mobil visas sektionerna med **MobileAccordion** istallet for tabeller

## Teknisk plan

### Nya filer

```text
src/features/turnover/
  types/move-in-list-types.ts    -- MoveInListEntry, MoveInListPeriod
  data/periods.ts                -- Periodberakning (manadshalvor)
  data/mock-move-in-list.ts      -- Mockdata med KVV-koppling
  hooks/useMoveInList.ts         -- Filtrering + checklistestatus (lokalt state)
  components/MoveInListFilters.tsx -- Period + KVV-filter
  components/MoveOutSection.tsx   -- Utflyttningstabell (ResponsiveTable)
  components/MoveInSection.tsx    -- Inflyttningstabell (ResponsiveTable)
  components/ChecklistCell.tsx    -- Checkbox-komponent
```

### Filer som andras

1. **`src/pages/turnover/TurnoverPage.tsx`** — Helt nytt innehall: ersatt dashboard/kanban/list-flikar med period/KVV-filter och utflytt/inflyttsektioner
2. **`src/pages/turnover/components/TurnoverHeader.tsx`** — Uppdaterad rubrik och beskrivning
3. **`src/features/turnover/index.ts`** — Exporterar nya komponenter och hooks

### Filer som tas bort

Alla befintliga turnover-komponenter som inte langre behovs:
- `TurnoverDashboard.tsx`
- `TurnoverKanban.tsx`
- `TurnoverList.tsx`
- `TurnoverCaseCard.tsx`
- `TurnoverCaseDetailDialog.tsx`
- `TurnoverStepIndicator.tsx`
- `useTurnoverCases.ts`
- `data/turnover.ts` (mockdata for gamla arenden)

### Typer

```text
MoveInListEntry:
  id, type (move_in/move_out), address, residenceCode,
  kvvArea, tenantName, tenantPhone, tenantEmail,
  date, contractId,
  checklist: {
    cleaningDone       -- utflytt
    welcomeCallDone    -- inflytt
    welcomeVisitDone   -- inflytt
    nameAndIntercomDone -- inflytt
  }

MoveInListPeriod:
  label, startDate, endDate
```

### Komponenter som ateranvands

- **ResponsiveTable** — tabell med mobilkort
- **MobileAccordion** — for mobil-sektionsgruppering
- **Select** — period- och KVV-filter (standard filtermonster, w-full sm:w-[180px])
- **Checkbox** — checklistepunkterna
- **PageLayout** — sidomall
- **SaveAsFavoriteButton** och **ActiveFavoriteIndicator** — behalls i headern

### Sidlayout (desktop)

```text
+--------------------------------------------------+
| In- och utflytt                                   |
| Operativ checklista for in- och utflyttningar     |
|                                                   |
| [Period: 16/2 - 15/3 v]  [KVV-omrade: Alla v]   |
+--------------------------------------------------+
| UTFLYTTNINGAR (3)                                 |
|                                                   |
| Adress         | Hyresgast    | Datum  | Stad     |
| Odenplan 5A    | A. Andersson | 28 feb | [x]      |
| Kopparb. 12B   | M. Svensson  | 1 mar  | [ ]      |
+--------------------------------------------------+
| INFLYTTNINGAR (2)                                 |
|                                                   |
| Adress         | Hyresgast    | Datum  | Sam|Bes|NP|
| Odenplan 5A    | E. Eriksson  | 1 mar  | [ ]|[ ]|[ ]|
| Kopparb. 12B   | (ej utsedd)  | -      |    |   |   |
+--------------------------------------------------+
```

### Mockdata

Ny mockdata i `mock-move-in-list.ts` med 5-6 poster spridda over nagra perioder, kopplade till KVV-omraden fran `kvv-mapping.ts`. Checklistestatus sparas i lokalt React-state.

### Vad som INTE ingar

- Persistering av checklistestatus (bara lokalt state)
- Delning mellan anvandare
- Integration med kundcenters nyckellistor
- Export/utskrift
