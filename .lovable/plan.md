

## Kontaktstatus-flöde för inflyttande hyresgäst

Ersätter de två separata checkboxarna **Samtal** och **Besök** med ett enda statusbaserat kontrollflöde -- samma mönster som städkontrollen (CleaningCheckCell) redan använder.

### Statussteg (framåt, ej bakåt)

| Status | Badge-färg | Extra fält |
|--------|-----------|------------|
| Ej kontaktad | Grå (`bg-muted`) | -- |
| Ej nådd | Amber (`bg-amber-100`) | Antal försök (räknare) |
| Besök bokat | Sky (`bg-sky-100`) | Datum + klockslag |
| Besök genomfört | Grön (`bg-emerald-100`) | -- |

### Tekniska ändringar

**1. Typer** (`move-in-list-types.ts`)
- Ny typ `ContactStatus = 'not_contacted' | 'not_reached' | 'visit_booked' | 'visit_done'`
- Lägg till i `MoveInListChecklist`:
  - `contactStatus: ContactStatus`
  - `contactAttempts: number`
  - `visitBookedDate?: string` (ISO datetime, inkl. klockslag)
- Behåll `nameAndIntercomDone` (separat checkbox)
- `welcomeCallDone` och `welcomeVisitDone` tas bort

**2. Ny komponent** (`ContactStatusCell.tsx`)
- Följer exakt samma pill/badge-mönster som `CleaningCheckCell`
- Select-dropdown med de fyra statusarna
- Vid "Ej nådd": visar liten räknare med +/- knappar för antal försök
- Vid "Besök bokat": visar datum- och tidväljare (kalender + tidsinput `type="time"`)
- Statusar filtreras så att man bara kan gå framåt (t.ex. från "Besök bokat" visas bara "Besök bokat" och "Besök genomfört")

**3. Hook** (`useMoveInList.ts`)
- Ny funktion `updateContactStatus(entryId, status)`
- Ny funktion `updateContactAttempts(entryId, count)`
- Ny funktion `updateVisitBookedDate(entryId, datetime)`
- Ta bort logik kopplad till `welcomeCallDone` / `welcomeVisitDone`

**4. Tabell** (`CombinedTurnoverTable.tsx`)
- Ersätt kolumnerna **Samtal** och **Besök** med en enda kolumn **Kontakt**
- Rendera `ContactStatusCell` i den nya kolumnen
- Behåll **Namn/Port** som separat checkbox-kolumn
- Uppdatera mobilvy (MobileAccordion) på samma sätt

**5. Mockdata** (`mock-move-in-list.ts`)
- Uppdatera inflyttsposter med `contactStatus`, `contactAttempts`, `visitBookedDate` istället för `welcomeCallDone`/`welcomeVisitDone`

### Resultat i tabellen

```text
| Hyresgäst (in)   | Kontrakt | Kontakt                      | Namn/Port | Välkommen hem |
| Andersson Kalle  | 1 apr    | [Besök bokat] 15 mar 10:00   |    [x]    |   [Digital]   |
| Johansson Lisa   | 1 apr    | [Ej nådd] 2 försök           |    [ ]    |   [Ingen]     |
```

Två kolumner blir en, och flödet speglar verkligheten: kontakta -> boka besök -> genomför besök.

