

## Plan: Konsolidera alla knappar till en MoreHorizontal-meny

### Koncept
Ersätt de absolut-positionerade hover-overlay-knapparna OCH penna-knappen med **en enda MoreHorizontal-knapp (⋯)** per sektion. Klick öppnar en DropdownMenu med alla åtgärder som menyalternativ.

### Resultat

```text
Före:  [text + hover-overlay-knappar] ... [📝noter] [✏]
Efter: [text]                         ... [📝noter] [⋯]
```

### Menyinnehåll

**Uppgångs-kolumnen** (adresscellen):
- En ⋯-knapp ersätter hover-overlayen
- Menyalternativ: "Öppna lägenhetskort ↗"

**Utflytt-sektionen** (en ⋯-knapp ersätter penna + hover-overlay):
- "Redigera utflytt" (öppnar MoveOutEditDialog)
- "Öppna kundkort ↗" (om tenantId finns)
- "Ring [telefonnummer]" (om tenantPhone finns)

**Inflytt-sektionen** (samma mönster):
- "Redigera inflytt" (öppnar MoveInEditDialog)
- "Öppna kundkort ↗" (om tenantId finns)
- "Ring [telefonnummer]" (om tenantPhone finns)

### Tekniska ändringar

**1. Refaktorera `TurnoverRowActions.tsx`**
- Byt ut `<Button><Pencil /></Button>` mot `<DropdownMenu>` med `<MoreHorizontal />` som trigger
- Lägg till nya props: `residenceUrl?`, `tenantId?`, `tenantPhone?`
- Menyalternativen: "Redigera" öppnar dialogen (behåller befintlig dialoglogik), övriga är `<a>`-länkar

**2. Uppdatera `CombinedTurnoverTable.tsx`**
- Ta bort alla `absolute inset-y-0` overlay-spans (gradient-knapparna)
- Ta bort `relative` från TableCells som hade overlays
- Skicka `residenceUrl`, `tenantId`, `tenantPhone` som nya props till `TurnoverRowActions`
- Adresscellen: Lägg till en egen liten ⋯-meny ELLER baka in lägenhetskort-länken i utflytts-menyn (renare)

**3. Adresscellen — enklare approach**
Istället för en separat meny på adressen: baka in "Öppna lägenhetskort" som första alternativ i utflytt-menyn. Då behövs bara **två** ⋯-knappar per rad (utflytt + inflytt) istället för tre.

### Filer som ändras
| Fil | Ändring |
|-----|---------|
| `TurnoverRowActions.tsx` | Byt Pencil-knapp → MoreHorizontal + DropdownMenu. Nya props för tenantId, tenantPhone, residenceUrl |
| `CombinedTurnoverTable.tsx` | Ta bort alla hover-overlay-spans. Skicka nya props. Ta bort oanvända kolumner om möjligt |

### Visuellt
- Varje rad har max 2 diskreta ⋯-knappar (en per sektion) + noteringsikoner
- Inget hover-beteende behövs längre — allt är alltid tillgängligt via menyn
- Tabellen blir renare och smalare

