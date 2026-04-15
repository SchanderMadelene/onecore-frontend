

## Plan: Förbättringar av Ut- & inflytt (punkt 1, 2, 3, 6)

### 1. MoveInEditDialog — Byt tidväljare till dual-Select
Rad 161: Ersätt `<input type="time">` med samma dual-Select-mönster (timmar 00–23, minuter i 5-minutersintervall) som redan finns i ContactEditDialog.

### 2. Ta bort Save-ikon från alla tre dialogers Spara-knapp
- **MoveOutEditDialog.tsx** rad 213–215: Ta bort `<Save className="h-4 w-4" />`
- **MoveInEditDialog.tsx** rad 269–271: Ta bort `<Save className="h-4 w-4" />`
- **StudentEditDialog.tsx** rad 141–143: Ta bort `<Save className="h-4 w-4" />`

### 3. StudentTurnoverTable — Hover-overlay för e-postknappar
Applicera samma mönster som CombinedTurnoverTable:
- Lägg till `group/row` på `<TableRow>`
- Gör studentnamn-cellerna (utflytt rad 236–246, inflytt rad 279–289) till `relative`
- Flytta Mail-knappen till en absolut positionerad overlay med gradient-fade som visas vid hover
- Namn visas som vanlig text, e-postknappen glider in från höger vid hover

### 6. Visa antal poster i desktop-vyn
Lägg till en diskret räknare i CombinedTurnoverTable desktop-vyn, t.ex. som en `CardHeader` med `<CardTitle>Ut- & inflytt ({entries.length})</CardTitle>` — matchande studenttabellens befintliga mönster.

### Filer som ändras
| Fil | Ändring |
|---|---|
| `MoveInEditDialog.tsx` | Dual-Select tidväljare + ta bort Save-ikon |
| `MoveOutEditDialog.tsx` | Ta bort Save-ikon |
| `StudentEditDialog.tsx` | Ta bort Save-ikon |
| `StudentTurnoverTable.tsx` | Hover-overlay för e-postknappar |
| `CombinedTurnoverTable.tsx` | Lägg till antal poster i header |

