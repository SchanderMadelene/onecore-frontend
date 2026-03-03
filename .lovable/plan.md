

## Plan: Ta bort telefonnummer från tabellvyn + minska padding

### Åtgärd 2 — Ta bort telefonnummer från desktop-tabellen

Telefonnumret och ringknappen visas idag under hyresgästens namn i både utflytt- och inflyttkolumnen (rad 311-318 och 377-384). Dessa tas bort från desktop-tabellen. Telefonnumret finns redan tillgängligt via redigeringsmodalen (pennikonen). En liten ringikon läggs bredvid namnet istället — tar minimal bredd.

### Åtgärd 3 — Minska padding i alla celler

Alla `TableCell` och `TableHead` i desktop-tabellen får tightare padding: `px-2 py-1.5` istället för default `p-4`. Detta appliceras via en className på `<Table>` eller individuellt per cell.

### Fil som ändras
- **`src/features/turnover/components/CombinedTurnoverTable.tsx`**
  - Rad 299-320 (utflytt hyresgäst-cell): Ta bort telefonnummer-blocket, lägg en liten Phone-ikon bredvid namnet som `<a href="tel:...">` 
  - Rad 365-386 (inflytt hyresgäst-cell): Samma ändring
  - Rad 247: Lägg `className="[&_th]:px-2 [&_th]:py-1.5 [&_td]:px-2 [&_td]:py-1.5"` på `<Table>` för att globalt minska padding

