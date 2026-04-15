

## Plan: Minska visuellt brus i ut- & inflyttstabellen

### Problem
Varje rad har upp till 7 knappar synliga samtidigt (lägenhetskort, 2× kundkort, 2× telefon, 2× penna). Det ger ett plottrig intryck.

### Föreslagna åtgärder

**1. Hover-to-reveal på action-knappar (desktop)**
Knapparna för lägenhetskort, kundkort och telefon görs osynliga (opacity-0) som standard och visas vid hover på raden via CSS-gruppen `group/row` + `group-hover/row:opacity-100`. Penna-knappen (edit) och noteringsikonen behålls alltid synliga eftersom de är primära arbetsverktyg.

**2. Behåll alltid varningsindikatorer**
SecurityWarningIcon, TenantNote-badge och TurnoverNoteIndicator är alltid synliga — de kommunicerar status, inte åtgärder.

### Teknisk implementation

| Fil | Ändring |
|-----|---------|
| `CombinedTurnoverTable.tsx` | Lägg till `group/row` på `<TableRow>`, wrappa ExternalLink- och Phone-knappar i en span med `opacity-0 group-hover/row:opacity-100 transition-opacity` |

### Visuellt resultat

```text
Före:  [↗] [↗] [📞] Ekberg Maja ⚠️  ...  [↗] [📞] Lindström Per  ... [✏]
Efter: [                ] Ekberg Maja ⚠️  ...  [                ] Lindström Per  ... [✏]
       ↑ knappar dyker upp vid hover ↑
```

### Avgränsning
- Mobil påverkas inte (hover finns inte, alla knappar visas som idag)
- Penna-knappen och noteringsikonen förblir alltid synliga

