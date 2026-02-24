

# Separat liten badge foer "sen betalning"

## Vad som aendras

Istallet foer att baaka in foerseningstexten i den groena badgen visas en separat liten badge bredvid. Den groena badgen behaaller sin rena text ("Betald" / "Delvis betald") och en kompakt amber/orange badge visas bredvid med foerseningsinfo.

## Design

```text
Foere (nuvarande):
[Betald - 5d sen]     (allt i en groen badge)

Efter:
[Betald] [5d sen]     (groen badge + liten amber badge)
```

Den separata badgen faar amber-faerger (`bg-amber-100 text-amber-800 border-amber-200`) foer att signalera "anmaerkning" utan att vara roed (fel) eller groen (ok).

## Tekniska detaljer

### AEndrad fil

| Fil | AEndring |
|-----|---------|
| `src/features/ekonomi/components/ledger/InvoicesTable.tsx` | Dela upp i tvaa badges i baade mobil- och desktopvy |

### Implementationsdetaljer

1. **Mobilvy (rad 91-93)**: Wrappa i en flex-container med tvaa badges:
```tsx
<div className="flex items-center gap-1">
  <Badge variant={getStatusVariant(invoice.paymentStatus)}>
    {getStatusText(invoice)}
  </Badge>
  {getDaysLate(invoice) && (
    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 text-[10px] px-1.5 py-0.5">
      {getDaysLate(invoice)}d sen
    </Badge>
  )}
</div>
```

2. **Desktopvy (rad 393-396)**: Samma princip:
```tsx
<div className="flex items-center gap-1">
  <Badge variant={getStatusVariant(invoice.paymentStatus)}>
    {getStatusText(invoice)}
  </Badge>
  {getDaysLate(invoice) && (
    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 text-[10px] px-1.5 py-0.5">
      {getDaysLate(invoice)}d sen
    </Badge>
  )}
</div>
```

3. **Expanderad vy**: Behaalls som den aer.

Den lilla badgen goers medvetet lite mindre aen statusbadgen (`text-[10px]`, `px-1.5 py-0.5`) saa att den klaenns som en kompletterande detalj snarare aen likvaardig information.

