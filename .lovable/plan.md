

## Plan: Lägg till kundkortslänk i ut- & inflyttstabellen

### Vad
En ikon-knapp bredvid hyresgästnamnet som öppnar kundkortet — samma visuella mönster som ExternalLink-knappen för lägenhetskortet.

### Ändringar

| Fil | Ändring |
|-----|---------|
| `move-in-list-types.ts` | Lägg till `tenantId?: string` i `MoveInListEntry` |
| `mock-move-in-list.ts` | Lägg till fiktiva `tenantId`-värden på alla poster |
| `CombinedTurnoverTable.tsx` | Lägg till `ExternalLink`-knapp (outline, h-6 w-6) bredvid hyresgästnamnet som länkar till `/tenants/detail/${entry.tenantId}` |

### Desktop
Knappen placeras i hyresgästcellen, till vänster om telefon-knappen — precis som lägenhetskort-knappen ligger till vänster om adressen. Samma `Button variant="outline" size="icon" asChild` med `ExternalLink`-ikon, title "Öppna kundkort".

```
[↗ kundkort] [📞] Ekberg Maja ⚠️
```

### Mobil
Knappen placeras i hyresgästens namnrad i accordion-kortet, bredvid telefonknappen.

### Detaljer
- Ikonen är samma `ExternalLink` som för lägenhetskortet — konsekvent mönster
- Länken öppnas i ny flik (`target="_blank"`)
- Visas bara om `tenantId` finns (skyddad identitet kan sakna det)

