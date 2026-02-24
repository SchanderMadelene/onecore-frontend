

# Visa om betald faktura betalades för sent

## Vad som goers

Laegger till en visuell indikation paa fakturor med status "Betald" eller "Delvis betald" som betalades efter foerfallodatum. Anvaendaren ska snabbt kunna se om en betalning kom in foer sent och hur maanga dagar foer sent.

## Design

### I fakturalistan (baade mobil och desktop)

Foer betalda fakturor daer `paymentDate > dueDate` visas en liten text under statusbadgen eller bredvid den:

```text
[Betald]  3 dagar foer sent
```

Texten visas i `text-destructive` (roed) med liten textstorlek (`text-xs`) foer att signalera att det aer en avvikelse utan att ta oever.

### I expanderad vy (haendelser)

I betalningshaendelse-kortet (det groena kortet foer betalda fakturor) laggs en extra rad som visar:

```text
Betald 3 dagar efter foerfall (foerfall: 2025-07-30)
```

### Foer delvis betalda

Om den senaste delbetalningen skedde efter foerfallodatum visas samma typ av indikation.

## Tekniska detaljer

### AEndrade filer

| Fil | AEndring |
|-----|---------|
| `src/features/ekonomi/components/ledger/InvoicesTable.tsx` | Laegga till hjaelpfunktion `getDaysLate()` och visa sent-betald-indikation paa baade mobil- och desktopvyer |

### Implementationsdetaljer

1. **Ny hjaelpfunktion** i `InvoicesTable.tsx`:

```typescript
const getDaysLate = (invoice: Invoice): number | null => {
  if (!invoice.paymentDate) return null;
  const days = differenceInDays(parseISO(invoice.paymentDate), parseISO(invoice.dueDate));
  return days > 0 ? days : null;
};
```

`differenceInDays` och `parseISO` importeras redan i filen.

2. **Mobilvy** -- under statusbadgen i fakturakortets header laggs:
```tsx
{daysLate && (
  <span className="text-xs text-destructive">{daysLate} dagar foer sent</span>
)}
```

3. **Desktopvy** -- i status-kolumnen i tabellen, under badgen:
```tsx
{daysLate && (
  <div className="text-xs text-destructive mt-1">{daysLate} d foer sent</div>
)}
```

4. **Expanderad vy** -- i det groena betalningshaendelse-kortet laggs en varningsrad:
```tsx
{daysLate && (
  <div className="text-xs text-destructive mt-2">
    Betald {daysLate} dagar efter foerfall (foerfall: {invoice.dueDate})
  </div>
)}
```

5. **Delvis betalda** -- foer fakturor med `paymentEvents` jaemfoers den foersta betalningens datum med foerfallodatum. Foer fakturor utan events anvaends `paymentDate`.

### Inget som aendras i datamodellen

All data som behoevs finns redan (`dueDate`, `paymentDate`, `paymentEvents`). Ingen aendring i typer eller mockdata behoevs.
