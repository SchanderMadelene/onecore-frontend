

# Klockikon i den gröna badgen vid sen betalning

## Vad som ändras

Den separata gula badgen tas bort helt. Istället läggs en liten Clock-ikon till inuti den gröna statusbadgen när betalningen var sen. Ikonen fungerar som en diskret signal -- detaljer finns i den expanderade raden.

## Design

```text
Före (nuvarande):
[Betald] [5d sen]     (två badges, grön + gul)

Efter:
[Betald ⏱]            (en grön badge med ikon)
```

Ikonen visas i vitt (samma som badgens textfärg) och är liten nog att inte störa texten.

## Tekniska detaljer

### Ändrad fil

| Fil | Ändring |
|-----|---------|
| `src/features/ekonomi/components/ledger/InvoicesTable.tsx` | Ta bort extra Badge, lägg Clock-ikon inuti statusbadgen |

### Implementationsdetaljer

1. **Import** (rad 5): Lägg till `Clock` i lucide-react-importen.

2. **Mobilvy (rad 91-100)**: Ersätt hela flex-containern med en enda Badge som villkorligt visar en Clock-ikon:
```tsx
<Badge variant={getStatusVariant(invoice.paymentStatus)} className="flex items-center gap-1">
  {getStatusText(invoice)}
  {getDaysLate(invoice) && (
    <Clock className="h-3 w-3" />
  )}
</Badge>
```

3. **Desktopvy (rad 400-411)**: Samma ändring -- en Badge med villkorlig ikon inuti:
```tsx
<Badge variant={getStatusVariant(invoice.paymentStatus)} className="flex items-center gap-1">
  {getStatusText(invoice)}
  {getDaysLate(invoice) && (
    <Clock className="h-3 w-3" />
  )}
</Badge>
```

4. **Expanderad vy**: Behålls som den är -- visar redan "Betald X dagar efter förfall".

