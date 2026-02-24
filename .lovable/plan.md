

# Behall groen badge med integrerad foerseningstext

## Vad som aendras

Badgen foer "Betald" och "Delvis betald" behaalls groen (success-variant) som vanligt. Foerseningsinformationen integreras direkt i badgetexten istallet foer att visas som separat roed text under badgen.

## Design

```text
Foere:
[Betald]          (groen badge)
5 d foer sent     (roed separat text -- fult)

Efter:
[Betald - 5d sen] (groen badge, samma stil som vanligt)
```

Badgen behaaller sin groena faerg och variant (`success`). Texten "5d sen" laggs till inuti badgen saa att allt haenger ihop visuellt.

## Tekniska detaljer

### AEndrad fil

| Fil | AEndring |
|-----|---------|
| `src/features/ekonomi/components/ledger/InvoicesTable.tsx` | Ta bort separata foerseningsrader, integrera foerseningstext i badgen |

### Implementationsdetaljer

1. **Mobilvy (rad 91-97)**: Ersaett badge + separat span med en enda badge:
```tsx
<Badge variant={getStatusVariant(invoice.paymentStatus)}>
  {getStatusText(invoice)}{getDaysLate(invoice) ? ` - ${getDaysLate(invoice)}d sen` : ''}
</Badge>
```
Ta bort den separata `<span>` paa rad 95-97.

2. **Desktopvy (rad 398-405)**: Samma princip -- ta bort den separata `<div>` paa rad 402-404 och integrera i badgen:
```tsx
<Badge variant={getStatusVariant(invoice.paymentStatus)}>
  {getStatusText(invoice)}{getDaysLate(invoice) ? ` - ${getDaysLate(invoice)}d sen` : ''}
</Badge>
```

3. **Expanderad vy**: Behaalls som den aer -- detaljerad text i haendelsekortet fungerar bra i den kontexten.

