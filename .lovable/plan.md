

# Byt ikon och koppla ihop badge med infotext

## Vad som andras

1. Byt ut `Clock`-ikonen mot `AlertCircle` (en cirkel med utropstecken) -- mer universellt "anmarkning"-symbol.
2. Lagg samma `AlertCircle`-ikon bredvid infotexten "Betald X dagar efter forfall..." i den expanderade vyn, sa att man tydligt ser kopplingen mellan ikonen i badgen och forklaringstexten.

## Design

```text
Badge:
[Betald ⚠]

Expanderad rad:
⚠ Betald 5 dagar efter forfall (forfall: 2025-05-30)
```

Ikonen i badgen arver badgens textfarg (vit i success-badge). Ikonen vid infotexten far `text-destructive` som matchar textfargen dar.

## Tekniska detaljer

### Andrad fil

| Fil | Andring |
|-----|---------|
| `src/features/ekonomi/components/ledger/InvoicesTable.tsx` | Byt `Clock` till `AlertCircle`, lagg till ikon vid infotexterna |

### Andringar

1. **Import (rad 5)**: Byt `Clock` mot `AlertCircle` i lucide-react-importen.

2. **Badge -- mobilvy (rad 94) och desktopvy (rad 400)**: Byt `Clock` till `AlertCircle`:
```tsx
<AlertCircle className="h-3 w-3" />
```

3. **Infotext i expanderad vy (4 stallen: rad 263, 306, 557, 600)**: Lagg till ikonen och wrappa i flex-container. Exempel:
```tsx
<div className="text-xs text-destructive px-3 py-2 flex items-center gap-1">
  <AlertCircle className="h-3 w-3 shrink-0" />
  Betald {getDaysLate(invoice)} dagar efter forfall (forfall: {invoice.dueDate})
</div>
```

Samma monster for alla 4 forekomster (2 mobil, 2 desktop), med respektive padding/margin-klasser bevarade.

